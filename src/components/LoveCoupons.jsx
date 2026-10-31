import React, { useState, useRef, useEffect } from 'react';
import { Ticket, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const COUPONS_DATA = [
  {
    id: 1,
    title: "👑 Bubly's 24-Hour Birthday Queen Treatment",
    desc: 'Valid all day! Whatever Bubly demands is universal law. Zero arguments, 100% pampering guaranteed.',
    icon: '👑',
    validity: 'Birthday Special',
  },
  {
    id: 2,
    title: '🎂 Midnight Birthday Cake & Ice Cream Date',
    desc: 'Valid anytime. Windows down, our favorite playlist, midnight candles, and unlimited dessert scoops on me!',
    icon: '🍦',
    validity: 'Birthday VIP',
  },
  {
    id: 3,
    title: "🎁 Birthday Shopping & Spontaneous Wish",
    desc: 'You pick the mall, the outfit, the food, and the movie. My card, your smile!',
    icon: '🛍️',
    validity: 'Birthday Special',
  },
  {
    id: 4,
    title: '🧸 100 Unlimited Birthday Hugs & Forehead Kisses',
    desc: 'Valid for infinite tight bear hugs whenever you feel tired or need to feel loved.',
    icon: '🧸',
    validity: 'Never Expires',
  },
  {
    id: 5,
    title: "🍳 Birthday Gourmet Feast: I Cook For You",
    desc: 'Sit back, watch your favorite show, and let me cook your favorite meal with extra love.',
    icon: '🍳',
    validity: 'Master Chef Pass',
  },
];

function ScratchCard({ coupon, onRedeem, isRedeemed }) {
  const canvasRef = useRef(null);
  const [isScratched, setIsScratched] = useState(false);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext('2d');

    const width = (canvas.width = canvas.offsetWidth || 300);
    const height = (canvas.height = canvas.offsetHeight || 190);

    // Draw shimmering rose-gold foil cover
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#e0a96d');
    grad.addColorStop(0.3, '#ffd166');
    grad.addColorStop(0.7, '#ff758f');
    grad.addColorStop(1, '#c9184a');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Foil text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH LOVE ✨', width / 2, height / 2 - 8);

    ctx.font = '12px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fillText('Rub to reveal your secret reward', width / 2, height / 2 + 16);
  }, [isScratched]);

  const scratch = (clientX, clientY) => {
    if (isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Check scratch percent
    checkScratched();
  };

  const checkScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    const totalPixels = imgData.data.length / 4;

    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] === 0) transparentPixels += 4;
    }

    if (transparentPixels / totalPixels > 0.35) {
      setIsScratched(true);
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#ffd166', '#ff4d6d'],
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDrawingRef.current) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        minHeight: '210px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px 20px',
        border: '1px solid rgba(224, 169, 109, 0.35)',
        background: 'linear-gradient(135deg, rgba(30, 15, 45, 0.9), rgba(15, 6, 25, 0.95))',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* Coupon Content underneath */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '32px' }}>{coupon.icon}</span>
          <span
            style={{
              fontSize: '11px',
              color: '#ffd166',
              fontWeight: 600,
              background: 'rgba(255, 209, 102, 0.12)',
              padding: '4px 10px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 209, 102, 0.3)',
            }}
          >
            {coupon.validity}
          </span>
        </div>

        <h3
          className="font-serif"
          style={{
            fontSize: '19px',
            color: '#fdf4ec',
            margin: '12px 0 8px',
            fontWeight: 700,
          }}
        >
          {coupon.title}
        </h3>

        <p style={{ fontSize: '13px', color: '#c8b9d2', lineHeight: '1.5' }}>
          {coupon.desc}
        </p>
      </div>

      {/* Action / Stamp area */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isRedeemed ? (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ff4d6d',
              fontWeight: 700,
              fontSize: '14px',
              border: '2px solid #ff4d6d',
              padding: '6px 14px',
              borderRadius: '8px',
              transform: 'rotate(-4deg)',
              background: 'rgba(255, 77, 109, 0.1)',
            }}
          >
            <CheckCircle2 size={16} /> REDEEMED BY BUBLY
          </div>
        ) : (
          <button
            onClick={() => onRedeem(coupon.id)}
            disabled={!isScratched}
            className="btn-romantic"
            style={{
              padding: '8px 18px',
              fontSize: '12px',
              opacity: isScratched ? 1 : 0.5,
              cursor: isScratched ? 'pointer' : 'not-allowed',
            }}
          >
            <Heart size={14} fill="#fff" /> Claim Coupon
          </button>
        )}

        {!isScratched && (
          <button
            onClick={() => setIsScratched(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffd166',
              fontSize: '11px',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Reveal All
          </button>
        )}
      </div>

      {/* Scratch Foil Overlay */}
      {!isScratched && (
        <canvas
          ref={canvasRef}
          onMouseDown={() => (isDrawingRef.current = true)}
          onMouseUp={() => (isDrawingRef.current = false)}
          onMouseLeave={() => (isDrawingRef.current = false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => (isDrawingRef.current = true)}
          onTouchEnd={() => (isDrawingRef.current = false)}
          onTouchMove={handleTouchMove}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            cursor: 'crosshair',
            zIndex: 10,
            borderRadius: '20px',
            touchAction: 'none',
          }}
        />
      )}
    </div>
  );
}

export default function LoveCoupons() {
  const [redeemed, setRedeemed] = useState({});

  const handleRedeem = (id) => {
    setRedeemed((prev) => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ffd166', '#f4c2c2'],
    });
  };

  return (
    <section
      id="coupons"
      style={{
        padding: '90px 20px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <span
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 18px',
            fontSize: '13px',
            color: '#ffd166',
            fontWeight: 600,
            marginBottom: '12px',
          }}
        >
          <Ticket size={14} /> Birthday Privilege Scratch Cards 🎁
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Bubly's Birthday Love Coupons
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px' }}>
          Scratch off the rose-gold foil to reveal your exclusive birthday queen privileges!
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '24px',
        }}
      >
        {COUPONS_DATA.map((coupon) => (
          <ScratchCard
            key={coupon.id}
            coupon={coupon}
            onRedeem={handleRedeem}
            isRedeemed={!!redeemed[coupon.id]}
          />
        ))}
      </div>
    </section>
  );
}

import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Award, CheckCircle2, Download, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ForeverProposal() {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const certificateRef = useRef(null);

  const playfulMessages = [
    'No 😜',
    'Error 404: Not an option!',
    'Nice try, you are stuck with me!',
    'Bubly belongs to me only! 💕',
    'Nope, no escape from my love! 😂',
    'Still trying? Just click YES! 🥰',
  ];

  const handleNoHover = () => {
    // Random offset
    const randomX = (Math.random() - 0.5) * 320;
    const randomY = (Math.random() - 0.5) * 220;
    setNoButtonPos({ x: randomX, y: randomY });
    setNoHoverCount((prev) => prev + 1);
  };

  const handleYes = () => {
    setIsAccepted(true);

    // Multiple massive confetti bursts
    const end = Date.now() + 4 * 1000;
    const colors = ['#ff4d6d', '#ffd166', '#e0a96d', '#ff758f', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <section
      id="forever"
      style={{
        padding: '100px 20px 120px',
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ marginBottom: '40px' }}>
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
          <Award size={14} /> The Birthday Promise 🎂
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}>
          My Birthday Vow To You
        </h2>
      </div>

      {!isAccepted ? (
        /* The Question & The Runaway Button */
        <div
          className="glass-panel"
          style={{
            padding: '60px 30px',
            borderRadius: '32px',
            border: '2px solid rgba(224, 169, 109, 0.4)',
            background: 'linear-gradient(135deg, rgba(35, 16, 54, 0.95), rgba(18, 8, 30, 0.95))',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 77, 109, 0.3)',
            maxWidth: '680px',
            margin: '0 auto',
          }}
        >
          <div
            className="animate-pulse-heart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.3), rgba(224, 169, 109, 0.3))',
              marginBottom: '24px',
            }}
          >
            <Heart size={44} fill="#ffffff" color="#000000" />
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
              color: '#fdf4ec',
              lineHeight: 1.4,
              marginBottom: '20px',
            }}
          >
            Bubly, will you promise to let me celebrate all your upcoming 100 birthdays holding your hand?
          </h3>

          <p
            className="font-cursive"
            style={{
              fontSize: '24px',
              color: '#f6d1b1',
              marginBottom: '40px',
            }}
          >
            "Through every candle blown, every wish made, and every dream chased... always by your side."
          </p>

          {/* Buttons Area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              position: 'relative',
              minHeight: '70px',
            }}
          >
            {/* The YES Button */}
            <button
              onClick={handleYes}
              className="btn-romantic"
              style={{
                fontSize: '18px',
                padding: '16px 42px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                boxShadow: '0 0 35px rgba(255, 77, 109, 0.6)',
              }}
            >
              <Heart size={20} fill="#ffffff" color="#000000" /> YES, A MILLION TIMES YES! 💖
            </button>

            {/* The Runaway No Button */}
            <button
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              onClick={handleNoHover}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#c8b9d2',
                padding: '14px 28px',
                borderRadius: '50px',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                position: noHoverCount > 0 ? 'absolute' : 'relative',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {playfulMessages[noHoverCount % playfulMessages.length]}
            </button>
          </div>
        </div>
      ) : (
        /* The Grand Certificate of Eternal Love */
        <div
          ref={certificateRef}
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #fffdfa 0%, #fef3c7 50%, #fae8ff 100%)',
            border: '8px double #d97706',
            borderRadius: '24px',
            padding: '50px 36px',
            color: '#451a03',
            textAlign: 'center',
            boxShadow:
              '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 77, 109, 0.4)',
            position: 'relative',
            animation: 'heartPulse 2.5s infinite',
          }}
        >
          {/* Ornate Gold Border Inner Line */}
          <div
            style={{
              position: 'absolute',
              inset: '12px',
              border: '2px solid rgba(180, 83, 9, 0.3)',
              borderRadius: '16px',
              pointerEvents: 'none',
            }}
          />

          {/* Top Seal */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #f59e0b, #b45309)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={36} />
          </div>

          <div
            style={{
              fontSize: '13px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#92400e',
              fontWeight: 700,
              marginBottom: '6px',
            }}
          >
            Official Birthday Certificate of Honor 🎂
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#78350f',
              fontWeight: 800,
              marginBottom: '16px',
            }}
          >
            The Official Birthday Queen Certificate
          </h3>

          <p
            className="font-handwriting"
            style={{
              fontSize: '24px',
              lineHeight: 1.6,
              color: '#451a03',
              maxWidth: '560px',
              margin: '0 auto 28px',
            }}
          >
            This certifies that <strong>BUBLY</strong> has been crowned the Birthday Queen of my heart. 
            Legally guaranteed 365 days of unconditional love, infinite pampering, and eternal happiness.
          </p>

          {/* Signatures & Date Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              borderTop: '1px solid #d97706',
              paddingTop: '20px',
              maxWidth: '500px',
              margin: '0 auto',
            }}
          >
            <div>
              <div
                className="font-cursive"
                style={{ fontSize: '28px', color: '#b91c1c', fontWeight: 700 }}
              >
                Bubly 💕
              </div>
              <div style={{ fontSize: '11px', color: '#78350f', textTransform: 'uppercase', fontWeight: 600 }}>
                The Prettiest Girl in the World
              </div>
            </div>

            <div>
              <div
                className="font-cursive"
                style={{ fontSize: '28px', color: '#b91c1c', fontWeight: 700 }}
              >
                Forever Yours ✨
              </div>
              <div style={{ fontSize: '11px', color: '#78350f', textTransform: 'uppercase', fontWeight: 600 }}>
                Dated: November 2, 2026
              </div>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <span
              style={{
                fontSize: '13px',
                color: '#b45309',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontWeight: 600,
              }}
            >
              <Sparkles size={14} /> Registered in the Stars • Valid for All Eternity
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

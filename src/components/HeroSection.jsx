import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Clock, Calendar, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HeroSection({ targetDateStr = '2026-11-02T00:00:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  const [kisses, setKisses] = useState([]);
  const [showBigKiss, setShowBigKiss] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
          isPast: false,
        });
      } else {
        // If past, count time together
        const elapsed = Math.abs(diff);
        setTimeLeft({
          days: Math.floor(elapsed / (1000 * 60 * 60 * 24)),
          hours: Math.floor((elapsed / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((elapsed / 1000 / 60) % 60),
          seconds: Math.floor((elapsed / 1000) % 60),
          isPast: true,
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  const handleSendKiss = (e) => {
    setShowBigKiss(true);
    setTimeout(() => {
      setShowBigKiss(false);
    }, 2400);

    // Spawn multiple floating kisses
    const newKisses = Array.from({ length: 8 }, (_, idx) => ({
      id: Date.now() + idx + Math.random(),
      x: window.innerWidth * (0.2 + Math.random() * 0.6),
      y: window.innerHeight * (0.3 + Math.random() * 0.4),
      size: Math.floor(Math.random() * 24 + 28),
    }));

    setKisses((prev) => [...prev, ...newKisses]);
    setTimeout(() => {
      setKisses((prev) => prev.filter((k) => !newKisses.some((nk) => nk.id === k.id)));
    }, 2200);

    confetti({
      particleCount: 50,
      spread: 90,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#ffffff', '#000000', '#ff4d6d', '#ffd166'],
    });
  };

  return (
    <section
      style={{
        minHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '60px 20px 40px',
        position: 'relative',
      }}
    >
      {/* Giant Big Kiss Screen Overlay */}
      {showBigKiss && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 99999,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'bigKissAnimation 2.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div
            style={{
              fontSize: 'clamp(110px, 28vw, 200px)',
              lineHeight: 1,
              filter:
                'drop-shadow(0 0 35px rgba(255, 77, 109, 0.85)) drop-shadow(0 0 70px rgba(255, 255, 255, 0.6))',
              animation: 'heartPulse 0.8s infinite',
            }}
          >
            💋
          </div>
          <div
            className="glass-panel"
            style={{
              marginTop: '16px',
              padding: '12px 28px',
              borderRadius: '50px',
              background: 'rgba(20, 10, 30, 0.94)',
              border: '2px solid rgba(255, 255, 255, 0.6)',
              color: '#ffffff',
              fontSize: 'clamp(17px, 3.8vw, 24px)',
              fontWeight: 800,
              letterSpacing: '0.5px',
              boxShadow:
                '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 77, 109, 0.5)',
            }}
          >
            💋 Big Birthday Kiss For Divya! 💋
          </div>
        </div>
      )}

      {/* Floating Kisses */}
      {kisses.map((kiss) => (
        <div
          key={kiss.id}
          style={{
            position: 'fixed',
            left: kiss.x,
            top: kiss.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            fontSize: `${kiss.size || 36}px`,
            animation: 'floatSlow 1.8s ease-out forwards',
            zIndex: 1000,
          }}
        >
          💋
        </div>
      ))}

      {/* Hero Badge */}
      <div
        className="glass-pill"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 22px',
          color: '#ffd166',
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '24px',
          border: '1px solid rgba(224, 169, 109, 0.4)',
        }}
      >
        <Sparkles size={16} /> 🎂 Happy Birthday To My Forever Girl, Bubly <Heart size={14} fill="#ffffff" color="#000000" />
      </div>

      {/* Main Heading */}
      <h1
        className="font-serif text-gradient-rose"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          maxWidth: '920px',
          marginBottom: '20px',
        }}
      >
        Happy Birthday To The Cutest Girl In The Universe, My Bubly 🎂✨
      </h1>

      {/* Romantic Subtitle / Quote */}
      <p
        className="font-cursive"
        style={{
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          color: '#f6d1b1',
          maxWidth: '700px',
          lineHeight: 1.4,
          marginBottom: '40px',
          textShadow: '0 0 20px rgba(224, 169, 109, 0.3)',
        }}
      >
        "Another year more beautiful, another year more deeply in love with you."
      </p>

      {/* Milestone / Countdown Box */}
      <div
        className="glass-panel"
        style={{
          padding: '30px 40px',
          borderRadius: '30px',
          border: '1px solid rgba(224, 169, 109, 0.3)',
          background: 'rgba(28, 14, 44, 0.75)',
          maxWidth: '680px',
          width: '100%',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 77, 109, 0.2)',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#e0a96d',
            fontSize: '15px',
            fontWeight: 600,
            marginBottom: '20px',
            letterSpacing: '0.5px',
          }}
        >
          <Calendar size={18} />
          {timeLeft.isPast
            ? "Celebrating Bubly's Birthday Every Single Moment! 🎂"
            : "Countdown to Bubly's Birthday Bash (November 2, 2026) 🎂🎉"}
        </div>

        {/* Counter Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
        >
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(244, 194, 194, 0.15)',
                borderRadius: '18px',
                padding: '16px 8px',
                textAlign: 'center',
              }}
            >
              <div
                className="font-serif text-gradient-gold"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {String(item.value).padStart(2, '0')}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#c8b9d2',
                  fontWeight: 600,
                  letterSpacing: '1px',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="#jar"
          className="btn-romantic"
          style={{ textDecoration: 'none', fontSize: '15px', padding: '14px 30px' }}
        >
          💖 27 Reasons Why I Love You
        </a>
        <a
          href="#letter"
          className="btn-gold"
          style={{ textDecoration: 'none', fontSize: '15px', padding: '14px 28px' }}
        >
          💌 Read Birthday Letter
        </a>
        <button
          onClick={handleSendKiss}
          className="btn-glass"
          style={{ fontSize: '15px', padding: '14px 24px', borderColor: 'rgba(244, 194, 194, 0.4)' }}
        >
          💋 Birthday Kisses
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <a
        href="#story"
        style={{
          marginTop: '60px',
          color: '#e0a96d',
          opacity: 0.7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          textDecoration: 'none',
          fontSize: '13px',
          transition: 'opacity 0.2s',
        }}
      >
        <span>Explore Our World</span>
        <ArrowDown size={18} className="animate-float-gentle" />
      </a>
    </section>
  );
}

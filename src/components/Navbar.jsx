import React from 'react';
import { Heart, Sparkles, BookOpen, Gift, Smile, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Navbar({ onSendHearts }) {
  const triggerKissShower = () => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#ff4d6d', '#ffd166', '#e0a96d'],
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#ff758f', '#c9184a', '#ffd166'],
    });
    if (onSendHearts) onSendHearts();
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: '16px',
        zIndex: 50,
        margin: '0 auto',
        maxWidth: '1100px',
        padding: '0 16px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          borderRadius: '50px',
          border: '1px solid rgba(244, 194, 194, 0.2)',
          background: 'rgba(20, 10, 32, 0.75)',
        }}
      >
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={20} color="#000000" fill="#ffffff" className="animate-pulse-heart" />
          <span
            className="font-serif text-gradient-gold"
            style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.5px' }}
          >
            Happy Birthday Bubly
          </span>
          <span style={{ fontSize: '14px' }}>🎂</span>
        </div>

        {/* Nav Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
          className="nav-links"
        >
          <a
            href="#jar"
            style={{
              color: '#ffd166',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ff758f')}
            onMouseLeave={(e) => (e.target.style.color = '#ffd166')}
          >
            💖 27 Reasons
          </a>
          <a
            href="#story"
            style={{
              color: '#c8b9d2',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ffd166')}
            onMouseLeave={(e) => (e.target.style.color = '#c8b9d2')}
          >
            Our Story
          </a>
          <a
            href="#letter"
            style={{
              color: '#c8b9d2',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ffd166')}
            onMouseLeave={(e) => (e.target.style.color = '#c8b9d2')}
          >
            Birthday Letter
          </a>
          <a
            href="#jar"
            style={{
              color: '#c8b9d2',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ffd166')}
            onMouseLeave={(e) => (e.target.style.color = '#c8b9d2')}
          >
            Love Jar
          </a>
          <a
            href="#coupons"
            style={{
              color: '#c8b9d2',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ffd166')}
            onMouseLeave={(e) => (e.target.style.color = '#c8b9d2')}
          >
            Coupons
          </a>
          <a
            href="#forever"
            style={{
              color: '#c8b9d2',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#ffd166')}
            onMouseLeave={(e) => (e.target.style.color = '#c8b9d2')}
          >
            Forever
          </a>
        </div>

        {/* Action Button */}
        <button
          onClick={triggerKissShower}
          className="btn-romantic"
          style={{
            padding: '8px 18px',
            fontSize: '13px',
          }}
          title="Send a birthday shower of love!"
        >
          <Sparkles size={14} /> Wish Bubly 🎉
        </button>
      </div>
    </nav>
  );
}

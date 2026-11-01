import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(244, 194, 194, 0.15)',
        background: 'rgba(10, 5, 18, 0.9)',
        padding: '40px 20px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ color: '#c8b9d2', fontSize: '15px' }}>Crafted with infinite love for the Birthday Queen,</span>
        <span className="font-serif text-gradient-rose" style={{ fontSize: '18px', fontWeight: 700 }}>
          Bubly
        </span>
        <Heart size={16} fill="#ffffff" color="#000000" className="animate-pulse-heart" />
      </div>
      <p style={{ color: '#8b759a', fontSize: '13px', margin: 0 }}>
        Nov 2, 2026 • Happy Birthday En Anbe! To the moon, the stars, and beyond eternity ✨
      </p>
    </footer>
  );
}

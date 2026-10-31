import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, Volume2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const fullLetter = `Dearest Bubly, En Azhage, My Birthday Queen... 🎂💖

Today is the most special day in the entire calendar, because on this day, the universe gifted the world the purest, sweetest soul—and somehow, I became the luckiest guy alive to call you mine.

Another year older, but to my eyes, you grow more breathtaking with every passing heartbeat. Your smile is my daily sunrise, your cute little pouts are my weakness, and the warmth in your hugs is my permanent home.

On your birthday today, November 2nd, I want to promise you something from the depths of my soul:
I will stand beside you through every season, celebrate every triumph, wipe away every tear, and love you more fiercely tomorrow than I do today. 

May all your dreams come true this year. May your heart always stay as soft and magical as it is today. 

Happy Birthday, en anbe Bubly! You deserve the stars, the moon, and all the love in the universe.

Forever & Always Yours,
Your One & Only ✨`;

  const handleOpenEnvelope = () => {
    if (!isOpen) {
      setIsOpen(true);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ffd166', '#f4c2c2'],
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setDisplayText('');
      setIsTypingDone(false);
      return;
    }

    let i = 0;
    const speed = 24; // typing speed
    const timer = setInterval(() => {
      if (i < fullLetter.length) {
        setDisplayText(fullLetter.slice(0, i + 1));
        i++;
      } else {
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isOpen]);

  const resetLetter = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleOpenEnvelope();
    }, 400);
  };

  return (
    <section
      id="letter"
      style={{
        padding: '90px 20px',
        maxWidth: '860px',
        margin: '0 auto',
        textAlign: 'center',
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
          <Mail size={14} /> Birthday Edition Wax-Sealed Letter 🎂
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          A Secret Birthday Letter For Bubly
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px' }}>
          Tied with memories, sealed with a birthday kiss. Tap the golden wax seal to open.
        </p>
      </div>

      {/* The Interactive Envelope Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '640px',
          margin: '0 auto',
          minHeight: isOpen ? '540px' : '360px',
          transition: 'all 0.6s ease',
        }}
      >
        {!isOpen ? (
          /* Sealed Envelope Graphic */
          <div
            onClick={handleOpenEnvelope}
            className="glass-panel"
            style={{
              padding: '60px 30px',
              borderRadius: '24px',
              border: '2px solid rgba(224, 169, 109, 0.4)',
              background: 'linear-gradient(135deg, rgba(35, 16, 54, 0.95), rgba(18, 8, 30, 0.95))',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 77, 109, 0.25)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Envelope Flap Lines */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100px',
                borderBottom: '1px solid rgba(224, 169, 109, 0.25)',
                background: 'rgba(255, 255, 255, 0.02)',
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            />

            {/* Wax Seal */}
            <div className="wax-seal" style={{ marginTop: '20px', zIndex: 10 }}>
              <span
                className="font-serif"
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '18px',
                  letterSpacing: '1px',
                }}
              >
                B & D
              </span>
            </div>

            <div style={{ marginTop: '28px', zIndex: 10 }}>
              <p
                className="font-serif"
                style={{ fontSize: '20px', color: '#f6d1b1', marginBottom: '6px' }}
              >
                Strictly Confidential: For Bubly's Eyes Only
              </p>
              <span
                style={{
                  fontSize: '13px',
                  color: '#ffd166',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={14} /> Click seal to break & read
              </span>
            </div>
          </div>
        ) : (
          /* Opened Letter Paper with Typewriter Effect */
          <div
            style={{
              background: 'linear-gradient(180deg, #fefae0 0%, #faedcd 100%)',
              borderRadius: '20px',
              padding: '48px 36px',
              color: '#3d1a0a',
              textAlign: 'left',
              boxShadow:
                '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(224, 169, 109, 0.4)',
              border: '2px solid rgba(212, 163, 115, 0.6)',
              position: 'relative',
              animation: 'floatGently 4s ease-in-out infinite',
            }}
          >
            {/* Vintage Stamp / Top Badge */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #d4a373',
                paddingBottom: '12px',
                marginBottom: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Heart size={20} fill="#b91c1c" color="#b91c1c" />
                <span
                  className="font-serif"
                  style={{ fontSize: '16px', fontWeight: 700, color: '#7f1d1d' }}
                >
                  From My Heart To Yours
                </span>
              </div>
              <span style={{ fontSize: '13px', color: '#8c502b', fontStyle: 'italic' }}>
                Nov 2, 2026
              </span>
            </div>

            {/* Letter Content */}
            <div
              className="font-handwriting"
              style={{
                fontSize: '22px',
                lineHeight: '1.7',
                whiteSpace: 'pre-line',
                color: '#281105',
                minHeight: '260px',
              }}
            >
              {displayText}
              {!isTypingDone && (
                <span
                  style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '20px',
                    background: '#b91c1c',
                    marginLeft: '4px',
                    animation: 'heartPulse 0.8s infinite',
                  }}
                />
              )}
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #d4a373',
                paddingTop: '16px',
              }}
            >
              <button
                onClick={resetLetter}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9a3412',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RotateCcw size={14} /> Replay Typing
              </button>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(154, 52, 18, 0.1)',
                  border: '1px solid #d4a373',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  color: '#7c2d12',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close & Seal Envelope
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

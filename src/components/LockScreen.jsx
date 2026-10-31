import React, { useState } from 'react';
import { Heart, Sparkles, KeyRound, Lock, Unlock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LockScreen({ onUnlock }) {
  const [inputVal, setInputVal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isUnlockedState, setIsUnlockedState] = useState(false);

  const triggerCelebration = () => {
    setIsUnlockedState(true);

    // Heart-shaped confetti blast
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 10000,
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ff4d6d', '#ffd166', '#e0a96d'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#ff758f', '#c9184a', '#ffffff'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffd166', '#ff4d6d'],
    });

    setTimeout(() => {
      onUnlock();
    }, 1200);
  };

  const handleUnlockAttempt = (e) => {
    e.preventDefault();
    const cleanInput = inputVal.trim().toLowerCase();
    if (cleanInput === 'bubly' || cleanInput === 'bubbly' || cleanInput === 'my love' || cleanInput === 'love') {
      setErrorMsg('');
      triggerCelebration();
    } else {
      setErrorMsg("Opps! That's not the secret code, sweet girl... Hint: B _ _ _ Y 💖");
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, #240d3a 0%, #0d0417 70%, #05010a 100%)',
        padding: '20px',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        opacity: isUnlockedState ? 0 : 1,
        transform: isUnlockedState ? 'scale(1.08)' : 'scale(1)',
        pointerEvents: isUnlockedState ? 'none' : 'auto',
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          padding: '48px 32px',
          borderRadius: '32px',
          border: '1px solid rgba(244, 194, 194, 0.25)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 77, 109, 0.2)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glowing Ambient Aura */}
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(255, 77, 109, 0.35) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        {/* Pulsing Animated Heart */}
        <div style={{ marginBottom: '24px', position: 'relative' }}>
          <div
            className="animate-pulse-heart"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 77, 109, 0.25), rgba(224, 169, 109, 0.25))',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <Heart size={48} color="#ff4d6d" fill="#ff4d6d" />
          </div>
        </div>

        <span
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 16px',
            fontSize: '12px',
            color: '#ffd166',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <Sparkles size={14} /> Bubly's Birthday Vault 🎂
        </span>

        <h1
          className="font-serif text-gradient-rose"
          style={{
            fontSize: '32px',
            lineHeight: 1.25,
            marginBottom: '12px',
            fontWeight: 700,
          }}
        >
          Happy Birthday, My Queen!
        </h1>

        <p
          style={{
            fontSize: '15px',
            color: '#c8b9d2',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          A special birthday surprise crafted only for you. Enter your sweet nickname to enter your birthday world...
        </p>

        {/* Input Form */}
        <form onSubmit={handleUnlockAttempt} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Enter your nickname here..."
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                setErrorMsg('');
              }}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '50px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: errorMsg ? '1px solid #ff4d6d' : '1px solid rgba(244, 194, 194, 0.25)',
                color: '#fff',
                fontSize: '16px',
                textAlign: 'center',
                outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              autoFocus
            />
          </div>

          {errorMsg && (
            <p style={{ color: '#ff758f', fontSize: '13px', margin: '0' }}>{errorMsg}</p>
          )}

          <button
            type="submit"
            className="btn-romantic"
            style={{
              justifyContent: 'center',
              width: '100%',
              padding: '14px',
              fontSize: '16px',
            }}
          >
            <KeyRound size={18} /> Unlock My Surprise
          </button>
        </form>

        {/* Quick Hint / Bypass */}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => {
              setInputVal('BUBLY');
              triggerCelebration();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#e0a96d',
              fontSize: '13px',
              textDecoration: 'underline',
              cursor: 'pointer',
              opacity: 0.85,
            }}
          >
            Can't guess? Tap here, Bubly 💕
          </button>
        </div>
      </div>
    </div>
  );
}

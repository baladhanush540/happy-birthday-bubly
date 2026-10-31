import React, { useState } from 'react';
import { Sparkles, Heart, Flame, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [isBlown, setIsBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  // Play Happy Birthday tune snippet via Web Audio API
  const playBirthdayTune = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Notes: G4, G4, A4, G4, C5, B4 (Happy Birthday to you)
      const notes = [
        { f: 392.0, d: 0.35, pause: 0.05 }, // Hap-
        { f: 392.0, d: 0.25, pause: 0.05 }, // py
        { f: 440.0, d: 0.5, pause: 0.05 },  // birth-
        { f: 392.0, d: 0.5, pause: 0.05 },  // day
        { f: 523.25, d: 0.5, pause: 0.05 }, // to
        { f: 493.88, d: 0.9, pause: 0.1 },  // you
      ];

      let curTime = ctx.currentTime;
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, curTime);

        gain.gain.setValueAtTime(0, curTime);
        gain.gain.linearRampToValueAtTime(0.08, curTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, curTime + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(curTime);
        osc.stop(curTime + n.d + 0.1);

        curTime += n.d + n.pause;
      });
    } catch (e) {
      console.log('Audio chime error', e);
    }
  };

  const blowAllCandles = () => {
    setCandlesLit([false, false, false, false, false]);
    setIsBlown(true);
    setWishMade(true);

    playBirthdayTune();

    // Grand Birthday Confetti Explosion
    const end = Date.now() + 3 * 1000;
    const colors = ['#ffd166', '#ff4d6d', '#ff758f', '#e0a96d', '#ffffff', '#a855f7'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 65,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 65,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const relightCandles = () => {
    setCandlesLit([true, true, true, true, true]);
    setIsBlown(false);
    setWishMade(false);
  };

  const toggleSingleCandle = (index) => {
    const updated = [...candlesLit];
    updated[index] = !updated[index];
    setCandlesLit(updated);

    if (updated.every((c) => !c)) {
      setIsBlown(true);
      setWishMade(true);
      playBirthdayTune();
    }
  };

  return (
    <section
      id="cake"
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
          <Sparkles size={14} /> The Birthday Ritual 🎂
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
          Make A Wish, Birthday Queen!
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px' }}>
          Close your eyes, make the sweetest wish in your heart, and blow out the candles!
        </p>
      </div>

      {/* Birthday Cake Box */}
      <div
        className="glass-panel"
        style={{
          padding: '50px 30px',
          borderRadius: '32px',
          border: '2px solid rgba(224, 169, 109, 0.35)',
          background: 'linear-gradient(135deg, rgba(35, 16, 54, 0.95), rgba(18, 8, 30, 0.95))',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 77, 109, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Cake Graphics */}
        <div style={{ position: 'relative', height: '240px', width: '280px', margin: '10px auto 30px' }}>
          {/* Candles Row */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '24px',
              zIndex: 10,
            }}
          >
            {candlesLit.map((isLit, i) => (
              <div
                key={i}
                onClick={() => toggleSingleCandle(i)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
                title={isLit ? 'Click to blow out' : 'Click to light'}
              >
                {/* Flame */}
                {isLit ? (
                  <div
                    className="animate-pulse-heart"
                    style={{
                      width: '14px',
                      height: '22px',
                      background: 'radial-gradient(ellipse at bottom, #ffd166 20%, #ff4d6d 80%)',
                      borderRadius: '50% 50% 35% 35%',
                      boxShadow: '0 0 15px #ffd166, 0 0 25px #ff758f',
                      marginBottom: '2px',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '4px',
                      height: '14px',
                      background: 'rgba(200, 200, 200, 0.4)',
                      borderRadius: '2px',
                      marginBottom: '10px',
                    }}
                  />
                )}

                {/* Candle Stick */}
                <div
                  style={{
                    width: '10px',
                    height: '42px',
                    borderRadius: '4px',
                    background:
                      i % 2 === 0
                        ? 'repeating-linear-gradient(45deg, #ff4d6d, #ff4d6d 6px, #ffffff 6px, #ffffff 12px)'
                        : 'repeating-linear-gradient(45deg, #ffd166, #ffd166 6px, #ffffff 6px, #ffffff 12px)',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div
            style={{
              position: 'absolute',
              top: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '180px',
              height: '60px',
              borderRadius: '20px 20px 8px 8px',
              background: 'linear-gradient(180deg, #f4c2c2 0%, #e27396 100%)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Strawberry Cream Frosting Drips */}
            <div
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: '#fff',
                letterSpacing: '1px',
                textShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            >
              BUBLY 💕
            </div>
          </div>

          {/* Bottom Cake Tier */}
          <div
            style={{
              position: 'absolute',
              top: '124px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '240px',
              height: '75px',
              borderRadius: '24px 24px 10px 10px',
              background: 'linear-gradient(180deg, #3d1b40 0%, #200d23 100%)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.5)',
              border: '2px solid rgba(224, 169, 109, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 16px',
            }}
          >
            {/* Golden Pearl Frosting Ornaments */}
            {['✨', '💖', '🎂', '💖', '✨'].map((item, idx) => (
              <span key={idx} style={{ fontSize: '16px' }}>
                {item}
              </span>
            ))}
          </div>

          {/* Golden Cake Stand Plate */}
          <div
            style={{
              position: 'absolute',
              top: '194px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '280px',
              height: '18px',
              borderRadius: '50px',
              background: 'linear-gradient(90deg, #ffd166, #e0a96d, #ffd166)',
              boxShadow: '0 10px 20px rgba(0,0,0,0.6)',
            }}
          />
        </div>

        {/* Wish Reaction Banner */}
        {wishMade ? (
          <div
            style={{
              background: 'rgba(255, 77, 109, 0.15)',
              border: '1px solid #ff758f',
              borderRadius: '20px',
              padding: '20px 24px',
              maxWidth: '540px',
              margin: '0 auto 24px',
              animation: 'heartPulse 2s infinite',
            }}
          >
            <h3
              className="font-serif text-gradient-gold"
              style={{ fontSize: '24px', marginBottom: '8px' }}
            >
              🎉 Your Wish Has Been Sealed In The Universe!
            </h3>
            <p style={{ color: '#f6d1b1', fontSize: '15px', lineHeight: 1.5 }}>
              May your new year be filled with boundless joy, cute smiles, lots of good food, and endless love from me, Bubly! 🥰
            </p>
          </div>
        ) : (
          <p
            style={{
              color: '#ffd166',
              fontSize: '15px',
              marginBottom: '24px',
              fontWeight: 500,
            }}
          >
            👉 Tap on candles or click the button below to blow!
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {!isBlown ? (
            <button
              onClick={blowAllCandles}
              className="btn-romantic"
              style={{
                fontSize: '16px',
                padding: '14px 34px',
                boxShadow: '0 0 30px rgba(255, 77, 109, 0.6)',
              }}
            >
              <Flame size={18} fill="#fff" /> Blow Out The Candles! 🎂
            </button>
          ) : (
            <button
              onClick={relightCandles}
              className="btn-gold"
              style={{ fontSize: '14px', padding: '12px 26px' }}
            >
              <RotateCcw size={16} /> Relight & Make Another Wish
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

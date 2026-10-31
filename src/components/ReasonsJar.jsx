import React, { useState } from 'react';
import { Heart, Sparkles, Gift, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const REASONS = [
  "Because the entire universe became infinitely sweeter on the day you were born.",
  "The way your eyes sparkle when you smile at me.",
  "How excited you get for your birthday like the most adorable little girl.",
  "How you get adorably angry for the tiniest silly reasons.",
  "Because one call from you can turn my worst day into my happiest.",
  "The way you hold my hand like you never want to let go.",
  "How effortlessly you make me laugh until my stomach hurts.",
  "Your pure, caring heart that loves so genuinely.",
  "How you remember the smallest things I told you months ago.",
  "The cute little pout you make when you don't get your way.",
  "Because you believe in me even when I doubt myself.",
  "The way you look in traditional dresses—absolute birthday royalty.",
  "How safe and peaceful my heart feels whenever you are near.",
  "Our late-night talks where hours feel like five minutes.",
  "Because you are my birthday queen, my best friend, and my whole world.",
  "The way you say my name with that special sweetness only you have.",
  "How you pretend you're not sleepy on late calls just to talk more.",
  "Your warm hugs that make all my worries vanish in an instant.",
  "Because you're the first thought in my morning and the last in my night.",
  "The way you support all my dreams like they are your own.",
  "How pretty you look even when you've just woken up with messy hair.",
  "Because with you, even sitting in complete silence feels romantic.",
  "The way you protect our bond and fight for us no matter what.",
  "Your infectious excitement when we eat your favorite food.",
  "Because every love song on the radio suddenly makes sense with you.",
  "How you look at me when you think I'm not paying attention.",
  "Because celebrating you today and every single day is my life's greatest honor, Bubly.",
];

export default function ReasonsJar() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(new Set([0]));
  const [isOpening, setIsOpening] = useState(false);

  const pullNewReason = () => {
    setIsOpening(true);
    const nextIdx = Math.floor(Math.random() * REASONS.length);
    setTimeout(() => {
      setCurrentIdx(nextIdx);
      setUnlockedCount((prev) => new Set([...prev, nextIdx]));
      setIsOpening(false);
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#ff4d6d', '#ffd166', '#f4c2c2'],
      });
    }, 350);
  };

  return (
    <section
      id="jar"
      style={{
        padding: '90px 20px',
        maxWidth: '920px',
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
          <Gift size={14} /> Infinite Reasons Jar
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          Why I Love You, Bubly
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px' }}>
          Tap the glowing love jar to unfold a folded origami note straight from my heart.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        {/* The Glowing Jar Illustration */}
        <div
          onClick={pullNewReason}
          className="glass-panel"
          style={{
            width: '200px',
            height: '240px',
            borderRadius: '50px 50px 70px 70px',
            border: '2px solid rgba(224, 169, 109, 0.5)',
            background:
              'radial-gradient(circle at 50% 40%, rgba(255, 77, 109, 0.25) 0%, rgba(20, 10, 30, 0.85) 100%)',
            boxShadow:
              '0 0 40px rgba(255, 77, 109, 0.35), inset 0 0 25px rgba(224, 169, 109, 0.3)',
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          {/* Jar Lid */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              width: '120px',
              height: '22px',
              borderRadius: '8px',
              background: 'linear-gradient(180deg, #ffd166, #e0a96d)',
              border: '1px solid #fff',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
            }}
          />

          {/* Floating Hearts inside Jar */}
          <div className="animate-pulse-heart" style={{ display: 'flex', gap: '6px' }}>
            <Heart size={36} fill="#ff4d6d" color="#ff4d6d" />
            <Heart size={26} fill="#ffd166" color="#ffd166" style={{ marginTop: '10px' }} />
          </div>

          <span
            style={{
              marginTop: '16px',
              fontSize: '12px',
              color: '#ffd166',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Tap To Pull Note
          </span>
        </div>

        {/* Revealed Reason Note Card */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '560px',
            width: '100%',
            padding: '36px 30px',
            borderRadius: '24px',
            border: '1px solid rgba(244, 194, 194, 0.25)',
            background: 'linear-gradient(145deg, rgba(32, 14, 50, 0.9), rgba(16, 7, 26, 0.95))',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(224, 169, 109, 0.2)',
            position: 'relative',
            minHeight: '180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            transform: isOpening ? 'scale(0.96)' : 'scale(1)',
            opacity: isOpening ? 0.6 : 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
              color: '#e0a96d',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            <Sparkles size={16} /> Reason #{currentIdx + 1}
          </div>

          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
              color: '#fdf4ec',
              lineHeight: 1.55,
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            "{REASONS[currentIdx]}"
          </p>

          <div
            style={{
              marginTop: '22px',
              fontSize: '12px',
              color: '#8b759a',
            }}
          >
            Reasons Discovered: {unlockedCount.size} / {REASONS.length}
          </div>
        </div>

        {/* Pull Button */}
        <button
          onClick={pullNewReason}
          className="btn-romantic"
          style={{ padding: '14px 34px', fontSize: '15px' }}
        >
          <RotateCw size={16} /> Pull Another Reason For Bubly
        </button>
      </div>
    </section>
  );
}

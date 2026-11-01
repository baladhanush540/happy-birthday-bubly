import React, { useState } from 'react';
import { Heart, Sparkles, Gift, RotateCw, ChevronLeft, ChevronRight, LayoutGrid, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

const REASONS = [
  {
    id: 1,
    title: 'Un Smile',
    text: 'Nee smile pannumbodhu enoda worst day kooda best day ah maaridum. ❤️',
  },
  {
    id: 2,
    title: 'Un Eyes',
    text: 'Un kannula paakumbodhu words illama kooda neraya feelings puriyudhu.',
  },
  {
    id: 3,
    title: 'Un Voice',
    text: 'Un voice kekkumbodhe enakku oru different happiness varum.',
  },
  {
    id: 4,
    title: 'Un Care',
    text: 'Enna chinna chinna vishayathulayum care panra un nature enakku romba pidikkum.',
  },
  {
    id: 5,
    title: 'Un Cuteness',
    text: 'Nee theriyama panra chinna chinna cute things ellame enakku special.',
  },
  {
    id: 6,
    title: 'Un Anger',
    text: 'Nee kovapadumbodhu kooda unna samadhanapadutha thonum.',
  },
  {
    id: 7,
    title: 'Un Innocence',
    text: 'Unoda innocent reactions en heart ah eppovume melt pannidum.',
  },
  {
    id: 8,
    title: 'Un Presence',
    text: 'Nee pakkathula irundha mattum podhum, enakku ellame complete ah feel aagum.',
  },
  {
    id: 9,
    title: 'Un Laughter',
    text: 'Nee manasara sirikkumbodhu andha happiness ah thirumba thirumba paakanum nu thonum.',
  },
  {
    id: 10,
    title: 'Un Understanding',
    text: 'Enna purinjukka nee try panra ovvoru moment um enakku romba precious.',
  },
  {
    id: 11,
    title: 'Un Trust',
    text: 'En mela nee vachirukkura nambikkai enakku romba important.',
  },
  {
    id: 12,
    title: 'Un Little Fights',
    text: 'Namma chinna chinna sandaigal kooda later nenacha cute memories ah maaridum.',
  },
  {
    id: 13,
    title: 'Un Possessiveness',
    text: 'Nee en mela kaamikura andha cute jealousy enakku special ah feel aagum.',
  },
  {
    id: 14,
    title: 'Un Hugs',
    text: 'Unna hug pannumbodhu ulagathula vera edhuvum thevai illa nu thonum.',
  },
  {
    id: 15,
    title: 'Your Hand in Mine',
    text: 'Un kaiya pudichittu nadakkumbodhu enakku oru special confidence varum.',
  },
  {
    id: 16,
    title: 'Our First Selfie',
    text: 'Namma first selfie en gallery la irukkura just photo illa, en heart la irukkura memory.',
  },
  {
    id: 17,
    title: 'Our First Date',
    text: 'Un kooda spend panna andha first date en life la marakka mudiyadha moment.',
  },
  {
    id: 18,
    title: 'Our Beach Memories',
    text: 'Kadal alai vida un kooda irundha moments dhaan enakku azhagu.',
  },
  {
    id: 19,
    title: 'Your Little Gestures',
    text: 'Nee panra chinna chinna gestures kooda enakku periya happiness kudukkum.',
  },
  {
    id: 20,
    title: 'Your Support',
    text: 'Enakku kashtam varumbodhu nee en pakkathula irukkuradhu enakku strength.',
  },
  {
    id: 21,
    title: 'Your Honesty',
    text: 'Enkitta nee unmaiya irukkuradhu dhaan namma love oda biggest strength.',
  },
  {
    id: 22,
    title: 'Your Beauty',
    text: 'Un face mattum illa, un heart um enakku romba azhagu.',
  },
  {
    id: 23,
    title: 'Our 3 Years',
    text: 'Indha 3 years la nee kudutha memories ellame en life oda treasure.',
  },
  {
    id: 24,
    title: 'My First Love',
    text: 'En life la first time love na enna nu feel panna vachadhu nee dhaan.',
  },
  {
    id: 25,
    title: 'My Happiness',
    text: 'Reason illama kooda unna nenacha en face la smile vandhudum.',
  },
  {
    id: 26,
    title: 'My Future Dreams',
    text: 'Future la neraya birthdays, trips, celebrations ellame un kooda experience pannanum nu aasai.',
  },
  {
    id: 27,
    title: "Simply Because You're Divya",
    text: 'Nee perfect ah irukkanum nu avasiyam illa. Nee nee ah irundha podhum. Adhuve unna love panna enakku podhum. I LOVE YOU! ❤️',
  },
];

export default function ReasonsJar() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(new Set([0]));
  const [isOpening, setIsOpening] = useState(false);
  const [viewMode, setViewMode] = useState('jar'); // 'jar' | 'grid'

  const pullReason = (targetIdx) => {
    setIsOpening(true);
    const nextIdx =
      targetIdx !== undefined
        ? targetIdx
        : Math.floor(Math.random() * REASONS.length);
    setTimeout(() => {
      setCurrentIdx(nextIdx);
      setUnlockedCount((prev) => new Set([...prev, nextIdx]));
      setIsOpening(false);
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff4d6d', '#ffd166', '#f4c2c2'],
      });
    }, 280);
  };

  const handleNext = () => {
    pullReason((currentIdx + 1) % REASONS.length);
  };

  const handlePrev = () => {
    pullReason((currentIdx - 1 + REASONS.length) % REASONS.length);
  };

  const currentReason = REASONS[currentIdx];

  return (
    <section
      id="jar"
      style={{
        padding: '90px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
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
          <Gift size={14} /> Endless Love Notes Collection 💖
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)' }}>
          ❤️ 27 Reasons Why I Love You, Divya!
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px', maxWidth: '640px', margin: '10px auto 20px' }}>
          Tap the glowing love jar to reveal a handwritten origami note, or switch to view all 27 reasons written straight from my heart.
        </p>

        {/* View Switcher Toggle */}
        <div
          className="glass-panel"
          style={{
            display: 'inline-flex',
            padding: '4px',
            borderRadius: '50px',
            background: 'rgba(20, 10, 30, 0.85)',
            marginBottom: '10px',
          }}
        >
          <button
            onClick={() => setViewMode('jar')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '40px',
              border: 'none',
              background:
                viewMode === 'jar'
                  ? 'linear-gradient(135deg, #ff4d6d, #c9184a)'
                  : 'transparent',
              color: viewMode === 'jar' ? '#fff' : '#c8b9d2',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <Sparkles size={14} /> Interactive Jar Mode
          </button>

          <button
            onClick={() => setViewMode('grid')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '40px',
              border: 'none',
              background:
                viewMode === 'grid'
                  ? 'linear-gradient(135deg, #ff4d6d, #c9184a)'
                  : 'transparent',
              color: viewMode === 'grid' ? '#fff' : '#c8b9d2',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <LayoutGrid size={14} /> View All 27 Reasons
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. INTERACTIVE JAR MODE                                         */}
      {/* ============================================================== */}
      {viewMode === 'jar' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {/* The Glowing Jar Illustration */}
          <div
            onClick={() => pullReason()}
            className="glass-panel"
            style={{
              width: '200px',
              height: '240px',
              borderRadius: '50px 50px 70px 70px',
              border: '2px solid rgba(224, 169, 109, 0.5)',
              background:
                'radial-gradient(circle at 50% 40%, rgba(255, 77, 109, 0.28) 0%, rgba(20, 10, 30, 0.9) 100%)',
              boxShadow:
                '0 0 45px rgba(255, 77, 109, 0.4), inset 0 0 25px rgba(224, 169, 109, 0.3)',
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
              <Heart size={36} fill="#ffffff" color="#000000" />
              <Heart size={26} fill="#000000" color="#ffffff" style={{ marginTop: '10px' }} />
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
              Tap Jar To Pull Note 💌
            </span>
          </div>

          {/* Revealed Reason Note Card */}
          <div
            className="glass-panel"
            style={{
              maxWidth: '620px',
              width: '100%',
              padding: '36px 30px',
              borderRadius: '26px',
              border: '2px solid rgba(224, 169, 109, 0.35)',
              background: 'linear-gradient(145deg, rgba(32, 14, 50, 0.95), rgba(16, 7, 26, 0.95))',
              boxShadow: '0 25px 55px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 77, 109, 0.25)',
              position: 'relative',
              minHeight: '210px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transition: 'all 0.3s ease',
              transform: isOpening ? 'scale(0.96)' : 'scale(1)',
              opacity: isOpening ? 0.6 : 1,
            }}
          >
            {/* Reason Badge & Navigation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(244, 194, 194, 0.15)',
                paddingBottom: '12px',
              }}
            >
              <button
                onClick={handlePrev}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                }}
                title="Previous Reason"
              >
                <ChevronLeft size={16} />
              </button>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ffd166',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                }}
              >
                <Sparkles size={15} color="#ff4d6d" /> REASON #{currentReason.id} OF {REASONS.length}
              </span>

              <button
                onClick={handleNext}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  cursor: 'pointer',
                }}
                title="Next Reason"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Reason Title */}
            <h3
              className="font-serif text-gradient-gold"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                marginBottom: '12px',
                lineHeight: 1.3,
              }}
            >
              {currentReason.title}
            </h3>

            {/* Reason Text */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)',
                color: '#fdf4ec',
                lineHeight: 1.6,
                fontWeight: 500,
                textAlign: 'center',
                margin: '0 auto',
                maxWidth: '520px',
              }}
            >
              "{currentReason.text}"
            </p>

            <div
              style={{
                marginTop: '20px',
                fontSize: '12px',
                color: '#c8b9d2',
              }}
            >
              Reasons Discovered: {unlockedCount.size} / {REASONS.length}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => pullReason()}
              className="btn-romantic"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              <RotateCw size={15} /> Random Note Pull
            </button>
            <button
              onClick={handleNext}
              className="btn-gold"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              Next Reason <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. GRID / ALL 27 REASONS LIST VIEW                             */}
      {/* ============================================================== */}
      {viewMode === 'grid' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            textAlign: 'left',
          }}
        >
          {REASONS.map((r) => (
            <div
              key={r.id}
              className="glass-panel"
              style={{
                padding: '20px 22px',
                borderRadius: '18px',
                border: '1px solid rgba(224, 169, 109, 0.25)',
                background: 'rgba(24, 11, 38, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#ff4d6d';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(224, 169, 109, 0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#ff758f',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  #{r.id}
                </span>
                <Heart size={14} fill="#ffffff" color="#000000" />
              </div>
              <h4
                className="font-serif text-gradient-gold"
                style={{ fontSize: '17px', margin: 0, fontWeight: 700 }}
              >
                {r.title}
              </h4>
              <p
                style={{
                  fontSize: '14px',
                  color: '#e4d6ec',
                  lineHeight: '1.55',
                  margin: 0,
                }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. SPECIAL NOTE: ONE LAST REASON...                            */}
      {/* ============================================================== */}
      <div
        className="glass-panel"
        style={{
          marginTop: '44px',
          padding: '30px 28px',
          borderRadius: '24px',
          border: '2px solid rgba(255, 77, 109, 0.5)',
          background: 'linear-gradient(135deg, rgba(42, 14, 52, 0.95), rgba(20, 8, 32, 0.95))',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 77, 109, 0.35)',
          maxWidth: '780px',
          margin: '44px auto 0',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ff4d6d',
            fontSize: '14px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '10px',
          }}
        >
          <Heart size={18} fill="#ffffff" color="#000000" /> One Last Reason... <Heart size={18} fill="#000000" color="#ffffff" />
        </div>
        <p
          style={{
            fontSize: 'clamp(15px, 2.3vw, 17px)',
            color: '#ffd166',
            lineHeight: 1.7,
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          "Indha 27 reasons mattum illa Divya... naan unna love panna reasons count panna start pannina, adhu 27 la mudiyadhu. Every single day pudhusa oru reason kidaichitte irukkum. You're my first love, my favourite person and my forever choice. ❤️♾️"
        </p>
      </div>
    </section>
  );
}

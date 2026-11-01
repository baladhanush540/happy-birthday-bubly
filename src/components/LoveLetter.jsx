import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, Volume2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  const fullLetter = `❤️ Happy Birthday, My Divya! 🥹🫂

En Uyirukku Iniya Pirandhanaal Vazhthukkal, Divya! ❤️🎂

Dear Divya,

Inniku un birthday... aana indha naal enakku mattum illa, romba special. Yenna indha ulagathula enakku ivlo special ahana oru person vandha naal idhu. ❤️

Namma relationship start aagi 3 years aagiduchu. Indha 3 years la evlo memories, evlo happiness, evlo fights, evlo tears, evlo cute moments... ellame kadandhu vandhirukkom.

Unakku theriyuma? Nee en first love. Naanum un first love. Rendu perukkum love na enna nu theriyama start aana indha journey, inniku en life la romba precious ahana part ah maariduchu.

Namma first selfie la irundha happiness, first date la irundha nervousness, bus journey la irundha closeness, beach la spend panna moments, naa unakku poo vachcha andha cute moment, holding hands, random selfies, shopping, lunch, college moments... idhellam photos mattum illa Divya. Idhellam en life oda unforgettable chapters. ❤️

Naan unna romba sincere ah love panren. Sila neram en possessiveness adhigama irukkalam. Unna vera yaar kittayum share panna pidikkama irukkalam. Un attention enakku mattum venum nu thonalam. Sila neram jealousy la unnecessary ah react pannirukkalam.

Aana adhellam unna control panna illa. Unna lose panniduvomo ngra bayamum, nee enakku evlo important ngra feeling um dhaan adhukku pinnadi irukku. Un freedom, un happiness, un dreams ellathayum respect panni, unakku support ah irukkanum nu dhaan en aasai.

Sometimes namma sandai poduvom, kovapaduvom, pesama iruppom. Aana andha moments la kooda unna love panradhu mattum maaradhu. Ego vida namma relationship mukkiyam nu naan namburen.

Divya, nee enakku just girlfriend mattum illa. Nee en first love, en favourite person, en happiness, en daily thoughts la irukkura special person.

Future la namakku enna nadakkum nu theriyadhu. Aana un kooda innum neraya birthdays celebrate pannanum, neraya places travel pannanum, neraya photos edukkanum, neraya memories create pannanum.

Un dreams ellame fulfil aaganum. Nee life la periya success achieve pannanum. Un face la irukkura smile eppovume irukkanum. Unakku kashtam varumbodhu unakku support ah naan irukkanum. Un happiness la first ah smile panra person ah irukkanum.

One promise from my heart...

Namma first love story ah oru beautiful lifetime memory ah maatha enakku aasai. Unna inniku love panra alavukku, future la innum better ah love pannanum. Unna understand pannanum, respect pannanum, un kooda grow aaganum.

Finally...

Indha 3 years la en life ku vandha ella happiness kum thank you. Enna poruthavaraikkum, nee oru ordinary person illa. En life la nadandha most beautiful coincidence.

Happy Birthday, My First Love. Happy Birthday, My Divya! ❤️🥹

I LOVE YOU SO MUCH, DIVYA! 🫂💗

Yesterday, Today, Tomorrow... Every version of my heart will choose you. ❤️

Forever Yours! ♾️`;

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
    const speed = 12; // faster typing speed
    const timer = setInterval(() => {
      if (i < fullLetter.length) {
        setDisplayText(fullLetter.slice(0, i + 1));
        i += 2; // type smoothly
      } else {
        setDisplayText(fullLetter);
        setIsTypingDone(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [isOpen]);

  const showAllText = () => {
    setDisplayText(fullLetter);
    setIsTypingDone(true);
  };

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
          <Mail size={14} /> Birthday Letter 💌
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          A Birthday Letter For Divya
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px' }}>
          Tied with 3 years of memories and endless love. Tap the wax seal to open.
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
                For My Divya's Eyes Only ❤️
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
                <Sparkles size={14} /> Click wax seal to open & read
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
                fontSize: 'clamp(17px, 2.3vw, 21px)',
                lineHeight: '1.75',
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
                flexWrap: 'wrap',
                gap: '12px',
                borderTop: '1px solid #d4a373',
                paddingTop: '16px',
              }}
            >
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
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

                {!isTypingDone && (
                  <button
                    onClick={showAllText}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#c2410c',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      textDecoration: 'underline',
                    }}
                  >
                    ⚡ Show Full Letter
                  </button>
                )}
              </div>

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

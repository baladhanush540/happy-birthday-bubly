import React, { useState } from 'react';
import { HelpCircle, Sparkles, Check, Heart, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'Who fell in love first?',
    options: [
      { text: 'Me (I fell the moment I looked into your eyes!)', correct: true, note: 'True story! My heart knew immediately.' },
      { text: 'Divya (She secretly had a crush first 😉)', correct: true, note: 'Haha, maybe both of us at the exact same second!' },
      { text: 'It was instant cosmic magic ✨', correct: true, note: 'Written in the stars from day one.' },
    ],
  },
  {
    id: 2,
    question: "What is Divya's ultimate superpower?",
    options: [
      { text: 'Looking impossibly cute even when angry', correct: true, note: 'Those puffed cheeks are unbeatable!' },
      { text: 'Fixing my worst moods with one voice note', correct: true, note: 'Your voice is pure medicine.' },
      { text: 'All of the above + being the sweetest girl alive', correct: true, note: '100% facts! Nobody comes close.' },
    ],
  },
  {
    id: 3,
    question: 'What happens when we start arguing about who loves who more?',
    options: [
      { text: 'I win, because I love you to the moon and back!', correct: true, note: 'Infinity + 1!' },
      { text: 'Divya wins, because her love is unmatched!', correct: true, note: 'You are my greatest blessing.' },
      { text: 'We tie, and seal it with a long warm hug', correct: true, note: 'The only correct way to end the fight!' },
    ],
  },
  {
    id: 4,
    question: 'Where does Divya belong for all of eternity?',
    options: [
      { text: 'Right inside my heart, safely protected forever', correct: true, note: 'Locked with no key to escape!' },
      { text: 'Walking beside me, holding my hand through life', correct: true, note: 'Hand in hand, always.' },
      { text: 'In my arms, being pampered every single day', correct: true, note: 'My forever queen.' },
    ],
  },
  {
    id: 5,
    question: 'What is our most cherished first moment together?',
    options: [
      { text: 'Our very first picture together in the mall 📸', correct: true, note: 'Standing close to you in that purple dress gave me butterflies!' },
      { text: 'Murugan Kovil-la poo vacha andha divine moment 🌸', correct: true, note: 'That flower placed by your hands became my heart\'s treasure.' },
      { text: 'Every single second of our 3 years together ❤️', correct: true, note: 'Each second with you is a lifetime memory!' },
    ],
  },
  {
    id: 6,
    question: "What happens when Bala looks into Divya's eyes?",
    options: [
      { text: 'Completely forgets whatever he was about to say 🥹', correct: true, note: 'Your eyes hold a magic spell that stops time!' },
      { text: 'Falls in love all over again, deeper than yesterday ❤️', correct: true, note: 'Every single glance feels like the first day.' },
      { text: 'Gets an uncontrollable urge to pull your cheeks 🥰', correct: true, note: 'Cuteness overload is 100% real!' },
    ],
  },
  {
    id: 7,
    question: 'What is our favorite travel & outing memory?',
    options: [
      { text: 'Bus journey window seat with earphone sharing 🚌🎧', correct: true, note: 'Destination didn\'t matter, only you next to me!' },
      { text: 'Sunset beach walk holding hands by the seashore 🌊🌅', correct: true, note: 'Golden hour waves, but my eyes were only on you.' },
      { text: 'Random shopping and lunch dates together 🛍️🍽️', correct: true, note: 'Simple food, endless laughter, best company!' },
    ],
  },
  {
    id: 8,
    question: 'Who gets more cute-possessive in our relationship?',
    options: [
      { text: "Bala (He wants Divya's attention 24/7 😉)", correct: true, note: 'Because you are my universe and nobody else\'s!' },
      { text: 'Divya (Her cute jealousy and anger is pure love 💗)', correct: true, note: 'The cutest pout in the world when jealous!' },
      { text: "Both of us! Because we can't stand a minute apart ♾️", correct: true, note: 'Two hearts, one soul, zero competition!' },
    ],
  },
  {
    id: 9,
    question: "What is Bala's biggest promise to Divya for the future?",
    options: [
      { text: 'To hold your hand and stand by you in every situation 🤝', correct: true, note: 'Your forever support and safest shelter.' },
      { text: 'To celebrate every single birthday together till we are 100 🎂', correct: true, note: 'A century of birthdays and a lifetime of love!' },
      { text: 'To love, respect, understand, and choose you every day ❤️', correct: true, note: 'Yesterday, today, tomorrow, and forever!' },
    ],
  },
  {
    id: 10,
    question: 'What is the absolute truth about Bala & Divya?',
    options: [
      { text: 'First Love, True Love, and Forever Love ❤️♾️', correct: true, note: 'Started with zero knowledge of love, now our whole world!' },
      { text: 'Made for each other by the universe ✨', correct: true, note: 'Written in the stars, certified by our hearts!' },
      { text: 'Endless memories, zero regrets, 100% soulmates 🫂', correct: true, note: 'The most beautiful coincidence of my life!' },
    ],
  },
];

export default function CoupleQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
    setFeedback(option.note);

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#000000', '#ff4d6d', '#ffd166'],
    });

    setTimeout(() => {
      setFeedback(null);
      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        setCurrentQ((prev) => prev + 1);
      } else {
        setIsCompleted(true);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#ffffff', '#000000', '#ffd166', '#ff4d6d'],
        });
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setAnswers({});
    setFeedback(null);
    setIsCompleted(false);
  };

  const q = QUIZ_QUESTIONS[currentQ];

  return (
    <section
      id="quiz"
      style={{
        padding: '90px 20px',
        maxWidth: '820px',
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
          <HelpCircle size={14} /> Cute Couple Challenge
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
          How Well Do You Know Us?
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px' }}>
          Test your memory and see what our hearts already know!
        </p>
      </div>

      <div
        className="glass-panel"
        style={{
          padding: '40px 30px',
          borderRadius: '28px',
          border: '1px solid rgba(224, 169, 109, 0.3)',
          background: 'linear-gradient(145deg, rgba(32, 14, 50, 0.9), rgba(16, 7, 26, 0.95))',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 77, 109, 0.2)',
          minHeight: '340px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {!isCompleted ? (
          <div>
            {/* Progress Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: '#e0a96d',
                marginBottom: '12px',
                fontWeight: 600,
              }}
            >
              <span>Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>Divya Edition 💕</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff4d6d, #ffd166)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>

            {/* Question Text */}
            <h3
              className="font-serif"
              style={{
                fontSize: '22px',
                color: '#fff',
                marginBottom: '26px',
                lineHeight: 1.4,
              }}
            >
              {q.question}
            </h3>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(q.id, opt)}
                  className="btn-glass"
                  style={{
                    padding: '16px 20px',
                    textAlign: 'left',
                    fontSize: '15px',
                    borderRadius: '16px',
                    background:
                      answers[q.id]?.text === opt.text
                        ? 'linear-gradient(135deg, rgba(255, 77, 109, 0.4), rgba(224, 169, 109, 0.4))'
                        : 'rgba(255, 255, 255, 0.05)',
                    borderColor:
                      answers[q.id]?.text === opt.text
                        ? '#ffd166'
                        : 'rgba(244, 194, 194, 0.2)',
                    color: '#fdf4ec',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      answers[q.id]?.text === opt.text
                        ? 'linear-gradient(135deg, rgba(255, 77, 109, 0.4), rgba(224, 169, 109, 0.4))'
                        : 'rgba(255, 255, 255, 0.05)')
                  }
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {/* Instant Reaction Popup */}
            {feedback && (
              <div
                style={{
                  marginTop: '20px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'rgba(255, 77, 109, 0.2)',
                  border: '1px solid #ff758f',
                  color: '#ffd166',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                💖 {feedback}
              </div>
            )}
          </div>
        ) : (
          /* Result Trophy Screen */
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div
              className="animate-pulse-heart"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffd166, #ff4d6d)',
                marginBottom: '20px',
              }}
            >
              <Trophy size={42} color="#1a0a20" />
            </div>

            <h3
              className="font-serif text-gradient-gold"
              style={{ fontSize: '28px', marginBottom: '10px' }}
            >
              Compatibility Score: 1000%
            </h3>

            <p style={{ color: '#f6d1b1', fontSize: '17px', lineHeight: 1.6, maxWidth: '500px', margin: '0 auto 24px' }}>
              Confirmed by science, certified by the stars: You and I were tailor-made for each other, Divya! 🥰
            </p>

            <button
              onClick={restartQuiz}
              className="btn-romantic"
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              <RotateCcw size={16} /> Play Again With Divya
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

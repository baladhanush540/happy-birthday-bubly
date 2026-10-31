import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles, Upload } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [customTrackName, setCustomTrackName] = useState(null);
  const [customAudioUrl, setCustomAudioUrl] = useState(null);

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const audioElementRef = useRef(null);

  // Web Audio Romantic Melody Generator
  const playRomanticChord = (notes, time, duration = 2.5) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft sine wave for gentle rhodes/music box chime feel
      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, time + index * 0.08);

      // Gentle envelope
      gain.gain.setValueAtTime(0, time + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.04, time + index * 0.08 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(time + index * 0.08);
      osc.stop(time + duration + 0.5);
    });
  };

  const startSynthProgression = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    // Romantic Chords frequencies (Cmaj9, Am9, Fmaj7, G6)
    const chords = [
      [261.63, 329.63, 392.0, 493.88, 587.33], // Cmaj9
      [220.0, 261.63, 329.63, 392.0, 493.88],  // Am9
      [174.61, 220.0, 261.63, 329.63, 392.0],  // Fmaj7
      [196.0, 246.94, 293.66, 392.0, 440.0],   // G6
    ];

    let chordIndex = 0;
    const playNext = () => {
      if (!audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      playRomanticChord(chords[chordIndex % chords.length], ctx.currentTime, 3.6);
      chordIndex++;
      timerRef.current = setTimeout(playNext, 3800);
    };

    playNext();
  };

  const stopSynth = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = () => {
    if (customAudioUrl && audioElementRef.current) {
      if (isPlaying) {
        audioElementRef.current.pause();
        setIsPlaying(false);
      } else {
        audioElementRef.current.play().catch(console.error);
        setIsPlaying(true);
      }
      return;
    }

    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynthProgression();
      setIsPlaying(true);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      stopSynth();
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
      setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
      setIsPlaying(true);
      setTimeout(() => {
        if (audioElementRef.current) {
          audioElementRef.current.play().catch(console.error);
        }
      }, 100);
    }
  };

  useEffect(() => {
    return () => {
      stopSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {customAudioUrl && (
        <audio
          ref={audioElementRef}
          src={customAudioUrl}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Music Widget */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 18px',
          borderRadius: '50px',
          border: '1px solid rgba(224, 169, 109, 0.4)',
          background: 'rgba(20, 10, 30, 0.85)',
          boxShadow: isPlaying ? '0 0 25px rgba(255, 77, 109, 0.4)' : '0 10px 25px rgba(0,0,0,0.5)',
          transition: 'all 0.3s ease',
        }}
      >
        <button
          onClick={togglePlay}
          style={{
            background: isPlaying
              ? 'linear-gradient(135deg, #ff4d6d, #c9184a)'
              : 'rgba(255,255,255,0.1)',
            border: 'none',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          title={isPlaying ? 'Pause Music' : 'Play Romantic Music'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#f6d1b1',
                letterSpacing: '0.3px',
              }}
            >
              {customTrackName || 'Romantic Melody 🎵'}
            </span>
            {isPlaying && (
              <span style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '12px' }}>
                <span
                  style={{
                    width: '3px',
                    height: '100%',
                    background: '#ff4d6d',
                    borderRadius: '2px',
                    animation: 'floatSlow 0.6s infinite alternate',
                  }}
                />
                <span
                  style={{
                    width: '3px',
                    height: '60%',
                    background: '#ffd166',
                    borderRadius: '2px',
                    animation: 'floatSlow 0.8s infinite alternate 0.2s',
                  }}
                />
                <span
                  style={{
                    width: '3px',
                    height: '85%',
                    background: '#e0a96d',
                    borderRadius: '2px',
                    animation: 'floatSlow 0.5s infinite alternate 0.4s',
                  }}
                />
              </span>
            )}
          </div>
          <span style={{ fontSize: '11px', color: '#c8b9d2' }}>
            {isPlaying ? 'Playing for Bubly...' : 'Tap play for background music'}
          </span>
        </div>

        {/* Custom Song Upload Option */}
        <label
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '6px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            color: '#c8b9d2',
            transition: 'background 0.2s',
          }}
          title="Upload your own song / MP3"
        >
          <Upload size={14} />
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      </div>
    </div>
  );
}

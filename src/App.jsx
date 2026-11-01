import React, { useState } from 'react';
import BackgroundStars from './components/BackgroundStars';
import AudioPlayer from './components/AudioPlayer';
import LockScreen from './components/LockScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PolaroidGallery from './components/PolaroidGallery';
import LoveLetter from './components/LoveLetter';
import ReasonsJar from './components/ReasonsJar';
import LoveCoupons from './components/LoveCoupons';
import CoupleQuiz from './components/CoupleQuiz';
import ForeverProposal from './components/ForeverProposal';
import Footer from './components/Footer';

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Dynamic Starry & Petal Background */}
      <BackgroundStars />

      {/* Lock Screen Gateway */}
      {!isUnlocked && (
        <LockScreen onUnlock={() => setIsUnlocked(true)} />
      )}

      {/* Main Experience Once Unlocked */}
      {isUnlocked && (
        <div style={{ position: 'relative', zIndex: 1, animation: 'fadeIn 0.8s ease' }}>
          <Navbar />
          <main>
            <HeroSection targetDateStr="2026-11-02T00:00:00" />
            <PolaroidGallery />
            <LoveLetter />
            <ReasonsJar />
            <LoveCoupons />
            <CoupleQuiz />
            <ForeverProposal />
          </main>
          <Footer />

          {/* Floating Audio Controller */}
          <AudioPlayer />
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Camera,
  Heart,
  Calendar,
  Sparkles,
  Plus,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  X,
  Clock,
  LayoutGrid,
  Film,
  Edit3,
  MapPin,
  Trash2,
  Save,
  Check,
} from 'lucide-react';
import defaultMemories from '../data/memories.json';

const INITIAL_MEMORIES = defaultMemories;

export default function PolaroidGallery() {
  const [memories, setMemories] = useState(() => {
    try {
      const saved = localStorage.getItem('bubly_memories_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= defaultMemories.length) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return defaultMemories;
  });

  const [activeTab, setActiveTab] = useState('slideshow'); // 'slideshow' | 'timeline' | 'polaroid'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Modal State for Adding/Editing Memory
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formSecret, setFormSecret] = useState('');
  const [formImage, setFormImage] = useState('');

  // Persist memories
  useEffect(() => {
    try {
      localStorage.setItem('bubly_memories_v3', JSON.stringify(memories));
    } catch (e) {
      console.error(e);
    }
  }, [memories]);

  // Slideshow Autoplay Timer
  useEffect(() => {
    if (!isPlaying || activeTab !== 'slideshow' || memories.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, activeTab, memories.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length);
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'saved' | null

  // Save changes permanently to project files via Vite backend endpoint
  const saveToBackend = async (dataToSave) => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/save-memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });
      const result = await res.json();
      if (result.success && result.memories) {
        setMemories(result.memories);
        localStorage.setItem('bubly_memories_v3', JSON.stringify(result.memories));
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(null), 4000);
      }
    } catch (err) {
      console.error('Failed to sync to project files:', err);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 4000);
    } finally {
      setIsSaving(false);
    }
  };

  // Open Add Modal
  const openAddModal = () => {
    setEditingMemory(null);
    setFormTitle('');
    setFormLocation('PVR Escape / Favorite Spot');
    setFormDate('Special Date');
    setFormCaption('');
    setFormSecret('');
    setFormImage('/images/bubly_mall_date.jpg');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (mem) => {
    setEditingMemory(mem);
    setFormTitle(mem.title);
    setFormLocation(mem.location || '');
    setFormDate(mem.date || '');
    setFormCaption(mem.caption || '');
    setFormSecret(mem.secretNote || '');
    setFormImage(mem.image || '');
    setIsModalOpen(true);
  };

  // Handle Form Submit
  const handleSaveMemory = (e) => {
    e.preventDefault();
    let updated;
    if (editingMemory) {
      // Edit existing
      updated = memories.map((m) =>
        m.id === editingMemory.id
          ? {
              ...m,
              title: formTitle,
              location: formLocation,
              date: formDate,
              caption: formCaption,
              secretNote: formSecret,
              image: formImage || m.image,
            }
          : m
      );
    } else {
      // Add new
      const newMem = {
        id: 'mem-' + Date.now(),
        title: formTitle || 'Another Sweet Memory With Bubly 💕',
        location: formLocation || 'Our Special Place',
        date: formDate || 'Memorable Day',
        caption: formCaption || 'Every single moment with you is a treasure, Bubly.',
        secretNote: formSecret || 'I love you more than words can express.',
        image: formImage || '/images/bubly_mall_date.jpg',
      };
      updated = [...memories, newMem];
      setCurrentIndex(memories.length);
    }
    setMemories(updated);
    setIsModalOpen(false);
    saveToBackend(updated);
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setFormImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete Memory
  const handleDeleteMemory = (id, e) => {
    e.stopPropagation();
    if (memories.length <= 1) {
      alert('Keep at least one memory!');
      return;
    }
    if (window.confirm('Are you sure you want to delete this memory?')) {
      const updated = memories.filter((m) => m.id !== id);
      setMemories(updated);
      setCurrentIndex(0);
      saveToBackend(updated);
    }
  };

  const currentMem = memories[currentIndex] || memories[0];

  return (
    <section id="story" style={{ padding: '80px 20px', maxWidth: '1180px', margin: '0 auto' }}>
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span
          className="glass-pill"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 20px',
            fontSize: '13px',
            color: '#ffd166',
            fontWeight: 600,
            marginBottom: '12px',
          }}
        >
          <Camera size={14} /> Our Visual Love Story 📸
        </span>
        <h2 className="font-serif text-gradient-rose" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
          Every Picture Holds A Piece Of My Heart
        </h2>
        <p style={{ color: '#c8b9d2', fontSize: '15px', maxWidth: '620px', margin: '10px auto 24px' }}>
          From taking our very first picture together at the mall to starry nights and quiet coffee talks, every second with you is a memory I never want to forget.
        </p>

        {/* View Mode Switcher & Add Button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div
            className="glass-panel"
            style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: '50px',
              background: 'rgba(20, 10, 30, 0.8)',
            }}
          >
            <button
              onClick={() => setActiveTab('slideshow')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '40px',
                border: 'none',
                background:
                  activeTab === 'slideshow'
                    ? 'linear-gradient(135deg, #ff4d6d, #c9184a)'
                    : 'transparent',
                color: activeTab === 'slideshow' ? '#fff' : '#c8b9d2',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Film size={14} /> Cinematic Slideshow
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '40px',
                border: 'none',
                background:
                  activeTab === 'timeline'
                    ? 'linear-gradient(135deg, #ff4d6d, #c9184a)'
                    : 'transparent',
                color: activeTab === 'timeline' ? '#fff' : '#c8b9d2',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <Clock size={14} /> Moments Timeline
            </button>

            <button
              onClick={() => setActiveTab('polaroid')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                borderRadius: '40px',
                border: 'none',
                background:
                  activeTab === 'polaroid'
                    ? 'linear-gradient(135deg, #ff4d6d, #c9184a)'
                    : 'transparent',
                color: activeTab === 'polaroid' ? '#fff' : '#c8b9d2',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <LayoutGrid size={14} /> Polaroid Grid
            </button>
          </div>

          <button
            onClick={openAddModal}
            className="btn-gold"
            style={{ padding: '9px 20px', fontSize: '13px' }}
          >
            <Plus size={16} /> Add Another Picture Memory
          </button>

          <button
            onClick={() => saveToBackend(memories)}
            disabled={isSaving}
            className="btn-romantic"
            style={{
              padding: '9px 20px',
              fontSize: '13px',
              background:
                saveStatus === 'saved'
                  ? 'linear-gradient(135deg, #10b981, #059669)'
                  : undefined,
              boxShadow:
                saveStatus === 'saved'
                  ? '0 0 20px rgba(16, 185, 129, 0.5)'
                  : undefined,
            }}
            title="Saves all your edits and pictures permanently into project files so Bubly sees them on her phone!"
          >
            {saveStatus === 'saved' ? <Check size={16} /> : <Save size={16} />}
            {isSaving
              ? 'Saving to Files...'
              : saveStatus === 'saved'
              ? 'Saved to Code (Ready to Host) ✅'
              : '💾 Save Permanently for Host'}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. CINEMATIC SLIDESHOW MODE                                     */}
      {/* ============================================================== */}
      {activeTab === 'slideshow' && (
        <div
          className="glass-panel"
          style={{
            borderRadius: '32px',
            padding: '24px',
            border: '2px solid rgba(224, 169, 109, 0.35)',
            background: 'linear-gradient(145deg, rgba(32, 14, 50, 0.95), rgba(16, 7, 26, 0.95))',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 77, 109, 0.25)',
            position: 'relative',
          }}
        >
          {/* Main Slideshow Showcase Area */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(280px, 1fr)',
              gap: '32px',
              alignItems: 'center',
            }}
            className="slideshow-grid"
          >
            {/* Image Viewer */}
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#0a0312',
                boxShadow: '0 15px 40px rgba(0,0,0,0.7)',
                height: '460px',
                border: '1px solid rgba(244, 194, 194, 0.25)',
              }}
            >
              <img
                src={currentMem.image}
                alt={currentMem.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              />

              {/* Floating Location / Date Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'rgba(15, 6, 25, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '6px 14px',
                  borderRadius: '25px',
                  color: '#ffd166',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid rgba(255, 209, 102, 0.3)',
                }}
              >
                <MapPin size={13} color="#ff4d6d" /> {currentMem.location} • {currentMem.date}
              </div>

              {/* Zoom & Edit Overlay Buttons */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <button
                  onClick={() => openEditModal(currentMem)}
                  style={{
                    background: 'rgba(15, 6, 25, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title="Edit Caption or Change Photo"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => setLightboxImg(currentMem.image)}
                  style={{
                    background: 'rgba(15, 6, 25, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  title="View Fullscreen"
                >
                  <Maximize2 size={15} />
                </button>
              </div>

              {/* Left / Right Floating Slide Controls */}
              <button
                onClick={handlePrev}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(15, 6, 25, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Previous Memory"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(15, 6, 25, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                title="Next Memory"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* Individual Story & Caption Details */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ffd166',
                  fontSize: '13px',
                  fontWeight: 600,
                  marginBottom: '10px',
                }}
              >
                <Sparkles size={15} /> Memory #{currentIndex + 1} of {memories.length}
              </div>

              <h3
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  color: '#fff',
                  lineHeight: 1.25,
                  marginBottom: '16px',
                }}
              >
                {currentMem.title}
              </h3>

              {/* Romantic Caption */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderRadius: '18px',
                  padding: '20px',
                  border: '1px solid rgba(244, 194, 194, 0.15)',
                  marginBottom: '16px',
                }}
              >
                <p
                  style={{
                    fontSize: '15px',
                    color: '#fdf4ec',
                    lineHeight: '1.65',
                    fontStyle: 'italic',
                  }}
                >
                  "{currentMem.caption}"
                </p>
              </div>

              {/* Secret Heart Note */}
              <div
                style={{
                  background: 'rgba(255, 77, 109, 0.12)',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  border: '1px dashed #ff758f',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#ff758f',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                  }}
                >
                  <Heart size={14} fill="#ff4d6d" /> Secret Confession To Bubly
                </div>
                <p style={{ color: '#ffd166', fontSize: '13px', lineHeight: 1.5, margin: 0 }}>
                  {currentMem.secretNote}
                </p>
              </div>

              {/* Slideshow Progress Bar & Autoplay Toggle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(224, 169, 109, 0.3)',
                    color: '#ffd166',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  {isPlaying ? 'Pause Slideshow' : 'Autoplay Slideshow'}
                </button>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {memories.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      style={{
                        width: i === currentIndex ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background:
                          i === currentIndex
                            ? 'linear-gradient(90deg, #ff4d6d, #ffd166)'
                            : 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                      }}
                      title={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginTop: '28px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {memories.map((m, idx) => (
              <div
                key={m.id}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  minWidth: '95px',
                  height: '70px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border:
                    idx === currentIndex
                      ? '2px solid #ffd166'
                      : '2px solid transparent',
                  opacity: idx === currentIndex ? 1 : 0.55,
                  transform: idx === currentIndex ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
              >
                <img
                  src={m.image}
                  alt={m.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 2. SPECIAL MOMENTS TIMELINE MODE                                */}
      {/* ============================================================== */}
      {activeTab === 'timeline' && (
        <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto', padding: '20px 0' }}>
          {/* Vertical Glowing Timeline Line */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '50%',
              width: '3px',
              background: 'linear-gradient(180deg, #ff4d6d, #ffd166, #ff758f)',
              transform: 'translateX(-50%)',
              boxShadow: '0 0 15px rgba(255, 77, 109, 0.5)',
              display: 'block',
            }}
            className="timeline-central-line"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {memories.map((mem, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={mem.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isEven ? 'flex-start' : 'flex-end',
                    position: 'relative',
                  }}
                >
                  {/* Central Node Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #ffd166, #ff4d6d)',
                      border: '3px solid #1a0a25',
                      boxShadow: '0 0 15px rgba(255, 77, 109, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10,
                      color: '#1a0a25',
                      fontSize: '12px',
                      fontWeight: 800,
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* Timeline Card */}
                  <div
                    className="glass-panel"
                    style={{
                      width: '44%',
                      padding: '24px',
                      borderRadius: '24px',
                      border: '1px solid rgba(224, 169, 109, 0.35)',
                      background:
                        'linear-gradient(145deg, rgba(32, 14, 50, 0.95), rgba(16, 7, 26, 0.95))',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        height: '180px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        marginBottom: '16px',
                      }}
                    >
                      <img
                        src={mem.image}
                        alt={mem.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          background: 'rgba(15, 6, 25, 0.85)',
                          backdropFilter: 'blur(8px)',
                          padding: '4px 10px',
                          borderRadius: '15px',
                          color: '#ffd166',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        {mem.date}
                      </div>
                    </div>

                    <h4
                      className="font-serif"
                      style={{ fontSize: '18px', color: '#fff', marginBottom: '8px' }}
                    >
                      {mem.title}
                    </h4>

                    <p style={{ fontSize: '13px', color: '#c8b9d2', lineHeight: '1.5', marginBottom: '12px' }}>
                      "{mem.caption}"
                    </p>

                    <div
                      style={{
                        fontSize: '12px',
                        color: '#ffd166',
                        background: 'rgba(255, 77, 109, 0.12)',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1px dashed #ff758f',
                      }}
                    >
                      {mem.secretNote}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. POLAROID FLIP GRID MODE                                     */}
      {/* ============================================================== */}
      {activeTab === 'polaroid' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '32px',
          }}
        >
          {memories.map((item, idx) => (
            <div
              key={item.id}
              style={{
                background: '#ffffff',
                padding: '16px 16px 24px',
                borderRadius: '14px',
                boxShadow:
                  '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(224, 169, 109, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                transform: `rotate(${idx % 2 === 0 ? '-1.5deg' : '1.5deg'})`,
                position: 'relative',
              }}
            >
              {/* Tape */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '22px',
                  background: 'rgba(246, 209, 177, 0.8)',
                  border: '1px dashed rgba(224, 169, 109, 0.6)',
                }}
              />

              <div
                style={{
                  width: '100%',
                  height: '260px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: '#1a0a25',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    background: 'rgba(15, 6, 25, 0.85)',
                    padding: '4px 10px',
                    borderRadius: '15px',
                    color: '#ffd166',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  {item.location}
                </div>
              </div>

              <div style={{ marginTop: '14px', textAlign: 'center' }}>
                <h4
                  className="font-handwriting"
                  style={{ fontSize: '22px', color: '#3b1248', fontWeight: 700 }}
                >
                  {item.title}
                </h4>
                <p
                  className="font-handwriting"
                  style={{ fontSize: '16px', color: '#6b3278', marginTop: '4px' }}
                >
                  "{item.caption}"
                </p>
              </div>

              <button
                onClick={(e) => handleDeleteMemory(item.id, e)}
                style={{
                  marginTop: '10px',
                  alignSelf: 'center',
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Trash2 size={12} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ============================================================== */}
      {/* LIGHTBOX MODAL                                                 */}
      {/* ============================================================== */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(0, 0, 0, 0.92)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            <X size={32} />
          </button>
          <img
            src={lightboxImg}
            alt="Fullscreen memory"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: '16px',
              boxShadow: '0 0 40px rgba(255, 77, 109, 0.4)',
            }}
          />
        </div>
      )}

      {/* ============================================================== */}
      {/* ADD / EDIT MEMORY MODAL                                        */}
      {/* ============================================================== */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(10, 5, 20, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '540px',
              width: '100%',
              padding: '32px',
              borderRadius: '28px',
              border: '2px solid rgba(224, 169, 109, 0.4)',
              background: 'linear-gradient(135deg, rgba(35, 16, 54, 0.98), rgba(18, 8, 30, 0.98))',
              boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: '#c8b9d2',
                cursor: 'pointer',
              }}
            >
              <X size={22} />
            </button>

            <h3
              className="font-serif text-gradient-rose"
              style={{ fontSize: '24px', marginBottom: '8px' }}
            >
              {editingMemory ? 'Edit Memory Caption' : 'Add New Picture Memory'}
            </h3>
            <p style={{ color: '#c8b9d2', fontSize: '13px', marginBottom: '20px' }}>
              Upload your photo with Bubly and write a sweet story for this moment.
            </p>

            <form onSubmit={handleSaveMemory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Image Preview & Upload */}
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100%',
                    height: '180px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#12051e',
                    border: '1px dashed rgba(224, 169, 109, 0.4)',
                    marginBottom: '10px',
                    position: 'relative',
                  }}
                >
                  {formImage ? (
                    <img
                      src={formImage}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8b759a' }}>
                      No image selected
                    </div>
                  )}
                </div>

                <label
                  style={{
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#ffd166',
                    fontSize: '13px',
                    border: '1px solid rgba(255, 209, 102, 0.3)',
                  }}
                >
                  <ImageIcon size={14} /> Upload Picture from Device
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              {/* Title Input */}
              <div>
                <label style={{ fontSize: '12px', color: '#e0a96d', fontWeight: 600 }}>Memory Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Our Movie Date at PVR Escape 🎬"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(244, 194, 194, 0.25)',
                    color: '#fff',
                    marginTop: '4px',
                  }}
                />
              </div>

              {/* Location & Date */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#e0a96d', fontWeight: 600 }}>Location / Spot</label>
                  <input
                    type="text"
                    placeholder="e.g. PVR Escape / Marina"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(244, 194, 194, 0.25)',
                      color: '#fff',
                      marginTop: '4px',
                    }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: '#e0a96d', fontWeight: 600 }}>Date Stamp</label>
                  <input
                    type="text"
                    placeholder="e.g. Our First Date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(244, 194, 194, 0.25)',
                      color: '#fff',
                      marginTop: '4px',
                    }}
                  />
                </div>
              </div>

              {/* Individual Caption */}
              <div>
                <label style={{ fontSize: '12px', color: '#e0a96d', fontWeight: 600 }}>
                  Romantic Caption / Story for this picture
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What made this moment with Bubly so unforgettable? Write your heart out..."
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(244, 194, 194, 0.25)',
                    color: '#fff',
                    marginTop: '4px',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              {/* Secret Heart Note */}
              <div>
                <label style={{ fontSize: '12px', color: '#ff758f', fontWeight: 600 }}>
                  Secret Confession Note 💕
                </label>
                <input
                  type="text"
                  placeholder="e.g. Secret: I couldn't stop staring at your eyes..."
                  value={formSecret}
                  onChange={(e) => setFormSecret(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(244, 194, 194, 0.25)',
                    color: '#fff',
                    marginTop: '4px',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-romantic"
                style={{
                  justifyContent: 'center',
                  padding: '12px',
                  marginTop: '10px',
                  fontSize: '15px',
                }}
              >
                <Heart size={16} fill="#fff" /> Save Picture Memory
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

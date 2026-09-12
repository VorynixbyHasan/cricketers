import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PlayerDetailsView } from './components/PlayerDetailsView';

interface FigurineItem {
  src: string;
  fallbackSrc?: string;
  bg: string;
  panel: string;
  name: string;
  subtitle: string;
  shortInfo: string;
}

const IMAGES: FigurineItem[] = [
  {
    src: 'https://i.ibb.co/YFNCRPM5/Chat-GPT-Image-Sep-13-2026-01-52-16-AM.png',
    fallbackSrc: '/assets/virat-kohli.png',
    bg: '#38BDF8',
    panel: '#7DD3FC',
    name: 'Virat Kohli',
    subtitle: 'India Cricket 3D Figurine',
    shortInfo: '85 Hundreds • 27K+ Intl Runs • 50 ODI 100s',
  },
  {
    src: 'https://i.ibb.co/0VG5Rfj1/Chat-GPT-Image-Sep-11-2026-04-06-45-AM.png',
    fallbackSrc: '/assets/char2.png',
    bg: '#146337',
    panel: '#1E8449',
    name: 'Babar Azam',
    subtitle: 'Pakistan Cricket 3D Figurine',
    shortInfo: '32 Hundreds • 16K+ Intl Runs • 56.7 ODI Avg',
  },
  {
    src: 'https://i.ibb.co/1YmTS3Nq/Chat-GPT-Image-Sep-11-2026-04-06-24-AM.png',
    fallbackSrc: '/assets/char1.png',
    bg: '#1D63D8',
    panel: '#3B82F6',
    name: 'Joe Root',
    subtitle: 'England Cricket 3D Figurine',
    shortInfo: '61 Hundreds • 20K+ Intl Runs • 34 Test 100s',
  },
  {
    src: 'https://i.ibb.co/DP1w5g1Y/Chat-GPT-Image-Sep-13-2026-01-59-21-AM.png',
    fallbackSrc: '/assets/char3.png',
    bg: '#0A0A0C',
    panel: '#18181B',
    name: 'Kane Williamson',
    subtitle: 'New Zealand Cricket 3D Figurine',
    shortInfo: '41 Hundreds • 18K+ Intl Runs • 54.4 Test Avg',
  },
  {
    src: 'https://i.ibb.co/SXzMWwXk/Chat-GPT-Image-Sep-13-2026-03-31-55-AM.png',
    fallbackSrc: '/assets/char4.png',
    bg: '#EAB308',
    panel: '#CA8A04',
    name: 'Steve Smith',
    subtitle: 'Australia Cricket 3D Figurine',
    shortInfo: '47 Hundreds • 18K+ Intl Runs • 58.0 Test Avg',
  },
];

const GRAIN_DATA_URI = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(4);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  const touchStartXRef = useRef<number | null>(null);
  const TOTAL = IMAGES.length;

  // Preload all images + local fallbacks on mount
  useEffect(() => {
    IMAGES.forEach((item) => {
      const img = new Image();
      img.src = item.src;
      if (item.fallbackSrc) {
        const fb = new Image();
        fb.src = item.fallbackSrc;
      }
    });
  }, []);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigate carousel
  const navigate = useCallback(
    (direction: 'next' | 'prev') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) => (direction === 'next' ? (prev + 1) % TOTAL : (prev - 1 + TOTAL) % TOTAL));
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating, TOTAL]
  );

  // Jump directly to specific figurine
  const jumpTo = useCallback(
    (targetIndex: number) => {
      if (isAnimating || targetIndex === activeIndex) return;
      setIsAnimating(true);
      setActiveIndex(targetIndex);
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    },
    [isAnimating, activeIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        navigate('prev');
      } else if (e.key === 'ArrowRight') {
        navigate('next');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Touch navigation for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
    touchStartXRef.current = null;
  };

  // Role calculation for N=5 cricket figurines in continuous 3D elliptical carousel:
  // diff 0: center active (0°)
  // diff 1: right (+1, ~72°)
  // diff TOTAL - 1: left (-1, ~288°)
  // diff 2: back-right (+2, ~144°)
  // diff 3: back-left (-2, ~216°)
  const getRoleStyle = (index: number): React.CSSProperties => {
    const diff = (index - activeIndex + TOTAL) % TOTAL;

    const baseTransition =
      'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1), max-height 650ms cubic-bezier(0.4,0,0.2,1)';

    if (diff === 0) {
      // CENTER: Full Head and Full Body completely visible without being cut off
      return {
        position: 'absolute',
        aspectRatio: '0.72 / 1',
        transform: 'translateX(-50%) scale(1)',
        transformOrigin: 'bottom center',
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 30,
        left: '50%',
        height: isMobile ? '64%' : '80%',
        maxHeight: isMobile ? '540px' : 'calc(100vh - 130px)',
        bottom: isMobile ? '18%' : '24px',
        transition: baseTransition,
        willChange: 'transform, filter, opacity, left',
      };
    } else if (diff === 1) {
      // RIGHT (offset +1)
      return {
        position: 'absolute',
        aspectRatio: '0.72 / 1',
        transform: 'translateX(-50%) scale(0.88)',
        transformOrigin: 'bottom center',
        filter: 'blur(2px)',
        opacity: 0.75,
        zIndex: 20,
        left: isMobile ? '84%' : '76%',
        height: isMobile ? '22%' : '38%',
        maxHeight: isMobile ? '200px' : '340px',
        bottom: isMobile ? '28%' : '14%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity, left',
      };
    } else if (diff === TOTAL - 1) {
      // LEFT (offset -1)
      return {
        position: 'absolute',
        aspectRatio: '0.72 / 1',
        transform: 'translateX(-50%) scale(0.88)',
        transformOrigin: 'bottom center',
        filter: 'blur(2px)',
        opacity: 0.75,
        zIndex: 20,
        left: isMobile ? '16%' : '24%',
        height: isMobile ? '22%' : '38%',
        maxHeight: isMobile ? '200px' : '340px',
        bottom: isMobile ? '28%' : '14%',
        transition: baseTransition,
        willChange: 'transform, filter, opacity, left',
      };
    } else if (diff === 2) {
      // BACK RIGHT (offset +2, ~144° in 3D orbit)
      return {
        position: 'absolute',
        aspectRatio: '0.72 / 1',
        transform: 'translateX(-50%) scale(0.68)',
        transformOrigin: 'bottom center',
        filter: 'blur(4px)',
        opacity: 0.32,
        zIndex: 10,
        left: isMobile ? '68%' : '64%',
        height: isMobile ? '16%' : '26%',
        maxHeight: isMobile ? '150px' : '230px',
        bottom: isMobile ? '30%' : '18%',
        pointerEvents: 'none',
        transition: baseTransition,
        willChange: 'transform, filter, opacity, left',
      };
    } else {
      // BACK LEFT (offset -2, diff === 3, ~216° in 3D orbit)
      return {
        position: 'absolute',
        aspectRatio: '0.72 / 1',
        transform: 'translateX(-50%) scale(0.68)',
        transformOrigin: 'bottom center',
        filter: 'blur(4px)',
        opacity: 0.32,
        zIndex: 10,
        left: isMobile ? '32%' : '36%',
        height: isMobile ? '16%' : '26%',
        maxHeight: isMobile ? '150px' : '230px',
        bottom: isMobile ? '30%' : '18%',
        pointerEvents: 'none',
        transition: baseTransition,
        willChange: 'transform, filter, opacity, left',
      };
    }
  };

  const currentFigurine = IMAGES[activeIndex];

  return (
    <div
      id="toonhub-hero-container"
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: currentFigurine.bg,
        transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'Inter', sans-serif",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        id="toonhub-viewport"
        className="relative w-full"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        {/* 1. Grain overlay */}
        <div
          id="grain-overlay"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: GRAIN_DATA_URI,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: 0.4,
            zIndex: 50,
          }}
          aria-hidden="true"
        />

        {/* 2. Giant player name typography behind the figurine (replaces 3D SHAPE) */}
        <div
          id="ghost-text-player-name"
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none px-4"
          style={{
            top: isMobile ? '12%' : '13%',
            zIndex: 2,
          }}
          aria-hidden="true"
        >
          <span
            key={currentFigurine.name}
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: currentFigurine.name.length > 12
                ? 'clamp(44px, 12.5vw, 190px)'
                : 'clamp(54px, 16vw, 240px)',
              fontWeight: 900,
              color: '#FFFFFF',
              opacity: 0.98,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '0.035em',
              wordSpacing: '0.12em',
              padding: '0 20px',
              whiteSpace: 'nowrap',
              textShadow: '0 10px 40px rgba(0,0,0,0.15)',
              transition: 'all 500ms cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {currentFigurine.name}
          </span>
        </div>

        {/* 3. Top-left label showing the active cricketer */}
        <div
          id="cricketer-header-label"
          className="absolute top-6 left-4 sm:left-8 flex items-center gap-2 sm:gap-2.5 text-xs font-semibold uppercase text-white"
          style={{
            zIndex: 60,
            opacity: 0.95,
            letterSpacing: '0.12em',
          }}
        >
          <span className="font-extrabold tracking-widest text-xs sm:text-sm text-white">
            {currentFigurine.name}
          </span>
          <span className="opacity-40 font-normal">|</span>
          <span className="text-[11px] sm:text-xs font-medium tracking-wider opacity-85">
            {currentFigurine.subtitle}
          </span>
        </div>

        {/* 4. Carousel */}
        <div
          id="figurines-carousel"
          className="absolute inset-0"
          style={{ zIndex: 3 }}
        >
          {IMAGES.map((item, index) => {
            const roleStyle = getRoleStyle(index);
            const isCurrentCenter = index === activeIndex;

            return (
              <div
                key={item.src}
                id={`carousel-item-${index}`}
                style={{
                  ...roleStyle,
                  cursor: isCurrentCenter ? 'default' : 'pointer',
                }}
                onClick={() => {
                  if (!isCurrentCenter) {
                    jumpTo(index);
                  }
                }}
                aria-hidden={!isCurrentCenter}
                title={isCurrentCenter ? item.name : `Switch to ${item.name} (${item.subtitle})`}
              >
                <img
                  id={`carousel-img-${index}`}
                  src={item.src}
                  alt={`${item.name} - ${item.subtitle}`}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  onError={(e) => {
                    if (item.fallbackSrc && e.currentTarget.src !== window.location.origin + item.fallbackSrc) {
                      e.currentTarget.src = item.fallbackSrc;
                    }
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'bottom center',
                    filter: isCurrentCenter ? 'drop-shadow(0 16px 28px rgba(0,0,0,0.32))' : undefined,
                    transition: 'filter 650ms cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons + indicator pills */}
        <div
          id="bottom-left-info"
          className="absolute bottom-6 left-4 sm:bottom-14 sm:left-16 text-white"
          style={{
            zIndex: 60,
            maxWidth: isMobile ? '290px' : '360px',
          }}
        >
          <p className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase opacity-80 mb-1">
            0{activeIndex + 1} / 0{TOTAL} • {currentFigurine.subtitle}
          </p>

          <h2
            id="product-heading"
            className="font-black uppercase tracking-[0.02em] mb-1 text-2xl sm:text-[34px] leading-tight drop-shadow-sm"
          >
            {currentFigurine.name}
          </h2>

          <p
            id="product-description"
            className="text-xs sm:text-sm text-white/90 leading-relaxed mb-5 font-medium"
          >
            {currentFigurine.shortInfo}
          </p>

          <div id="navigation-controls" className="flex items-center gap-3 sm:gap-4">
            <button
              id="nav-btn-prev"
              type="button"
              onClick={() => navigate('prev')}
              disabled={isAnimating}
              aria-label="Previous figurine"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer border-2 border-white text-white transition-all duration-150 hover:scale-[1.08] hover:bg-white/15 active:scale-95 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: 'transparent' }}
            >
              <ArrowLeft size={24} strokeWidth={2.25} />
            </button>

            <button
              id="nav-btn-next"
              type="button"
              onClick={() => navigate('next')}
              disabled={isAnimating}
              aria-label="Next figurine"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer border-2 border-white text-white transition-all duration-150 hover:scale-[1.08] hover:bg-white/15 active:scale-95 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              style={{ backgroundColor: 'transparent' }}
            >
              <ArrowRight size={24} strokeWidth={2.25} />
            </button>

            {/* Character Indicator Dots */}
            <div className="flex items-center gap-1.5 ml-2">
              {IMAGES.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => jumpTo(idx)}
                    aria-label={`Jump to ${item.name}`}
                    className="cursor-pointer transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
                    style={{
                      width: isActive ? '20px' : '6px',
                      height: '6px',
                      backgroundColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                    }}
                    title={item.name}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* 6. Bottom-right button "DISCOVER IT" */}
        <div
          id="bottom-right-container"
          className="absolute bottom-6 right-4 sm:bottom-16 sm:right-10"
          style={{ zIndex: 60 }}
        >
          <button
            type="button"
            id="discover-btn"
            onClick={() => setShowDetails(true)}
            aria-label={`Discover ${currentFigurine.name} career stats and details`}
            className="group flex items-center text-white bg-transparent border-none cursor-pointer transition-opacity duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(20px, 4vw, 56px)',
              fontWeight: 400,
              opacity: 0.95,
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.95';
            }}
          >
            <span>DISCOVER IT</span>
            <ArrowRight
              className="w-5 h-5 sm:w-8 sm:h-8 ml-1 sm:ml-2 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2.25}
            />
          </button>
        </div>
      </div>

      {/* 2nd Page: Player Details View with player-specific color theme */}
      {showDetails && (
        <PlayerDetailsView
          playerIndex={activeIndex}
          onClose={() => setShowDetails(false)}
          onSelectPlayer={(idx) => setActiveIndex(idx)}
        />
      )}
    </div>
  );
}

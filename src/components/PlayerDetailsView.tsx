import React, { useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface PlayerDetails {
  src: string;
  fallbackSrc?: string;
  name: string;
  watermark: string;
  country: string;
  jerseyNumber: string;
  role: string;
  battingStyle: string;
  bgColor: string;
  bgGradient: string;
  centuries: string;
  totalRuns: string;
  average: string;
  recordStat: { val: string; label: string };
  highlights: string[];
  bio: string;
}

export const PLAYERS_DETAILS_DATA: PlayerDetails[] = [
  {
    src: 'https://i.ibb.co/YFNCRPM5/Chat-GPT-Image-Sep-13-2026-01-52-16-AM.png',
    fallbackSrc: '/assets/virat-kohli.png',
    name: 'Virat Kohli',
    watermark: 'KOHLI',
    country: 'India',
    jerseyNumber: '18',
    role: 'Top-Order Batter',
    battingStyle: 'Right-Hand Bat',
    bgColor: '#0284C7',
    bgGradient: 'linear-gradient(135deg, #0369A1 0%, #075985 50%, #082F49 100%)',
    centuries: '85',
    totalRuns: '27K+',
    average: '53.5',
    recordStat: { val: '50', label: 'ODI Centuries (World Record)' },
    highlights: [
      'All-time world record holder for 50 One-Day International centuries',
      'ICC Men’s Player of the Decade and 2-time World Cup winner (2011 ODI, 2024 T20)',
      'Over 27,000 international runs across all formats with 53+ career average',
    ],
    bio: 'Modern cricket’s ultimate master of international run-chases, celebrated worldwide for unparalleled intensity, fitness benchmarks, and enduring batting mastery.',
  },
  {
    src: 'https://i.ibb.co/0VG5Rfj1/Chat-GPT-Image-Sep-11-2026-04-06-45-AM.png',
    fallbackSrc: '/assets/char2.png',
    name: 'Babar Azam',
    watermark: 'BABAR',
    country: 'Pakistan',
    jerseyNumber: '56',
    role: 'Top-Order Batter',
    battingStyle: 'Right-Hand Bat',
    bgColor: '#146337',
    bgGradient: 'linear-gradient(135deg, #15803D 0%, #166534 50%, #052E16 100%)',
    centuries: '32',
    totalRuns: '16K+',
    average: '56.7',
    recordStat: { val: '56.7', label: 'Career ODI Average' },
    highlights: [
      'Two-time ICC Men’s ODI Cricketer of the Year (2021, 2022)',
      'Fastest batter to score 5,000 runs in One-Day International history',
      '2017 ICC Champions Trophy winner and former captain across all three formats',
    ],
    bio: 'Pakistan’s batting maestro globally admired for textbook strokeplay, effortless elegance, and his signature cover drive ranked among the greatest in the modern game.',
  },
  {
    src: 'https://i.ibb.co/1YmTS3Nq/Chat-GPT-Image-Sep-11-2026-04-06-24-AM.png',
    fallbackSrc: '/assets/char1.png',
    name: 'Joe Root',
    watermark: 'ROOT',
    country: 'England',
    jerseyNumber: '66',
    role: 'Middle-Order Batter',
    battingStyle: 'Right-Hand Bat',
    bgColor: '#1E3A8A',
    bgGradient: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 50%, #0F172A 100%)',
    centuries: '61',
    totalRuns: '20K+',
    average: '51.3',
    recordStat: { val: '34', label: 'England Record Test Centuries' },
    highlights: [
      'England’s all-time leading Test centurion (34) and top run-scorer (12,400+ runs)',
      '2019 ICC Men’s Cricket World Cup winner and ICC Test Player of the Year',
      'Surpassed 20,000 international runs with supreme mastery against pace and spin',
    ],
    bio: 'England’s premier Test titan, renowned for tranquil temperament, swift footwork against spin, and consistent match-defining performances on cricket’s biggest stages.',
  },
  {
    src: 'https://i.ibb.co/DP1w5g1Y/Chat-GPT-Image-Sep-13-2026-01-59-21-AM.png',
    fallbackSrc: '/assets/char3.png',
    name: 'Kane Williamson',
    watermark: 'KANE',
    country: 'New Zealand',
    jerseyNumber: '22',
    role: 'Top-Order Batter',
    battingStyle: 'Right-Hand Bat',
    bgColor: '#18181B',
    bgGradient: 'linear-gradient(135deg, #27272A 0%, #18181B 50%, #09090B 100%)',
    centuries: '41',
    totalRuns: '18K+',
    average: '54.4',
    recordStat: { val: '32', label: 'New Zealand Test Centuries' },
    highlights: [
      'Captained New Zealand to the inaugural 2021 ICC World Test Championship mace',
      'Player of the Tournament at the 2019 ICC Men’s Cricket World Cup',
      'New Zealand’s highest Test run-scorer with 32 hundreds and 54.4 average',
    ],
    bio: 'New Zealand’s venerated leader and master craftsman, universally revered for supreme composure, soft hands, and immaculate sportsmanship under immense pressure.',
  },
  {
    src: 'https://i.ibb.co/SXzMWwXk/Chat-GPT-Image-Sep-13-2026-03-31-55-AM.png',
    fallbackSrc: '/assets/char4.png',
    name: 'Steve Smith',
    watermark: 'SMITH',
    country: 'Australia',
    jerseyNumber: '49',
    role: 'Top-Order Batter',
    battingStyle: 'Right-Hand Bat',
    bgColor: '#EAB308',
    bgGradient: 'linear-gradient(135deg, #FACC15 0%, #EAB308 40%, #A16207 100%)',
    centuries: '47',
    totalRuns: '18K+',
    average: '58.0',
    recordStat: { val: '58.0', label: 'Test Career Average' },
    highlights: [
      'Two-time ICC Men’s ODI World Cup champion (2015, 2023) and 2023 WTC champion',
      'Career Test average of 58.0 ranking among the highest in cricket history',
      'ICC Men’s Test Player of the Decade and multiple Allan Border Medal recipient',
    ],
    bio: 'A generational batting savant whose unorthodox technique, laser concentration, and relentless hunger for hundreds have redefined modern red-ball dominance.',
  },
];

interface PlayerDetailsViewProps {
  playerIndex: number;
  onClose: () => void;
  onSelectPlayer: (index: number) => void;
}

export function PlayerDetailsView({
  playerIndex,
  onClose,
  onSelectPlayer,
}: PlayerDetailsViewProps) {
  const player = PLAYERS_DETAILS_DATA[playerIndex];
  const total = PLAYERS_DETAILS_DATA.length;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectPlayer((playerIndex - 1 + total) % total);
      } else if (e.key === 'ArrowRight') {
        onSelectPlayer((playerIndex + 1) % total);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerIndex, total, onClose, onSelectPlayer]);

  return (
    <div
      id="player-details-page"
      className="fixed inset-0 z-[100] flex flex-col text-white overflow-hidden transition-colors duration-500"
      style={{
        background: player.bgGradient,
      }}
    >
      {/* Editorial Watermark in the background */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden px-8"
        style={{ zIndex: 1 }}
      >
        <span
          className="text-white/[0.07] font-black uppercase leading-none"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(120px, 28vw, 380px)',
            letterSpacing: '0.08em',
            padding: '0 20px',
          }}
        >
          {player.watermark}
        </span>
      </div>

      {/* Top Navigation Bar */}
      <header
        className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 sm:py-8 flex items-center justify-between relative"
        style={{ zIndex: 20 }}
      >
        <button
          type="button"
          onClick={onClose}
          id="btn-back-to-carousel"
          className="group flex items-center gap-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/90 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:underline"
        >
          <ArrowLeft size={18} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to 3D Figurines</span>
        </button>

        <div className="flex items-center gap-4">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/80">
            0{playerIndex + 1} / 0{total} • {player.country}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main
        className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-12 py-2 sm:py-6 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 relative overflow-y-auto lg:overflow-visible"
        style={{ zIndex: 20 }}
      >
        {/* Left Side: 3D Figurine Showcase */}
        <div className="w-full lg:w-5/12 flex flex-col items-center justify-center relative shrink-0">
          <div className="relative w-full max-w-[280px] sm:max-w-[380px] aspect-[0.75/1] flex items-end justify-center">
            {/* Soft contact shadow */}
            <div
              className="absolute bottom-1 left-1/2 -translate-x-1/2 w-48 sm:w-60 h-6 sm:h-8 rounded-full blur-md opacity-50 pointer-events-none"
              style={{ backgroundColor: '#000000' }}
            />

            <img
              id="details-figurine-image"
              src={player.src}
              alt={`${player.name} 3D Figurine`}
              referrerPolicy="no-referrer"
              draggable={false}
              onError={(e) => {
                if (player.fallbackSrc && e.currentTarget.src !== window.location.origin + player.fallbackSrc) {
                  e.currentTarget.src = player.fallbackSrc;
                }
              }}
              className="w-full h-full object-contain object-bottom drop-shadow-2xl select-none pointer-events-none"
            />
          </div>
        </div>

        {/* Right Side: Clean Editorial Typography & Real Stats */}
        <div className="w-full lg:w-7/12 flex flex-col max-w-2xl">
          {/* Metadata Kicker */}
          <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/75 mb-2">
            <span>{player.country}</span>
            <span>•</span>
            <span>No. {player.jerseyNumber}</span>
            <span>•</span>
            <span>{player.role}</span>
          </div>

          {/* Hero Name */}
          <h1
            id="details-player-name"
            className="font-black uppercase text-4xl sm:text-6xl lg:text-7xl leading-tight mb-5 text-white py-1"
            style={{
              fontFamily: "'Anton', sans-serif",
              letterSpacing: '0.045em',
              wordSpacing: '0.12em',
            }}
          >
            {player.name}
          </h1>

          {/* Concise Bio */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal mb-8 max-w-xl">
            {player.bio}
          </p>

          {/* Clean Stat Columns - No Cluttered Cards or Hairlines */}
          <div className="border-t border-b border-white/20 py-5 sm:py-6 mb-8">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <span
                  className="block text-3xl sm:text-5xl font-black text-white leading-none mb-1.5"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.centuries}
                </span>
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/75">
                  Centuries
                </span>
              </div>

              <div>
                <span
                  className="block text-3xl sm:text-5xl font-black text-white leading-none mb-1.5"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.totalRuns}
                </span>
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/75">
                  Intl Runs
                </span>
              </div>

              <div>
                <span
                  className="block text-3xl sm:text-5xl font-black text-white leading-none mb-1.5"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.average}
                </span>
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/75">
                  Avg (ODI / Test)
                </span>
              </div>

              <div className="col-span-3 sm:col-span-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                <span
                  className="block text-3xl sm:text-5xl font-black text-white leading-none mb-1.5"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.recordStat.val}
                </span>
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/75">
                  {player.recordStat.label}
                </span>
              </div>
            </div>
          </div>

          {/* Key Career Milestones - Clean Minimalist List */}
          <div className="space-y-2 mb-8">
            {player.highlights.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85 font-medium leading-normal">
                <span className="text-white/40 select-none">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Player Switcher Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/15">
            <button
              type="button"
              onClick={() => onSelectPlayer((playerIndex - 1 + total) % total)}
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} className="transition-transform duration-150 group-hover:-translate-x-1" />
              <span>Prev Player</span>
            </button>

            {/* Subtle Dots */}
            <div className="flex items-center gap-2">
              {PLAYERS_DETAILS_DATA.map((p, idx) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onSelectPlayer(idx)}
                  className="h-1.5 rounded-full transition-all duration-200 cursor-pointer"
                  style={{
                    width: idx === playerIndex ? '20px' : '6px',
                    backgroundColor: idx === playerIndex ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                  }}
                  title={p.name}
                  aria-label={`Switch to ${p.name}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => onSelectPlayer((playerIndex + 1) % total)}
              className="group flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <span>Next Player</span>
              <ChevronRight size={16} className="transition-transform duration-150 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

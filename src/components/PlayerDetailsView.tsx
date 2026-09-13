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
    recordStat: { val: '50', label: 'ODI 100s' },
    highlights: [
      'All-time world record holder with 50 ODI centuries',
      'ICC Men’s Player of the Decade and 2x World Cup champion (2011 ODI, 2024 T20)',
      'Over 27,000 international runs across all formats',
    ],
    bio: 'Modern cricket’s ultimate master of run-chases, celebrated worldwide for unparalleled intensity, fitness benchmarks, and enduring batting mastery.',
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
    recordStat: { val: '56.7', label: 'ODI Avg' },
    highlights: [
      'Two-time ICC Men’s ODI Cricketer of the Year (2021, 2022)',
      'Fastest batter to reach 5,000 runs in ODI cricket history',
      '2017 ICC Champions Trophy winner and former all-format captain',
    ],
    bio: 'Pakistan’s batting maestro globally admired for textbook strokeplay, effortless elegance, and his signature cover drive.',
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
    recordStat: { val: '34', label: 'Test 100s' },
    highlights: [
      'England’s all-time leading Test centurion (34) and top run-scorer (12,400+ runs)',
      '2019 ICC Men’s Cricket World Cup winner and ICC Test Player of the Year',
      'Surpassed 20,000 international runs with supreme mastery against pace and spin',
    ],
    bio: 'England’s premier Test titan, renowned for tranquil temperament, swift footwork against spin, and consistent match-defining performances.',
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
    recordStat: { val: '32', label: 'NZ Test 100s' },
    highlights: [
      'Captained New Zealand to the inaugural 2021 ICC World Test Championship mace',
      'Player of the Tournament at the 2019 ICC Men’s Cricket World Cup',
      'New Zealand’s highest Test run-scorer with 32 hundreds and 54.4 average',
    ],
    bio: 'New Zealand’s venerated leader and master craftsman, universally revered for supreme composure, soft hands, and immaculate sportsmanship.',
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
    recordStat: { val: '58.0', label: 'Test Avg' },
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
      className="fixed inset-0 z-[100] h-screen h-[100dvh] w-full flex flex-col text-white overflow-hidden select-none transition-colors duration-500"
      style={{
        background: player.bgGradient,
      }}
    >
      {/* Background Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden px-4"
        style={{ zIndex: 1 }}
      >
        <span
          className="text-white/[0.06] font-black uppercase leading-none select-none"
          style={{
            fontFamily: "'Anton', sans-serif",
            fontSize: 'clamp(90px, 22vw, 360px)',
            letterSpacing: '0.06em',
          }}
        >
          {player.watermark}
        </span>
      </div>

      {/* Top Navigation Bar - Compact and strictly single line */}
      <header
        className="w-full max-w-7xl mx-auto px-4 sm:px-10 py-3 sm:py-6 flex items-center justify-between relative shrink-0"
        style={{ zIndex: 20 }}
      >
        <button
          type="button"
          onClick={onClose}
          id="btn-back-to-carousel"
          className="group flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white/90 hover:text-white transition-colors cursor-pointer focus:outline-none"
        >
          <ArrowLeft size={16} className="transition-transform duration-150 group-hover:-translate-x-1 shrink-0" />
          <span className="hidden xs:inline sm:inline">Back to Figurines</span>
          <span className="xs:hidden sm:hidden">Back</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-white/80">
            0{playerIndex + 1} / 0{total} • {player.country}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* 
        MAIN CONTENT BODY:
        - Fits strictly in 100dvh on mobile with zero vertical scrolling
        - Uses flex column on mobile, flex row on desktop
      */}
      <main
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-10 pb-3 sm:pb-6 flex flex-col justify-between relative overflow-hidden"
        style={{ zIndex: 20 }}
      >
        {/* DESKTOP VIEW (hidden on mobile, visible lg+) */}
        <div className="hidden lg:flex flex-1 items-center justify-between gap-12">
          {/* Figurine Left */}
          <div className="w-5/12 flex flex-col items-center justify-center relative shrink-0">
            <div className="relative w-full max-w-[360px] aspect-[0.75/1] flex items-end justify-center">
              <div
                className="absolute bottom-1 left-1/2 -translate-x-1/2 w-56 h-7 rounded-full blur-md opacity-50 pointer-events-none"
                style={{ backgroundColor: '#000000' }}
              />
              <img
                src={player.src}
                alt={`${player.name} 3D Figurine`}
                referrerPolicy="no-referrer"
                draggable={false}
                onError={(e) => {
                  if (player.fallbackSrc && e.currentTarget.src !== window.location.origin + player.fallbackSrc) {
                    e.currentTarget.src = player.fallbackSrc;
                  }
                }}
                className="w-full h-full object-contain object-bottom drop-shadow-2xl pointer-events-none"
              />
            </div>
          </div>

          {/* Details Right */}
          <div className="w-7/12 flex flex-col max-w-2xl">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white/75 mb-2">
              <span>{player.country}</span>
              <span>•</span>
              <span>No. {player.jerseyNumber}</span>
              <span>•</span>
              <span>{player.role}</span>
            </div>

            <h1
              className="font-black uppercase text-5xl xl:text-7xl leading-tight mb-4 text-white"
              style={{
                fontFamily: "'Anton', sans-serif",
                letterSpacing: '0.04em',
                wordSpacing: '0.1em',
              }}
            >
              {player.name}
            </h1>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal mb-6 max-w-xl">
              {player.bio}
            </p>

            <div className="border-t border-b border-white/20 py-4 sm:py-5 mb-6">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <span
                    className="block text-4xl xl:text-5xl font-black text-white leading-none mb-1"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {player.centuries}
                  </span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/75">
                    Centuries
                  </span>
                </div>

                <div>
                  <span
                    className="block text-4xl xl:text-5xl font-black text-white leading-none mb-1"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {player.totalRuns}
                  </span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/75">
                    Intl Runs
                  </span>
                </div>

                <div>
                  <span
                    className="block text-4xl xl:text-5xl font-black text-white leading-none mb-1"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {player.average}
                  </span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/75">
                    Avg (ODI/Test)
                  </span>
                </div>

                <div>
                  <span
                    className="block text-4xl xl:text-5xl font-black text-white leading-none mb-1"
                    style={{ fontFamily: "'Anton', sans-serif" }}
                  >
                    {player.recordStat.val}
                  </span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white/75">
                    {player.recordStat.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 mb-6">
              {player.highlights.map((item) => (
                <div key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/85 font-medium leading-normal">
                  <span className="text-white/40 select-none">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE & TABLET VIEW (lg:hidden) - 100% Single-Page Zero Scroll */}
        <div className="flex lg:hidden flex-1 flex-col justify-between overflow-hidden">
          {/* Top Half: Figurine + Player identity side-by-side */}
          <div className="flex items-center gap-3 h-[40vh] max-h-[260px] shrink-0">
            {/* 3D Figurine Image */}
            <div className="w-[42%] h-full relative flex items-end justify-center">
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full blur-sm opacity-50 pointer-events-none"
                style={{ backgroundColor: '#000000' }}
              />
              <img
                src={player.src}
                alt={`${player.name} 3D Figurine`}
                referrerPolicy="no-referrer"
                draggable={false}
                onError={(e) => {
                  if (player.fallbackSrc && e.currentTarget.src !== window.location.origin + player.fallbackSrc) {
                    e.currentTarget.src = player.fallbackSrc;
                  }
                }}
                className="max-h-full max-w-full object-contain object-bottom drop-shadow-xl pointer-events-none"
              />
            </div>

            {/* Identity Info */}
            <div className="w-[58%] flex flex-col justify-center pl-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/75 mb-1">
                {player.country} • #{player.jerseyNumber}
              </span>
              <h1
                className="font-black uppercase text-2xl xs:text-3xl leading-[1.05] text-white mb-1.5"
                style={{
                  fontFamily: "'Anton', sans-serif",
                  letterSpacing: '0.03em',
                }}
              >
                {player.name}
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white/85 mb-1.5">
                {player.role}
              </span>
              <p className="text-[11px] leading-snug text-white/80 line-clamp-3 font-normal">
                {player.bio}
              </p>
            </div>
          </div>

          {/* Middle: 4 Key Stats Strip */}
          <div className="border-t border-b border-white/20 py-2.5 my-auto shrink-0">
            <div className="grid grid-cols-4 gap-1.5 text-center">
              <div className="px-0.5">
                <span
                  className="block text-2xl xs:text-3xl font-black text-white leading-none"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.centuries}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-white/75 mt-1">
                  100s
                </span>
              </div>

              <div className="px-0.5 border-l border-white/15">
                <span
                  className="block text-2xl xs:text-3xl font-black text-white leading-none"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.totalRuns}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-white/75 mt-1">
                  Runs
                </span>
              </div>

              <div className="px-0.5 border-l border-white/15">
                <span
                  className="block text-2xl xs:text-3xl font-black text-white leading-none"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.average}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-white/75 mt-1">
                  Avg
                </span>
              </div>

              <div className="px-0.5 border-l border-white/15">
                <span
                  className="block text-2xl xs:text-3xl font-black text-white leading-none"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {player.recordStat.val}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-white/75 mt-1 truncate">
                  {player.recordStat.label}
                </span>
              </div>
            </div>
          </div>

          {/* Lower: Clean Top Milestones (Compact 2 items) */}
          <div className="space-y-1.5 shrink-0 my-auto">
            {player.highlights.slice(0, 2).map((item) => (
              <div key={item} className="flex items-start gap-2 text-[11px] text-white/90 font-medium leading-snug">
                <span className="text-white/40 select-none shrink-0">—</span>
                <span className="line-clamp-2">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 
          FOOTER CONTROLS:
          - Safe spacing ensuring NO text overlap with dots on any device width
        */}
        <div className="flex items-center justify-between pt-3 border-t border-white/15 shrink-0">
          <button
            type="button"
            onClick={() => onSelectPlayer((playerIndex - 1 + total) % total)}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/20 bg-black/10 hover:bg-white/15 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <ChevronLeft size={15} />
            <span>Prev</span>
          </button>

          {/* Indicator Dots with guaranteed safe margin */}
          <div className="flex items-center gap-1.5 px-2">
            {PLAYERS_DETAILS_DATA.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                onClick={() => onSelectPlayer(idx)}
                className="h-1.5 rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  width: idx === playerIndex ? '18px' : '5px',
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
            className="flex items-center gap-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/20 bg-black/10 hover:bg-white/15 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <span>Next</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import { RotateCw } from 'lucide-react';
import { ChapterData } from '../types/story';
import { soundEngine } from '../audio/soundEngine';
import { KeepsakeIllustration } from './KeepsakeIllustration';

interface CottageDioramaStageProps {
  chapter: ChapterData;
  starCollected: boolean;
  onCollectStar: () => void;
  onOpenLetter: () => void;
  onKeepsakeInteracted?: () => void;
}

const INK = '#15100E';

export const CottageDioramaStage: React.FC<CottageDioramaStageProps> = ({
  chapter,
  starCollected,
  onCollectStar,
  onOpenLetter,
  onKeepsakeInteracted,
}) => {
  // Theatrical Rusty Lake shutter eyelids + chapter card
  const [shutterOpen, setShutterOpen] = useState(false);
  const [showTitleCard, setShowTitleCard] = useState(true);

  // Room interactive states
  const [lampOn, setLampOn] = useState(true);
  const [chainPulled, setChainPulled] = useState(false);
  const [curtainsParted, setCurtainsParted] = useState(false);
  const [clockSecond, setClockSecond] = useState(0);
  const [pendulumBoost, setPendulumBoost] = useState(false);
  const [polaroidTilted, setPolaroidTilted] = useState(false);
  const [mugHopping, setMugHopping] = useState(false);
  const [mirrorAwake, setMirrorAwake] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [crowStartled, setCrowStartled] = useState(false);

  // Hero keepsake states
  const [isFlipped, setIsFlipped] = useState(false);
  const [keepsakeReacting, setKeepsakeReacting] = useState(false);
  const [rippleKey, setRippleKey] = useState<number | null>(null);

  // Handwritten floating whisper near top of room
  const [whisper, setWhisper] = useState<string | null>(null);
  const whisperTimer = useRef<number | null>(null);
  const swipeStartX = useRef<number | null>(null);

  const showWhisper = (text: string) => {
    setWhisper(text);
    if (whisperTimer.current) window.clearTimeout(whisperTimer.current);
    whisperTimer.current = window.setTimeout(() => setWhisper(null), 2600);
  };

  // Rusty Lake chapter title card + shutter eyelid reveal
  useEffect(() => {
    setShutterOpen(false);
    setShowTitleCard(true);
    setIsFlipped(false);
    setKeepsakeReacting(false);
    setMirrorAwake(false);
    setDrawerOpen(false);

    const cardTimer = window.setTimeout(() => setShowTitleCard(false), 650);
    const shutterTimer = window.setTimeout(() => setShutterOpen(true), 780);
    return () => {
      window.clearTimeout(cardTimer);
      window.clearTimeout(shutterTimer);
    };
  }, [chapter.id]);

  // 1-second mechanical clockwork snap
  useEffect(() => {
    const id = window.setInterval(() => {
      setClockSecond((s) => (s + 1) % 60);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const handleClockClick = () => {
    soundEngine.playClockTick(true);
    setPendulumBoost(true);
    showWhisper('Still keeping November time.');
    window.setTimeout(() => setPendulumBoost(false), 950);
  };

  const handleWindowClick = () => {
    soundEngine.playPaperRustle();
    setCurtainsParted((v) => !v);
    showWhisper('Cool evening air at the glass.');
  };

  const handleCrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPaperRustle();
    setCrowStartled(true);
    showWhisper('A black bird watching the harbor road.');
    window.setTimeout(() => setCrowStartled(false), 1100);
  };

  const handleMirrorClick = () => {
    soundEngine.playMirrorShimmer();
    setMirrorAwake(true);
    showWhisper('The glass remembers someone standing here.');
    window.setTimeout(() => setMirrorAwake(false), 2600);
  };

  const handleDrawerClick = () => {
    soundEngine.playWoodCreak();
    setDrawerOpen((v) => !v);
    showWhisper(drawerOpen ? 'The brass pull clicks shut.' : 'Old cedar shavings and a folded scrap.');
  };

  const handlePolaroidClick = () => {
    soundEngine.playPaperRustle();
    setPolaroidTilted(true);
    showWhisper('Some summers stay pinned in place.');
    window.setTimeout(() => setPolaroidTilted(false), 760);
  };

  const handleLampClick = () => {
    soundEngine.playLampPull();
    setChainPulled(true);
    setLampOn((v) => !v);
    showWhisper(lampOn ? 'Moonlight softens the desk.' : 'Amber glass holds back the dark.');
    window.setTimeout(() => setChainPulled(false), 260);
  };

  const handleMugClick = () => {
    soundEngine.playCeramicClink();
    setMugHopping(true);
    showWhisper('Chamomile warmth lingering in porcelain.');
    window.setTimeout(() => setMugHopping(false), 450);
  };

  const handleEnvelopeClick = () => {
    soundEngine.playPaperRustle();
    showWhisper('Ink waiting under a crimson seal.');
    onOpenLetter();
  };

  const handleKeepsakeTap = () => {
    if (isFlipped) return;
    soundEngine.playKeepsakeSound(chapter.keepsakeId);
    setKeepsakeReacting(true);
    setRippleKey(Date.now());
    showWhisper(chapter.keepsakeReactionNote);
    onKeepsakeInteracted?.();
    window.setTimeout(() => setKeepsakeReacting(false), 850);
  };

  const handleFlipToggle = () => {
    soundEngine.playPaperRustle();
    setIsFlipped((v) => !v);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (swipeStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) > 42) {
      handleFlipToggle();
    }
  };

  const pendulumDeg = pendulumBoost
    ? clockSecond % 2 === 0
      ? 15
      : -15
    : clockSecond % 2 === 0
      ? 6
      : -6;

  const skyFill =
    chapter.act === 1
      ? '#1D2C44'
      : chapter.act === 2
        ? '#263B59'
        : chapter.act === 3
          ? '#1A2533'
          : '#162133';

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[16/10] sm:aspect-[16/9] max-h-[54dvh] sm:max-h-[56dvh] bg-[#16100D] border border-[#E59D35]/25 shadow-[0_24px_60px_rgba(0,0,0,0.75)] overflow-hidden select-none">
      {/* Subtle Bronze Viewfinder Corner Brackets */}
      <div className="pointer-events-none absolute inset-2.5 z-30">
        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#E59D35]/55" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#E59D35]/55" />
        <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#E59D35]/55" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#E59D35]/55" />
      </div>

      {/* Handwritten Whisper Banner */}
      <div
        aria-live="polite"
        className={`pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ${
          whisper ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
        }`}
      >
        {whisper && (
          <p className="font-script text-lg sm:text-2xl text-[#F6F2EA] bg-[#0E0A08]/80 px-4 py-1 border border-[#E59D35]/30 shadow-md whitespace-nowrap">
            {whisper}
          </p>
        )}
      </div>

      {/* 2D Hand-Inked Rusty Lake Style Cottage Diorama SVG */}
      <svg
        viewBox="0 0 960 540"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full animate-ink-boil"
      >
        <defs>
          <radialGradient id="lampGlow" cx="78%" cy="46%" r="54%">
            <stop offset="0%" stopColor="#E59D35" stopOpacity={lampOn ? '0.46' : '0.04'} />
            <stop offset="45%" stopColor="#B84935" stopOpacity={lampOn ? '0.16' : '0.02'} />
            <stop offset="100%" stopColor="#0E0A08" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="moonBeam" x1="15%" y1="30%" x2="55%" y2="85%">
            <stop offset="0%" stopColor="#9AB8D9" stopOpacity={lampOn ? '0.12' : '0.28'} />
            <stop offset="100%" stopColor="#233B5C" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="wallWash" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lampOn ? '#2A201B' : '#181B24'} />
            <stop offset="100%" stopColor={lampOn ? '#382A22' : '#202430'} />
          </linearGradient>
        </defs>

        {/* Back Wall & Perspective Side Walls */}
        <rect x="0" y="0" width="960" height="540" fill="url(#wallWash)" />
        <polygon points="0,0 130,52 130,365 0,430" fill={lampOn ? '#211814' : '#141720'} stroke={INK} strokeWidth="2.6" />
        <polygon points="960,0 830,52 830,365 960,430" fill={lampOn ? '#1F1713' : '#12151E'} stroke={INK} strokeWidth="2.6" />
        <polygon points="0,0 960,0 830,52 130,52" fill={lampOn ? '#1B130F' : '#10131A'} stroke={INK} strokeWidth="2.6" />

        {/* Hand-drawn vertical wallpaper lines & cross-hatching */}
        {[170, 230, 290, 350, 410, 470, 530, 590, 650, 710, 770].map((x) => (
          <line key={x} x1={x} y1="54" x2={x} y2="365" stroke="#0E0A08" strokeOpacity="0.18" strokeWidth="1.2" />
        ))}

        {/* Wainscoting & Chair Rail */}
        <rect x="130" y="295" width="700" height="72" fill={lampOn ? '#30221A' : '#1D1E26'} stroke={INK} strokeWidth="2.4" />
        <line x1="130" y1="303" x2="830" y2="303" stroke="#E59D35" strokeOpacity="0.2" strokeWidth="1.5" />

        {/* ================= 1. PENDULUM WALL CLOCK (TOP-LEFT) ================= */}
        <g
          onClick={handleClockClick}
          className="cursor-pointer hover:brightness-110 transition-[filter]"
          role="button"
          tabIndex={0}
          aria-label="Pendulum Wall Clock"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClockClick()}
        >
          <rect x="166" y="138" width="44" height="74" rx="2" fill="#2A1C15" stroke={INK} strokeWidth="2.6" />
          <g style={{ transformOrigin: '188px 142px', transform: `rotate(${pendulumDeg}deg)` }}>
            <line x1="188" y1="142" x2="188" y2="196" stroke="#C99242" strokeWidth="2.5" />
            <circle cx="188" cy="198" r="8" fill="#E59D35" stroke={INK} strokeWidth="2" />
          </g>
          <circle cx="188" cy="112" r="34" fill="#4B3122" stroke={INK} strokeWidth="2.8" />
          <circle cx="188" cy="112" r="26" fill="#EFEAE0" stroke={INK} strokeWidth="2.2" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="188"
              y1="90"
              x2="188"
              y2="94"
              stroke={INK}
              strokeWidth="1.6"
              transform={`rotate(${deg} 188 112)`}
            />
          ))}
          <line x1="188" y1="112" x2="176" y2="104" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
          <line x1="188" y1="112" x2="202" y2="102" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <line
            x1="188"
            y1="112"
            x2="188"
            y2="91"
            stroke="#B84935"
            strokeWidth="1.4"
            transform={`rotate(${clockSecond * 6} 188 112)`}
          />
          <circle cx="188" cy="112" r="2.5" fill={INK} />
        </g>

        {/* ================= 2. MULLIONED COTTAGE WINDOW + RUSTY LAKE CROW ================= */}
        <g
          onClick={handleWindowClick}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Mullioned Cottage Window"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleWindowClick()}
        >
          <rect x="242" y="88" width="166" height="202" fill={skyFill} stroke={INK} strokeWidth="3" />

          <clipPath id="windowPaneClip">
            <rect x="245" y="91" width="160" height="196" />
          </clipPath>
          <g clipPath="url(#windowPaneClip)">
            <path d="M240 250 Q305 224 365 244 T415 238 L415 292 L240 292 Z" fill="#111926" />

            {chapter.act === 1 && (
              <>
                <circle cx="372" cy="126" r="14" fill="#F6F2EA" opacity="0.88" />
                <circle cx="378" cy="122" r="13" fill={skyFill} />
                <circle cx="280" cy="122" r="1.5" fill="#F6F2EA" opacity="0.7" />
                <circle cx="316" cy="110" r="1.8" fill="#E59D35" opacity="0.8" />
              </>
            )}

            {chapter.act === 2 && (
              <>
                {[
                  [278, 175, '0s'],
                  [315, 210, '0.8s'],
                  [362, 165, '1.4s'],
                  [388, 224, '0.4s'],
                ].map(([cx, cy, delay], idx) => (
                  <circle
                    key={idx}
                    cx={Number(cx)}
                    cy={Number(cy)}
                    r="3.2"
                    fill="#FFE28A"
                    className="animate-firefly-12fps"
                    style={{ animationDelay: String(delay) }}
                  />
                ))}
              </>
            )}

            {chapter.act === 3 && (
              <>
                {[265, 295, 328, 358, 386, 280, 345].map((x, idx) => (
                  <line
                    key={idx}
                    x1={x}
                    y1={100 + (idx % 3) * 36}
                    x2={x - 10}
                    y2={122 + (idx % 3) * 36}
                    stroke="#CFE0DF"
                    strokeOpacity="0.6"
                    strokeWidth="1.6"
                    className="animate-rain-12fps"
                    style={{ animationDelay: `${idx * 0.16}s` }}
                  />
                ))}
              </>
            )}

            {chapter.act === 4 && (
              <>
                {[268, 294, 322, 352, 378, 308].map((x, idx) => (
                  <circle
                    key={idx}
                    cx={x}
                    cy={108 + (idx % 3) * 28}
                    r={idx % 2 === 0 ? 2.4 : 1.7}
                    fill="#F6F2EA"
                    className="animate-snow-12fps"
                    style={{ animationDelay: `${idx * 0.45}s` }}
                  />
                ))}
              </>
            )}

            {/* Distant gliding black swallow */}
            <g className="animate-swallow-12fps">
              <path
                d="M252 152 Q262 142 270 150 Q279 140 288 151 Q278 154 270 154 Q262 155 252 152 Z"
                fill="#0E0A08"
              />
            </g>

            {/* Rusty Lake Perched Watching Crow on the Mullion */}
            <g
              onClick={handleCrowClick}
              className={`cursor-pointer ${crowStartled ? '-translate-y-4 translate-x-3 transition-transform duration-300' : 'animate-crow-bob'}`}
              style={{ transformOrigin: '374px 232px' }}
              role="button"
              tabIndex={0}
              aria-label="Perched black bird at window"
            >
              {/* Crow silhouette */}
              <path
                d="M362 238 C362 222, 372 214, 382 218 L391 215 L385 223 C389 230, 386 242, 376 245 L386 256 L368 247 Z"
                fill="#0E0A08"
                stroke="#F6F2EA"
                strokeOpacity="0.25"
                strokeWidth="0.9"
              />
              {/* Stepped white eye blink */}
              <circle
                cx="379"
                cy="221"
                r="2.1"
                fill="#F6F2EA"
                className="animate-crow-blink"
                style={{ transformOrigin: '379px 221px' }}
              />
              <circle cx="379.5" cy="221" r="0.8" fill="#0E0A08" />
            </g>
          </g>

          {/* Window Mullions */}
          <line x1="325" y1="88" x2="325" y2="290" stroke="#4D3527" strokeWidth="7" />
          <line x1="325" y1="88" x2="325" y2="290" stroke={INK} strokeWidth="2" />
          <line x1="242" y1="186" x2="408" y2="186" stroke="#4D3527" strokeWidth="7" />
          <line x1="242" y1="186" x2="408" y2="186" stroke={INK} strokeWidth="2" />

          <rect x="236" y="82" width="178" height="214" fill="none" stroke="#4D3527" strokeWidth="10" />
          <rect x="231" y="77" width="188" height="224" fill="none" stroke={INK} strokeWidth="2.6" />

          {/* Sheer Linen Curtains */}
          <path
            d={
              curtainsParted
                ? 'M238 84 L276 84 Q266 190 262 288 L238 288 Z'
                : 'M238 84 L308 84 Q300 190 304 288 L238 288 Z'
            }
            fill="#EFEAE0"
            fillOpacity="0.45"
            stroke={INK}
            strokeWidth="1.8"
          />
          <path
            d={
              curtainsParted
                ? 'M412 84 L374 84 Q384 190 388 288 L412 288 Z'
                : 'M412 84 L342 84 Q350 190 346 288 L412 288 Z'
            }
            fill="#EFEAE0"
            fillOpacity="0.45"
            stroke={INK}
            strokeWidth="1.8"
          />
          <line x1="224" y1="78" x2="426" y2="78" stroke="#191614" strokeWidth="4" strokeLinecap="round" />

          {/* Sill + Amber Bottle with Eucalyptus Sprig */}
          <rect x="226" y="290" width="198" height="12" rx="2" fill="#5D3E2B" stroke={INK} strokeWidth="2.4" />
          <g transform="translate(260 260)">
            <g className="animate-sway-12fps" style={{ transformOrigin: '10px 16px' }}>
              <path d="M10 18 Q8 0 14 -14" stroke="#476B49" strokeWidth="2" fill="none" />
              <ellipse cx="5" cy="4" rx="4.5" ry="2.6" fill="#476B49" stroke={INK} strokeWidth="1" transform="rotate(-24 5 4)" />
              <ellipse cx="15" cy="-2" rx="4.5" ry="2.6" fill="#5B825D" stroke={INK} strokeWidth="1" transform="rotate(20 15 -2)" />
              <ellipse cx="8" cy="-10" rx="4" ry="2.4" fill="#476B49" stroke={INK} strokeWidth="1" transform="rotate(-18 8 -10)" />
            </g>
            <rect x="4" y="14" width="12" height="16" rx="2" fill="#B56A24" stroke={INK} strokeWidth="1.8" />
            <rect x="7" y="9" width="6" height="5" fill="#9D5A1D" stroke={INK} strokeWidth="1.5" />
          </g>
        </g>

        {/* ================= 2B. RUSTY LAKE FRAMED MIRROR / SHADOW PORTRAIT (CENTER WALL) ================= */}
        <g
          onClick={handleMirrorClick}
          className="cursor-pointer hover:brightness-110 transition-[filter]"
          role="button"
          tabIndex={0}
          aria-label="Framed Oval Mirror"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleMirrorClick()}
        >
          {/* Antique brass oval frame */}
          <ellipse cx="485" cy="168" rx="44" ry="62" fill="#463022" stroke={INK} strokeWidth="3" />
          <ellipse cx="485" cy="168" rx="35" ry="53" fill={mirrorAwake ? '#233B5C' : '#1E242B'} stroke="#E59D35" strokeOpacity="0.4" strokeWidth="1.5" />

          {/* Glass reflection streaks */}
          <line x1="466" y1="138" x2="494" y2="122" stroke="#F6F2EA" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
          <line x1="464" y1="154" x2="504" y2="132" stroke="#F6F2EA" strokeOpacity="0.12" strokeWidth="2" strokeLinecap="round" />

          {/* Translucent sister silhouette + white moth when mirror is clicked */}
          {mirrorAwake && (
            <g>
              <path
                d="M485 144 C478 144, 474 150, 474 158 C474 166, 478 171, 485 171 C492 171, 496 166, 496 158 C496 150, 492 144, 485 144 Z M464 212 C466 188, 474 178, 485 178 C496 178, 504 188, 506 212 Z"
                fill="#0E0A08"
                fillOpacity="0.68"
              />
              {/* White moth fluttering inside glass */}
              <g className="animate-moth-12fps" style={{ transformOrigin: '485px 158px' }}>
                <ellipse cx="482" cy="156" rx="5" ry="3" fill="#F6F2EA" opacity="0.9" transform="rotate(-20 482 156)" />
                <ellipse cx="489" cy="156" rx="5" ry="3" fill="#F6F2EA" opacity="0.9" transform="rotate(20 489 156)" />
              </g>
            </g>
          )}
        </g>

        <polygon points="242,88 408,290 540,365 230,365" fill="url(#moonBeam)" className="pointer-events-none" />

        {/* ================= 3. CORKBOARD POLAROIDS (UPPER-RIGHT) ================= */}
        <g
          onClick={handlePolaroidClick}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Corkboard Polaroids"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handlePolaroidClick()}
        >
          <rect x="562" y="94" width="186" height="126" rx="3" fill="#6F4C32" stroke={INK} strokeWidth="2.8" />
          <rect x="570" y="102" width="170" height="110" fill="#A17A53" stroke={INK} strokeWidth="1.8" />

          <g style={{ transformOrigin: '614px 118px' }} className={polaroidTilted ? 'animate-polaroid-tilt' : ''}>
            <g transform="rotate(-4 614 148)">
              <rect x="586" y="114" width="56" height="66" fill="#F6F2EA" stroke={INK} strokeWidth="1.8" />
              <rect x="592" y="120" width="44" height="42" fill="#233B5C" stroke={INK} strokeWidth="1.2" />
              <path d="M592 150 Q612 138 636 152 L636 162 L592 162 Z" fill="#E59D35" fillOpacity="0.6" />
            </g>
            <circle cx="614" cy="118" r="3.5" fill="#B84935" stroke={INK} strokeWidth="1.2" />
          </g>

          <g style={{ transformOrigin: '694px 124px' }} className={polaroidTilted ? 'animate-polaroid-tilt' : ''}>
            <g transform="rotate(5 694 152)">
              <rect x="666" y="120" width="56" height="66" fill="#F6F2EA" stroke={INK} strokeWidth="1.8" />
              <rect x="672" y="126" width="44" height="42" fill="#476B49" stroke={INK} strokeWidth="1.2" />
              <circle cx="702" cy="138" r="5" fill="#FFE28A" opacity="0.85" />
            </g>
            <circle cx="694" cy="124" r="3.5" fill="#E59D35" stroke={INK} strokeWidth="1.2" />
          </g>
        </g>

        {/* ================= DESK SURFACE, DRAWER & LEATHER BLOTTER ================= */}
        <polygon points="80,362 880,362 960,540 0,540" fill={lampOn ? '#4B3121' : '#2C211B'} stroke={INK} strokeWidth="3" />
        <line x1="120" y1="392" x2="840" y2="392" stroke="#15100E" strokeOpacity="0.25" strokeWidth="1.5" />
        <line x1="70" y1="452" x2="890" y2="452" stroke="#15100E" strokeOpacity="0.22" strokeWidth="1.5" />
        <line x1="40" y1="504" x2="920" y2="504" stroke="#15100E" strokeOpacity="0.22" strokeWidth="1.5" />

        {/* Interactive Desk Drawer on Left Front */}
        <g
          onClick={handleDrawerClick}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Wooden Desk Drawer"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleDrawerClick()}
        >
          <rect
            x="92"
            y={drawerOpen ? 492 : 504}
            width="136"
            height={drawerOpen ? 44 : 32}
            fill="#3A2519"
            stroke={INK}
            strokeWidth="2.4"
          />
          {drawerOpen && (
            <g>
              <polygon points="104,492 216,492 224,504 96,504" fill="#23160F" stroke={INK} strokeWidth="2" />
              {/* Tiny yellow cut-paper star peeking inside drawer */}
              <polygon
                points="146,495 149,499 154,499 150,502 151,506 146,503 141,506 142,502 138,499 143,499"
                fill="#E59D35"
                stroke={INK}
                strokeWidth="1"
              />
            </g>
          )}
          <circle cx="160" cy={drawerOpen ? 516 : 520} r="4.5" fill="#C99242" stroke={INK} strokeWidth="1.8" />
        </g>

        {/* Center Leather Desk Blotter */}
        <polygon
          points="296,386 664,386 694,504 266,504"
          fill={lampOn ? '#241B17' : '#181517'}
          stroke={INK}
          strokeWidth="2.8"
        />
        <polygon
          points="304,393 656,393 682,496 278,496"
          fill="none"
          stroke="#E59D35"
          strokeOpacity="0.3"
          strokeWidth="1.3"
        />

        {/* ================= 4. BANKER'S DESK LAMP (RIGHT) ================= */}
        <g
          onClick={handleLampClick}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Banker's Desk Lamp"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLampClick()}
        >
          <ellipse cx="766" cy="400" rx="44" ry="10" fill="#0E0A08" opacity="0.45" />
          <ellipse cx="766" cy="394" rx="34" ry="9" fill="#C99242" stroke={INK} strokeWidth="2.4" />
          <path d="M766 388 L766 286 Q766 266 742 266 L726 266" fill="none" stroke="#C99242" strokeWidth="7" strokeLinecap="round" />
          <path d="M766 388 L766 286 Q766 266 742 266 L726 266" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" />
          <line
            x1="744"
            y1="286"
            x2="744"
            y2={chainPulled ? 330 : 318}
            stroke="#E59D35"
            strokeWidth="2"
            strokeDasharray="3 3"
          />
          <circle cx="744" cy={chainPulled ? 334 : 322} r="4" fill="#E59D35" stroke={INK} strokeWidth="1.5" />
          <path
            d="M686 286 L760 286 L748 256 L698 256 Z"
            fill={lampOn ? '#476B49' : '#263827'}
            stroke={INK}
            strokeWidth="2.6"
          />
          <ellipse cx="723" cy="286" rx="32" ry="6" fill={lampOn ? '#FFE28A' : '#3A352E'} stroke={INK} strokeWidth="1.6" />
        </g>

        <rect x="0" y="0" width="960" height="540" fill="url(#lampGlow)" className="pointer-events-none" />
        {lampOn && (
          <g className="pointer-events-none">
            {[
              [672, 326, '0s'],
              [696, 344, '1.2s'],
              [718, 314, '2.1s'],
              [654, 356, '0.7s'],
              [736, 360, '1.7s'],
            ].map(([cx, cy, delay], i) => (
              <circle
                key={i}
                cx={Number(cx)}
                cy={Number(cy)}
                r="2.1"
                fill="#FFE28A"
                className="animate-dust-12fps"
                style={{ animationDelay: String(delay) }}
              />
            ))}
          </g>
        )}

        {/* ================= 5. TEA MUG & WAX-SEALED LETTER ON DESK ================= */}
        <g
          onClick={handleMugClick}
          className={`cursor-pointer ${mugHopping ? 'animate-mug-hop' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Warm Chamomile Tea Mug"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleMugClick()}
        >
          <path
            d="M178 364 Q172 350 180 338"
            fill="none"
            stroke="#F6F2EA"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-steam-12fps"
          />
          <path
            d="M192 362 Q198 346 190 334"
            fill="none"
            stroke="#F6F2EA"
            strokeOpacity="0.35"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="animate-steam-12fps"
            style={{ animationDelay: '0.8s' }}
          />
          <ellipse cx="186" cy="422" rx="30" ry="8" fill="#0E0A08" opacity="0.45" />
          <path d="M208 386 C224 386, 224 412, 206 412" fill="none" stroke="#EFEAE0" strokeWidth="6" />
          <path d="M208 386 C224 386, 224 412, 206 412" fill="none" stroke={INK} strokeWidth="2.2" />
          <path d="M164 378 L208 378 L204 418 Q186 424 168 418 Z" fill="#EFEAE0" stroke={INK} strokeWidth="2.5" />
          <ellipse cx="186" cy="378" rx="22" ry="5.5" fill="#473325" stroke={INK} strokeWidth="2" />
        </g>

        <g
          onClick={handleEnvelopeClick}
          className="cursor-pointer"
          role="button"
          tabIndex={0}
          aria-label="Unfold Chapter Letter"
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleEnvelopeClick()}
        >
          <g transform="rotate(-7 778 462)">
            <rect x="720" y="428" width="116" height="68" rx="2" fill="#F6F2EA" stroke={INK} strokeWidth="2.5" />
            <path d="M720 428 L778 466 L836 428" fill="#EFEAE0" stroke={INK} strokeWidth="2.2" />
            <circle cx="778" cy="466" r="9.5" fill="#B84935" stroke={INK} strokeWidth="2" />
            <text x="778" y="489" textAnchor="middle" fill="#191614" fontSize="8" fontFamily="serif" opacity="0.7">
              READ LETTER
            </text>
          </g>
        </g>
      </svg>

      {/* ================= CENTER HERO KEEPSAKE ON BLOTTER ================= */}
      <div className="absolute inset-x-0 bottom-[10%] sm:bottom-[12%] z-20 flex flex-col items-center justify-center pointer-events-none">
        <div
          onClick={handleKeepsakeTap}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="button"
          tabIndex={0}
          aria-label={`${chapter.keepsakeName}. ${chapter.keepsakeTapHint}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleKeepsakeTap();
            }
          }}
          className="pointer-events-auto relative cursor-pointer animate-ink-boil focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E59D35]"
        >
          {rippleKey && (
            <span
              key={rippleKey}
              className="pointer-events-none absolute inset-6 rounded-full border-2 border-[#E59D35]/75 animate-ink-ripple"
            />
          )}

          <KeepsakeIllustration
            keepsakeId={chapter.keepsakeId}
            keepsakeName={chapter.keepsakeName}
            backInscription={chapter.keepsakeBackInscription}
            backDetail={chapter.keepsakeBackDetail}
            isFlipped={isFlipped}
            isReacting={keepsakeReacting}
            starCollected={starCollected}
            onCollectStar={onCollectStar}
          />
        </div>

        <div className="pointer-events-auto mt-1.5 flex items-center gap-2">
          <button
            type="button"
            onClick={handleFlipToggle}
            className="flex items-center gap-1.5 border border-[#E59D35]/40 bg-[#0E0A08]/80 backdrop-blur-sm px-3 py-1 text-[11px] sm:text-xs text-[#F6F2EA]/90 hover:border-[#E59D35] hover:bg-[#1E1612] transition-colors cursor-pointer"
          >
            <RotateCw className="w-3 h-3 text-[#E59D35]" />
            <span>{isFlipped ? 'Front Side' : 'Turn Over'}</span>
            {!isFlipped && !starCollected && (
              <span className="text-[#E59D35] font-script text-sm leading-none ml-0.5">★</span>
            )}
          </button>
        </div>
      </div>

      {/* Theatrical Rusty Lake Shutter Eyelids (Top & Bottom) + Chapter Title Card */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-40 h-1/2 bg-[#0E0A08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shutterOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-40 h-1/2 bg-[#0E0A08] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shutterOpen ? 'translate-y-full' : 'translate-y-0'
        }`}
      />

      {showTitleCard && (
        <div className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0A08] text-center px-6">
          <p className="text-[11px] tracking-[0.26em] text-[#E59D35] uppercase">
            Chapter {chapter.roman} · {chapter.actTitle}
          </p>
          <p className="mt-2 font-display text-2xl sm:text-4xl font-medium text-[#F6F2EA]">
            {chapter.title}
          </p>
        </div>
      )}
    </div>
  );
};

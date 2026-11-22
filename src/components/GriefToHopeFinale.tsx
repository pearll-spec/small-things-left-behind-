import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ARTWORK_PATHS } from '../data/storyData';
import { soundEngine } from '../audio/soundEngine';
import { ToneChoice } from '../types/story';

interface GriefToHopeFinaleProps {
  dominantTone: ToneChoice;
  onComplete: () => void;
}

const FINALE_MOTES = [
  { left: '16%', bottom: '18%', delay: '0s', dur: '8.2s', size: 4 },
  { left: '28%', bottom: '24%', delay: '1.4s', dur: '9.1s', size: 3 },
  { left: '41%', bottom: '14%', delay: '0.7s', dur: '7.6s', size: 5 },
  { left: '53%', bottom: '22%', delay: '2.3s', dur: '8.8s', size: 3.5 },
  { left: '66%', bottom: '16%', delay: '1.0s', dur: '7.9s', size: 4.5 },
  { left: '78%', bottom: '28%', delay: '2.0s', dur: '8.5s', size: 3 },
  { left: '86%', bottom: '19%', delay: '3.1s', dur: '9.4s', size: 4 },
];

type MovementIndex = 0 | 1 | 2 | 3 | 4;
const MOVEMENT_DURATIONS_MS: Record<MovementIndex, number> = {
  0: 10500,
  1: 11000,
  2: 12000,
  3: 11500,
  4: 0, // Final stage stays until the reader chooses to open the letter
};

export const GriefToHopeFinale: React.FC<GriefToHopeFinaleProps> = ({
  dominantTone,
  onComplete,
}) => {
  const [stage, setStage] = useState<MovementIndex>(0);
  const [paused, setPaused] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    soundEngine.startFinaleLament();
    return () => {
      soundEngine.stopFinaleLament();
    };
  }, []);

  // Very unhurried pacing so each movement breathes cleanly and never rushes reading
  useEffect(() => {
    if (paused || stage >= 4 || exiting) return;
    const ms = MOVEMENT_DURATIONS_MS[stage];
    if (!ms) return;
    const t = window.setTimeout(() => {
      setStage((s) => (s < 4 ? ((s + 1) as MovementIndex) : s));
    }, ms);
    return () => window.clearTimeout(t);
  }, [stage, paused, exiting]);

  const handleFinish = () => {
    if (exiting) return;
    soundEngine.playPaperRustle();
    soundEngine.stopFinaleLament();
    setExiting(true);
    window.setTimeout(onComplete, 700);
  };

  const handleNext = () => {
    soundEngine.unlockAndStart();
    if (stage < 4) {
      soundEngine.playMusicBoxChime(stage === 0 ? 72 : stage === 1 ? 74 : stage === 2 ? 77 : 81);
      setStage((s) => (s + 1) as MovementIndex);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (stage > 0) {
      soundEngine.playPaperRustle();
      setStage((s) => (s - 1) as MovementIndex);
    }
  };

  const toneSubline =
    dominantTone === 'hold'
      ? 'You kept every quiet trace warm until your chest finally had enough breath to hold both sorrow and tomorrow.'
      : dominantTone === 'witness'
        ? 'You sat honestly beside every unfinished detail—not turning away until even silence became tender.'
        : 'You unlatched the winter window slowly, letting her memory stay free inside the daylight ahead.';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#0E0A08] text-[#F6F2EA] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Cold Slate Dusk Backdrop (Movements I–III) */}
      <motion.div
        animate={{
          opacity: stage <= 1 ? 0.95 : stage === 2 ? 0.85 : stage === 3 ? 0.45 : 0.18,
        }}
        transition={{ duration: 2.8, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, #192436 0%, #0E0A08 74%)',
        }}
      />

      {/* Warm Ember & Dawn Wash Rising Slowly in Movements III–V */}
      <motion.div
        animate={{
          opacity: stage === 0 ? 0.03 : stage === 1 ? 0.12 : stage === 2 ? 0.25 : stage === 3 ? 0.58 : 0.92,
        }}
        transition={{ duration: 3.0, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(229,157,53,0.30) 0%, rgba(184,73,53,0.14) 36%, rgba(14,10,8,0) 72%)',
        }}
      />

      <div className="pointer-events-none absolute inset-0 dark-grain opacity-75" />

      {/* Top Movement Progress & Controls */}
      <header className="relative z-20 flex items-center justify-between gap-4 px-5 sm:px-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2">
          {([0, 1, 2, 3, 4] as MovementIndex[]).map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStage(idx)}
              aria-label={`Movement ${idx + 1} of 5`}
              className={`h-1.5 transition-all duration-500 cursor-pointer ${
                stage === idx
                  ? 'w-8 bg-[#E59D35]'
                  : idx < stage
                    ? 'w-3.5 bg-[#E59D35]/55'
                    : 'w-3.5 bg-[#F6F2EA]/20'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {stage < 4 && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex items-center gap-1.5 border border-[#F6F2EA]/20 bg-[#15100D]/75 px-3 py-1.5 text-[11px] tracking-[0.14em] text-[#F6F2EA]/75 hover:border-[#E59D35]/50 hover:text-[#F6F2EA] uppercase transition-colors cursor-pointer"
            >
              {paused ? <Play className="w-3 h-3 text-[#E59D35]" /> : <Pause className="w-3 h-3" />}
              <span>{paused ? 'Resume' : 'Pause'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleFinish}
            className="text-[11px] tracking-[0.16em] text-[#F6F2EA]/55 hover:text-[#F6F2EA] uppercase transition-colors cursor-pointer py-1 px-2 whitespace-nowrap"
          >
            Read Letter
          </button>
        </div>
      </header>

      {/* Center Animated Poem Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-4">
        <div className="relative w-full max-w-2xl h-64 sm:h-80 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* MOVEMENT I: 7:14 AM · Empty Chair & Fading Steam */}
            {stage === 0 && (
              <motion.div
                key="mov-1"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 380 240" className="w-full h-full max-w-md">
                  {/* Soft moonlight rectangle on oak floor */}
                  <motion.polygon
                    points="85,180 215,180 250,224 55,224"
                    fill="#8BA6BF"
                    initial={{ opacity: 0.04 }}
                    animate={{ opacity: [0.06, 0.11, 0.06] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  {/* Frosted mullioned window */}
                  <rect
                    x="110"
                    y="18"
                    width="110"
                    height="120"
                    fill="#111A28"
                    stroke="#36465C"
                    strokeWidth="2"
                  />
                  <line x1="165" y1="18" x2="165" y2="138" stroke="#36465C" strokeWidth="1.5" />
                  <line x1="110" y1="78" x2="220" y2="78" stroke="#36465C" strokeWidth="1.5" />
                  {/* Slow drifting snow outside window */}
                  {[126, 148, 182, 202, 138, 194].map((x, idx) => (
                    <circle
                      key={idx}
                      cx={x}
                      cy={32 + (idx % 3) * 28}
                      r={idx % 2 === 0 ? 1.8 : 1.2}
                      fill="#DCE6F0"
                      opacity="0.7"
                      className="animate-snow-12fps"
                      style={{ animationDelay: `${idx * 0.55}s` }}
                    />
                  ))}
                  {/* Empty wooden chair facing cold window */}
                  <path
                    d="M140 120 L140 198 M188 120 L188 198 M140 154 L196 154 M192 154 L192 204 M144 154 L144 204"
                    stroke="#6E5B50"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                  {/* Small side table & cold ceramic mug */}
                  <line x1="234" y1="158" x2="292" y2="158" stroke="#7A6558" strokeWidth="2.6" />
                  <line x1="263" y1="158" x2="263" y2="206" stroke="#5A4940" strokeWidth="2.5" />
                  <rect x="252" y="141" width="18" height="17" rx="2" fill="#E6DFD3" stroke="#15100E" strokeWidth="1.4" />
                  {/* Thin last curl of steam fading permanently away */}
                  <motion.path
                    d="M261 137 Q256 125 263 114 Q268 103 259 92"
                    fill="none"
                    stroke="#F6F2EA"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.6 }}
                    animate={{ pathLength: 1, opacity: 0 }}
                    transition={{ duration: 6.5, ease: 'easeOut' }}
                  />
                  {/* Stopped 7:14 pocket watch silhouette at top right */}
                  <circle cx="304" cy="64" r="24" fill="#181310" stroke="#9B7742" strokeWidth="2" />
                  <circle cx="304" cy="64" r="19" fill="#EFEAE0" opacity="0.9" />
                  {/* Hour at 7, Minute moving gently onto 14 and stopping */}
                  <line x1="304" y1="64" x2="296" y2="73" stroke="#191614" strokeWidth="2.2" strokeLinecap="round" />
                  <motion.line
                    x1="304"
                    y1="64"
                    x2="318"
                    y2="62"
                    stroke="#B84935"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{ rotate: -22 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 3.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: '304px 64px' }}
                  />
                  <text
                    x="304"
                    y="102"
                    textAnchor="middle"
                    fill="#9AB8D9"
                    fontSize="10"
                    letterSpacing="2"
                  >
                    07 : 14
                  </text>
                </svg>
              </motion.div>
            )}

            {/* MOVEMENT II: The Quiet Phone & Cut-Paper Stars */}
            {stage === 1 && (
              <motion.div
                key="mov-2"
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center w-full h-full"
              >
                <div className="relative w-72 sm:w-96 aspect-[4/3] bg-[#161210] p-2.5 border border-[#E59D35]/35 shadow-[0_28px_70px_rgba(0,0,0,0.8)]">
                  <img
                    src={ARTWORK_PATHS.cutPaperStars}
                    alt="Solitary silhouette sitting beneath golden cut-paper stars in the indigo night"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 50%, transparent 55%, rgba(14,10,8,0.45) 100%)',
                    }}
                  />
                </div>
              </motion.div>
            )}

            {/* MOVEMENT III: Dissolving Silhouette & Hand Returning Over Ember Chest */}
            {stage === 2 && (
              <motion.div
                key="mov-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 380 240" className="w-full h-full max-w-md">
                  {/* Soft doorway glow */}
                  <motion.rect
                    x="156"
                    y="22"
                    width="68"
                    height="168"
                    fill="#E59D35"
                    initial={{ opacity: 0.14 }}
                    animate={{ opacity: [0.12, 0.2, 0.06] }}
                    transition={{ duration: 9, ease: 'easeInOut' }}
                  />
                  <line x1="60" y1="190" x2="320" y2="190" stroke="#3B312B" strokeWidth="1.5" />

                  {/* Departing silhouette slowly dissolving into light & ash */}
                  <motion.g
                    initial={{ opacity: 0.92, x: 0 }}
                    animate={{ opacity: 0.12, x: 18 }}
                    transition={{ duration: 8.5, ease: 'easeInOut' }}
                  >
                    <circle cx="222" cy="84" r="14" fill="#9AB8D9" opacity="0.7" />
                    <path
                      d="M204 190 L208 118 Q222 104 236 118 L240 190 Z"
                      fill="#9AB8D9"
                      opacity="0.55"
                    />
                  </motion.g>

                  {/* Ascending golden dust where second figure stood */}
                  {[210, 222, 232, 218, 228, 238].map((x, idx) => (
                    <motion.circle
                      key={idx}
                      cx={x}
                      cy={138 - idx * 8}
                      r={idx % 2 === 0 ? 2.2 : 1.5}
                      fill="#E59D35"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: [0, 0.85, 0], y: -58 }}
                      transition={{
                        duration: 5.5,
                        delay: 1.2 + idx * 0.65,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                    />
                  ))}

                  {/* Remaining figure reaching out, then pressing hand back over warm chest */}
                  <circle cx="144" cy="86" r="14" fill="#F6F2EA" opacity="0.88" />
                  <path
                    d="M124 190 L128 116 Q144 102 160 116 L164 190 Z"
                    fill="#261F1B"
                    stroke="#F6F2EA"
                    strokeWidth="1.4"
                  />
                  {/* Heart ember glowing steadily inside remaining silhouette */}
                  <motion.circle
                    cx="144"
                    cy="132"
                    r="11"
                    fill="#E59D35"
                    initial={{ opacity: 0.18, scale: 0.85 }}
                    animate={{ opacity: [0.3, 0.72, 0.4], scale: [0.9, 1.15, 0.95] }}
                    transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ transformOrigin: '144px 132px' }}
                  />
                  {/* Outstretched arm folding gently back over the heart */}
                  <motion.path
                    d="M156 122 Q178 118 192 124"
                    fill="none"
                    stroke="#F6F2EA"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        'M156 122 Q178 118 194 122',
                        'M156 122 Q172 132 146 132',
                      ],
                    }}
                    transition={{ duration: 6.5, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </motion.div>
            )}

            {/* MOVEMENT IV: Cracked Stone -> Blossom Heart & Wildflowers Diptych */}
            {stage === 3 && (
              <motion.div
                key="mov-4"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center gap-4 sm:gap-7 w-full h-full"
              >
                <motion.div
                  initial={{ opacity: 0, x: -16, rotate: -2 }}
                  animate={{ opacity: 1, x: 0, rotate: -2 }}
                  transition={{ duration: 1.4, delay: 0.2 }}
                  className="w-36 sm:w-48 h-48 sm:h-64 bg-[#F6F2EA] p-2 border border-[#15100E] shadow-[0_24px_60px_rgba(0,0,0,0.7)]"
                >
                  <img
                    src={ARTWORK_PATHS.bloomHeart}
                    alt="Figure with white blossoms growing gently from a fractured heart"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16, rotate: 2 }}
                  animate={{ opacity: 1, x: 0, rotate: 2 }}
                  transition={{ duration: 1.4, delay: 0.65 }}
                  className="w-40 sm:w-56 h-40 sm:h-56 bg-[#EFEAE0] p-2 border border-[#15100E] shadow-[0_26px_65px_rgba(229,157,53,0.2)]"
                >
                  <img
                    src={ARTWORK_PATHS.wildflowersStone}
                    alt="Wildflowers blooming through cracked limestone"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            )}

            {/* MOVEMENT V: Epilogue Embrace — Carrying Love Forward */}
            {stage === 4 && (
              <motion.div
                key="mov-5"
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center w-full h-full"
              >
                <div className="relative w-48 sm:w-60 h-64 sm:h-80 bg-[#F6F2EA] p-2.5 border border-[#E59D35]/45 shadow-[0_28px_80px_rgba(229,157,53,0.22)]">
                  <img
                    src={ARTWORK_PATHS.epilogueEmbrace}
                    alt="Fine painting of two figures holding one another in tender remembrance"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drifting Amber Hope Motes in Later Movements */}
          {stage >= 2 &&
            FINALE_MOTES.map((mote, i) => (
              <span
                key={i}
                className="pointer-events-none absolute rounded-full bg-[#E59D35] animate-float-ember shadow-[0_0_12px_rgba(229,157,53,0.85)]"
                style={{
                  left: mote.left,
                  bottom: mote.bottom,
                  width: `${mote.size}px`,
                  height: `${mote.size}px`,
                  animationDelay: mote.delay,
                  animationDuration: mote.dur,
                }}
              />
            ))}
        </div>

        {/* Deeply Sad -> Bittersweet Hope Narrative Prose */}
        <div className="mt-6 max-w-xl text-center min-h-[155px] flex flex-col items-center justify-start">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="copy-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.0 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#9AB8D9]/85 uppercase">
                  I · 7:14 AM — The Room After
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  Her watch stopped at 7:14, yet snow kept falling on every other street.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/70 leading-relaxed">
                  The strangest cruelty of loss is an untouched mug beside a chair the morning forgot to stop for.
                </p>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="copy-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.0 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#9AB8D9]/85 uppercase">
                  II · Nowhere Left to Send It
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  You still reach for your phone in ordinary daylight—then remember she can’t answer.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/72 leading-relaxed">
                  An unshot Polaroid frame, two unused ferry tickets, and twelve seconds of rain on an old voicemail.
                </p>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="copy-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.0 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#E59D35]/90 uppercase">
                  III · Where Love Goes Next
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  Grief is love with all its warmth still burning, standing before a door that won’t open twice.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/74 leading-relaxed">
                  Until your hand folds gently back over your chest—and realizes the ember never actually left you.
                </p>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div
                key="copy-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1.0 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#E59D35] uppercase">
                  IV · Even Through Cracked Stone
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  Sorrow never shrinks to fit a smaller pocket. Your life simply grows blossoms around the crack.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/78 leading-relaxed">
                  Brokenness is not the end of beauty; it is where the chamomile roots finally find room to climb.
                </p>
              </motion.div>
            )}

            {stage === 4 && (
              <motion.div
                key="copy-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#E59D35] uppercase">
                  V · What Remains
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  You do not pack the cedar box to forget her. You carry her light back out into the morning.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/80 leading-relaxed">
                  {toneSubline}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Controls */}
      <footer className="relative z-20 pb-[max(2rem,env(safe-area-inset-bottom))] px-6 flex items-center justify-center gap-3">
        {stage > 0 && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous movement"
            className="inline-flex items-center gap-1 border border-[#F6F2EA]/20 bg-[#15100D]/80 px-3.5 py-2.5 text-xs text-[#F6F2EA]/75 hover:border-[#E59D35]/55 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        )}

        {stage < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 border border-[#E59D35]/45 bg-[#15100D]/85 px-6 py-2.5 text-xs tracking-[0.16em] uppercase text-[#F6F2EA]/90 hover:border-[#E59D35] transition-colors cursor-pointer"
          >
            <span>Next Moment</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#E59D35]" />
          </button>
        ) : (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            onClick={handleFinish}
            className="inline-flex items-center gap-2 bg-[#F6F2EA] text-[#0E0A08] px-7 py-3 text-xs sm:text-sm font-medium tracking-[0.16em] uppercase hover:bg-[#EFEAE0] transition-colors cursor-pointer shadow-[0_14px_36px_rgba(0,0,0,0.65)]"
          >
            <span>Open Nora’s Final Letter</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </footer>
    </motion.div>
  );
};

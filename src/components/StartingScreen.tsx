import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, SlidersHorizontal } from 'lucide-react';
import { AudioMode, ChapterData } from '../types/story';
import { ARTWORK_PATHS } from '../data/storyData';
import { soundEngine } from '../audio/soundEngine';

interface StartingScreenProps {
  currentChapterData: ChapterData;
  hasStartedStory: boolean;
  epilogueUnlocked: boolean;
  audioMode: AudioMode;
  onCycleAudioMode: () => void;
  onOpenSettings: () => void;
  onStartOrContinue: () => void;
  onOpenNotebook: () => void;
  onOpenBox: () => void;
  onOpenEpilogue: () => void;
}

const EMBER_MOTES = [
  { left: '66%', bottom: '36%', delay: '0s', dur: '7.8s', size: 2.5, blur: false },
  { left: '72%', bottom: '44%', delay: '1.8s', dur: '9.2s', size: 4, blur: true },
  { left: '78%', bottom: '48%', delay: '2.7s', dur: '7.4s', size: 2, blur: false },
  { left: '84%', bottom: '56%', delay: '0.9s', dur: '8.3s', size: 3, blur: false },
  { left: '69%', bottom: '58%', delay: '3.6s', dur: '9.8s', size: 4.5, blur: true },
  { left: '81%', bottom: '68%', delay: '4.4s', dur: '7.9s', size: 2.5, blur: false },
  { left: '88%', bottom: '62%', delay: '2.1s', dur: '8.7s', size: 3, blur: false },
];

export const StartingScreen: React.FC<StartingScreenProps> = ({
  currentChapterData,
  hasStartedStory,
  epilogueUnlocked,
  audioMode,
  onCycleAudioMode,
  onOpenSettings,
  onStartOrContinue,
  onOpenNotebook,
  onOpenBox,
  onOpenEpilogue,
}) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isLeaving, setIsLeaving] = useState(false);
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [soundRunning, setSoundRunning] = useState(() => soundEngine.isRunning());

  useEffect(() => {
    return soundEngine.subscribe(() => {
      setSoundRunning(soundEngine.isRunning());
    });
  }, []);

  const audioLabel =
    audioMode === 'off'
      ? 'Sound Off'
      : !soundRunning
        ? 'Enable Sound'
        : audioMode === 'piano-rain'
          ? 'Piano · Rain'
          : 'Felt Piano';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx, y: ny });
  };

  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If sound is enabled in settings but Safari hasn't unlocked AudioContext yet,
    // first click unlocks & starts playback immediately instead of cycling away from Piano · Rain.
    if (audioMode !== 'off' && !soundRunning) {
      soundEngine.unlockAndStart();
      return;
    }
    onCycleAudioMode();
  };

  const handleLaunchClick = () => {
    if (isLeaving) return;
    // Unlock audio synchronously inside the click gesture before any transition timeout
    soundEngine.unlockAndStart();
    setIsLeaving(true);
    window.setTimeout(() => {
      onStartOrContinue();
    }, 520);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full bg-[#0E0A08] text-[#F6F2EA] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Curatorial Veil Dissolve */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLeaving ? 1 : 0 }}
        transition={{ duration: isLeaving ? 0.5 : 1.45, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-50 bg-[#0E0A08]"
      />

      {/* Full-Bleed Hand-Drawn Symbolic Ink Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="h-full w-full transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${parallax.x * -10}px, ${parallax.y * -7}px, 0) scale(1.03)`,
          }}
        >
          {!heroImgFailed ? (
            <img
              src={ARTWORK_PATHS.emberHand}
              alt="Hand-drawn ink illustration on dark paper showing an open cedar keepsake box with an untied ribbon, a stopped pocket watch, chamomile flowers, a paper boat, and dandelion seeds drifting upward"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="h-full w-full object-cover object-[76%_54%] sm:object-[72%_52%] opacity-95"
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_72%_48%,rgba(229,157,53,0.12),rgba(14,10,8,0.98)_65%)]" />
          )}
        </div>

        {/* Subtle Warm Paper Glow Over the Keepsake Box */}
        <div
          className="absolute inset-0 animate-ember-pulse opacity-65"
          style={{
            transform: `translate3d(${parallax.x * -14}px, ${parallax.y * -10}px, 0)`,
            background:
              'radial-gradient(circle at 75% 56%, rgba(229, 157, 53, 0.10) 0%, rgba(184, 73, 53, 0.04) 28%, rgba(14, 10, 8, 0) 56%)',
          }}
        />

        {/* Soft Edge Vignettes for Editorial Legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #0E0A08 0%, rgba(14, 10, 8, 0.88) 28%, rgba(14, 10, 8, 0.44) 48%, rgba(14, 10, 8, 0.04) 76%, rgba(14, 10, 8, 0.24) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14, 10, 8, 0.68) 0%, rgba(14, 10, 8, 0.04) 22%, rgba(14, 10, 8, 0.14) 64%, rgba(14, 10, 8, 0.88) 92%, #0E0A08 100%)',
          }}
        />

        {/* Quiet Drifting Gold-Leaf Dust Motes Rising Above the Box */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out opacity-55"
          style={{
            transform: `translate3d(${parallax.x * -18}px, ${parallax.y * -12}px, 0)`,
          }}
        >
          {EMBER_MOTES.map((mote, i) => (
            <span
              key={i}
              className={`absolute rounded-full bg-[#E59D35] animate-float-ember ${
                mote.blur
                  ? 'blur-[1.5px] opacity-40'
                  : 'opacity-70 shadow-[0_0_6px_rgba(246,242,234,0.45)]'
              }`}
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
      </motion.div>

      {/* Subtle Canvas Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[5] dark-grain opacity-70" />

      {/* Minimal Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-10 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3"
      >
        <p className="text-[11px] sm:text-xs tracking-[0.22em] text-[#F6F2EA]/72 uppercase whitespace-nowrap truncate">
          CHAPTER {currentChapterData.roman} · {currentChapterData.seasonLabel}
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleAudioClick}
            className={`flex items-center gap-2 border px-3.5 py-1.5 text-xs transition-colors cursor-pointer whitespace-nowrap backdrop-blur-sm ${
              audioMode !== 'off' && !soundRunning
                ? 'border-[#E59D35]/75 bg-[#E59D35]/15 text-[#F6F2EA] hover:bg-[#E59D35]/25'
                : 'border-[#E59D35]/35 bg-[#0E0A08]/65 text-[#F6F2EA]/90 hover:border-[#E59D35]/70'
            }`}
          >
            {audioMode === 'off' ? (
              <VolumeX className="w-3.5 h-3.5 text-[#F6F2EA]/60" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#E59D35]" />
            )}
            <span>{audioLabel}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenSettings();
            }}
            aria-label="Open settings"
            className="flex items-center justify-center border border-[#F6F2EA]/20 bg-[#0E0A08]/65 backdrop-blur-sm p-2 text-[#F6F2EA]/80 hover:text-[#F6F2EA] hover:border-[#E59D35]/55 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </motion.header>

      {/* Editorial Lower-Left Composition */}
      <main
        className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-5 sm:px-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${parallax.x * 5}px, ${parallax.y * 3}px, 0)`,
        }}
      >
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-xs tracking-[0.24em] text-[#E59D35]/90 uppercase"
          >
            PART I–IV · AN EPISTOLARY MEMORY OF GRIEF
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-display text-4xl sm:text-6xl lg:text-[4.35rem] font-medium leading-[1.02] tracking-tight text-[#F6F2EA] [text-wrap:balance] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
          >
            Small Things Left Behind
          </motion.h1>

          {/* Thin Bronze Hairline */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="mt-5 h-px w-24 bg-[#E59D35]/70"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.96, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-serif-body italic text-sm sm:text-base leading-relaxed text-[#F6F2EA]/85 max-w-md"
          >
            Sixteen keepsakes, letters left in drawers, and the quiet warmth someone trusted you to carry after she was gone.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={handleLaunchClick}
              className="bg-[#F6F2EA] text-[#0E0A08] px-6 py-3 text-xs sm:text-sm font-medium tracking-[0.14em] uppercase hover:bg-[#EFEAE0] hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
            >
              {hasStartedStory
                ? `CONTINUE · CHAPTER ${currentChapterData.roman}`
                : 'OPEN CHAPTER I'}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.unlockAndStart();
                onOpenNotebook();
              }}
              className="border border-[#E59D35]/45 bg-[#0E0A08]/70 backdrop-blur-sm px-5 py-3 text-xs sm:text-sm text-[#F6F2EA]/90 hover:border-[#E59D35] hover:bg-[#E59D35]/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              Notebook Index
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.unlockAndStart();
                onOpenBox();
              }}
              className="border border-[#E59D35]/45 bg-[#0E0A08]/70 backdrop-blur-sm px-5 py-3 text-xs sm:text-sm text-[#F6F2EA]/90 hover:border-[#E59D35] hover:bg-[#E59D35]/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              Inside the Box
            </button>

            {epilogueUnlocked && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.unlockAndStart();
                  onOpenEpilogue();
                }}
                className="border border-[#F6F2EA]/35 bg-[#233B5C]/45 px-5 py-3 text-xs sm:text-sm text-[#F6F2EA] hover:bg-[#233B5C]/70 transition-colors cursor-pointer whitespace-nowrap"
              >
                Final Letter
              </button>
            )}
          </motion.div>
        </div>

        {/* Bottom-right subtle italic line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.25 }}
          className="font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/68 lg:text-right max-w-xs"
        >
          Even through cracked stone, a quiet light remains.
        </motion.p>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX, SlidersHorizontal } from 'lucide-react';
import { AudioMode, ChapterData } from '../types/story';
import { ARTWORK_PATHS } from '../data/storyData';

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
  { left: '58%', bottom: '20%', delay: '0s', dur: '6.8s', size: 4, blur: false },
  { left: '66%', bottom: '14%', delay: '1.5s', dur: '8.2s', size: 7, blur: true },
  { left: '72%', bottom: '26%', delay: '2.4s', dur: '6.1s', size: 3, blur: false },
  { left: '79%', bottom: '18%', delay: '0.7s', dur: '7.4s', size: 5, blur: false },
  { left: '63%', bottom: '32%', delay: '3.4s', dur: '8.8s', size: 8, blur: true },
  { left: '75%', bottom: '36%', delay: '4.2s', dur: '6.5s', size: 3, blur: false },
  { left: '84%', bottom: '24%', delay: '2.0s', dur: '7.6s', size: 4, blur: false },
  { left: '54%', bottom: '28%', delay: '5.1s', dur: '9.0s', size: 6, blur: true },
  { left: '70%', bottom: '42%', delay: '1.1s', dur: '7.2s', size: 2.5, blur: false },
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

  const audioLabel =
    audioMode === 'piano-rain' ? 'Piano · Rain' : audioMode === 'piano' ? 'Felt Piano' : 'Sound Off';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: nx, y: ny });
  };

  const handleLaunchClick = () => {
    if (isLeaving) return;
    setIsLeaving(true);
    window.setTimeout(() => {
      onStartOrContinue();
    }, 460);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] w-full bg-[#0E0A08] text-[#F6F2EA] overflow-hidden flex flex-col justify-between select-none"
    >
      {/* Curatorial Initial Curtain Dissolve */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLeaving ? 1 : 0 }}
        transition={{ duration: isLeaving ? 0.45 : 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed inset-0 z-50 bg-[#0E0A08]"
      />

      {/* Right-anchored Ember-Hand Oil Painting with Multi-Layer Parallax */}
      <motion.div
        initial={{ opacity: 0, scale: 1.07 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[68%] lg:w-[60%] overflow-hidden"
      >
        <div
          className="h-full w-full transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${parallax.x * -14}px, ${parallax.y * -10}px, 0) scale(1.03)`,
          }}
        >
          <img
            src={ARTWORK_PATHS.emberHand}
            alt="Oil painting of a warm glowing hand reaching into golden light against deep shadow"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-[56%_42%] opacity-92 animate-painting-breath"
          />
        </div>

        {/* Volumetric Warm Candlelight Ray Sweep */}
        <div
          className="absolute -inset-y-16 left-[12%] w-[62%] mix-blend-screen animate-light-sweep"
          style={{
            background:
              'linear-gradient(105deg, rgba(229,157,53,0) 0%, rgba(229,157,53,0.14) 48%, rgba(255,226,138,0.06) 64%, rgba(229,157,53,0) 100%)',
          }}
        />

        {/* Soft Radial Warm Amber Heartbeat Glow */}
        <div
          className="absolute inset-0 animate-ember-pulse"
          style={{
            transform: `translate3d(${parallax.x * -22}px, ${parallax.y * -16}px, 0)`,
            background:
              'radial-gradient(circle at 52% 46%, rgba(229, 157, 53, 0.38) 0%, rgba(184, 73, 53, 0.16) 28%, rgba(14, 10, 8, 0) 64%)',
          }}
        />

        {/* Smooth Oil-Shadow Vignette Blending Left & Outer Edges Seamlessly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #0E0A08 0%, rgba(14, 10, 8, 0.94) 22%, rgba(14, 10, 8, 0.44) 52%, rgba(14, 10, 8, 0.22) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(14, 10, 8, 0.78) 0%, rgba(14, 10, 8, 0) 24%, rgba(14, 10, 8, 0.15) 70%, #0E0A08 100%)',
          }}
        />

        {/* Dual-depth Golden Ember & Bokeh Motes */}
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${parallax.x * -26}px, ${parallax.y * -18}px, 0)`,
          }}
        >
          {EMBER_MOTES.map((mote, i) => (
            <span
              key={i}
              className={`absolute rounded-full bg-[#E59D35] animate-float-ember ${
                mote.blur
                  ? 'blur-[2px] opacity-60 shadow-[0_0_16px_rgba(229,157,53,0.75)]'
                  : 'shadow-[0_0_8px_rgba(255,226,138,0.9)]'
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
      <div className="pointer-events-none absolute inset-0 z-[5] dark-grain opacity-75" />

      {/* Top Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex items-center justify-between gap-4 px-5 sm:px-10 pt-[max(1.25rem,env(safe-area-inset-top))] pb-3"
      >
        <p className="text-[11px] sm:text-xs tracking-[0.22em] text-[#F6F2EA]/72 uppercase whitespace-nowrap truncate">
          CHAPTER {currentChapterData.roman} · {currentChapterData.seasonLabel}
        </p>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onCycleAudioMode}
            className="flex items-center gap-2 border border-[#E59D35]/35 bg-[#0E0A08]/65 backdrop-blur-sm px-3.5 py-1.5 text-xs text-[#F6F2EA]/90 hover:border-[#E59D35]/70 transition-colors cursor-pointer whitespace-nowrap"
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
            onClick={onOpenSettings}
            aria-label="Open settings"
            className="flex items-center justify-center border border-[#F6F2EA]/20 bg-[#0E0A08]/65 backdrop-blur-sm p-2 text-[#F6F2EA]/80 hover:text-[#F6F2EA] hover:border-[#E59D35]/55 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </motion.header>

      {/* Bottom Editorial Typography & Staggered Choreographed Entrance */}
      <main
        className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-5 sm:px-10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 4}px, 0)`,
        }}
      >
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11px] sm:text-xs tracking-[0.24em] text-[#E59D35]/90 uppercase"
          >
            PART I–IV · AN EPISTOLARY MEMORY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 font-display text-4xl sm:text-6xl lg:text-[4.25rem] font-medium leading-[1.02] tracking-tight text-[#F6F2EA] [text-wrap:balance]"
          >
            Small Things Left Behind
          </motion.h1>

          {/* Thin Bronze Hairline Drawing Outward */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="mt-5 h-px w-24 bg-[#E59D35]/65"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.98, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-serif-body italic text-sm sm:text-base leading-relaxed text-[#F6F2EA]/80 max-w-md"
          >
            Sixteen keepsakes, letters never sent, and the fragile light someone left behind.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <button
              type="button"
              onClick={handleLaunchClick}
              className="bg-[#F6F2EA] text-[#0E0A08] px-6 py-3 text-xs sm:text-sm font-medium tracking-[0.14em] uppercase hover:bg-[#EFEAE0] hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap shadow-[0_10px_28px_rgba(0,0,0,0.55)]"
            >
              {hasStartedStory
                ? `CONTINUE · CHAPTER ${currentChapterData.roman}`
                : 'OPEN CHAPTER I'}
            </button>

            <button
              type="button"
              onClick={onOpenNotebook}
              className="border border-[#E59D35]/45 bg-[#0E0A08]/60 backdrop-blur-sm px-5 py-3 text-xs sm:text-sm text-[#F6F2EA]/90 hover:border-[#E59D35] hover:bg-[#E59D35]/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              Notebook Index
            </button>

            <button
              type="button"
              onClick={onOpenBox}
              className="border border-[#E59D35]/45 bg-[#0E0A08]/60 backdrop-blur-sm px-5 py-3 text-xs sm:text-sm text-[#F6F2EA]/90 hover:border-[#E59D35] hover:bg-[#E59D35]/10 transition-colors cursor-pointer whitespace-nowrap"
            >
              Inside the Box
            </button>

            {epilogueUnlocked && (
              <button
                type="button"
                onClick={onOpenEpilogue}
                className="border border-[#F6F2EA]/35 bg-[#233B5C]/45 px-5 py-3 text-xs sm:text-sm text-[#F6F2EA] hover:bg-[#233B5C]/70 transition-colors cursor-pointer whitespace-nowrap"
              >
                Epilogue Letter
              </button>
            )}
          </motion.div>
        </div>

        {/* Bottom-right subtle italic line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, delay: 1.3 }}
          className="font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/62 lg:text-right max-w-xs"
        >
          Even through cracked stone, a quiet light remains.
        </motion.p>
      </main>
    </div>
  );
};

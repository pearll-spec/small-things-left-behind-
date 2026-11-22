import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ARTWORK_PATHS } from '../data/storyData';
import { soundEngine } from '../audio/soundEngine';
import { ToneChoice } from '../types/story';

interface GriefToHopeFinaleProps {
  dominantTone: ToneChoice;
  onComplete: () => void;
}

const FINALE_MOTES = [
  { left: '22%', bottom: '18%', delay: '0s', dur: '6.8s', size: 4 },
  { left: '34%', bottom: '24%', delay: '1.2s', dur: '7.5s', size: 3 },
  { left: '48%', bottom: '14%', delay: '0.6s', dur: '6.2s', size: 5 },
  { left: '56%', bottom: '22%', delay: '2.1s', dur: '7.8s', size: 3.5 },
  { left: '68%', bottom: '16%', delay: '0.9s', dur: '6.5s', size: 4.5 },
  { left: '78%', bottom: '28%', delay: '1.8s', dur: '7.2s', size: 3 },
];

export const GriefToHopeFinale: React.FC<GriefToHopeFinaleProps> = ({
  dominantTone,
  onComplete,
}) => {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    soundEngine.unlockAndStart();
    soundEngine.playEpilogueCrossing();
  }, []);

  // Gentle auto-progression across the three movements
  useEffect(() => {
    if (stage >= 2) return;
    const t = window.setTimeout(() => {
      setStage((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : s));
    }, 4800);
    return () => window.clearTimeout(t);
  }, [stage]);

  const handleFinish = () => {
    if (exiting) return;
    soundEngine.playPaperRustle();
    setExiting(true);
    window.setTimeout(onComplete, 550);
  };

  const handleAdvanceOrFinish = () => {
    if (stage < 2) {
      soundEngine.playMusicBoxChime(stage === 0 ? 74 : 81);
      setStage((s) => (s + 1) as 0 | 1 | 2);
    } else {
      handleFinish();
    }
  };

  const toneSubline =
    dominantTone === 'hold'
      ? 'You kept every small thing dry until she knew the porch light was still on.'
      : dominantTone === 'witness'
        ? 'You read every hour carefully—without blame, until the silence made sense.'
        : 'You opened the latch gently, leaving enough air for both of you to return whole.';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#0E0A08] text-[#F6F2EA] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Dynamic Atmospheric Wash shifting from Cold Winter Slate (Grief) -> Warm Amber Dawn (Hope) */}
      <motion.div
        animate={{
          opacity: stage === 0 ? 0.95 : stage === 1 ? 0.65 : 0.25,
        }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, #1C283B 0%, #0E0A08 75%)',
        }}
      />

      <motion.div
        animate={{
          opacity: stage === 0 ? 0.05 : stage === 1 ? 0.45 : 0.82,
        }}
        transition={{ duration: 2.4, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, rgba(229,157,53,0.28) 0%, rgba(184,73,53,0.12) 38%, rgba(14,10,8,0) 72%)',
        }}
      />

      {/* Top Controls */}
      <header className="relative z-20 flex items-center justify-between px-5 sm:px-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStage(idx as 0 | 1 | 2)}
              aria-label={`Finale movement ${idx + 1}`}
              className={`h-1.5 transition-all cursor-pointer ${
                stage === idx
                  ? 'w-7 bg-[#E59D35]'
                  : idx < stage
                    ? 'w-3 bg-[#E59D35]/55'
                    : 'w-3 bg-[#F6F2EA]/20'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleFinish}
          className="text-xs tracking-[0.16em] text-[#F6F2EA]/60 hover:text-[#F6F2EA] uppercase transition-colors cursor-pointer py-1 px-2"
        >
          Skip to Letter
        </button>
      </header>

      {/* Center Visual Poem Stage */}
      <main
        onClick={handleAdvanceOrFinish}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 cursor-pointer"
      >
        {/* Visual Canvas */}
        <div className="relative w-full max-w-lg h-64 sm:h-80 flex items-center justify-center">
          {/* Movement 0 & 1: Hand-Inked Cracked Stone -> Blooming Stem & Golden Fracture */}
          <AnimatePresence mode="wait">
            {stage < 2 ? (
              <motion.div
                key="stone-scene"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 360 240" className="w-full h-full max-w-md">
                  {/* Falling winter snow / cold rain in Movement I */}
                  {stage === 0 &&
                    [64, 118, 174, 232, 286, 94, 256].map((x, idx) => (
                      <circle
                        key={idx}
                        cx={x}
                        cy={28 + (idx % 3) * 32}
                        r={idx % 2 === 0 ? 2 : 1.4}
                        fill="#CFE0DF"
                        opacity="0.65"
                        className="animate-snow-12fps"
                        style={{ animationDelay: `${idx * 0.4}s` }}
                      />
                    ))}

                  {/* Warm glow rising through the fracture in Movement II */}
                  <motion.ellipse
                    cx="180"
                    cy="154"
                    rx="72"
                    ry="40"
                    fill="#E59D35"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage === 1 ? 0.24 : 0.04 }}
                    transition={{ duration: 1.6 }}
                  />

                  {/* Dark Cracked Limestone Slabs */}
                  <path
                    d="M42 198 L98 144 L172 152 L162 204 Z"
                    fill="#211D1B"
                    stroke="#0E0A08"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M188 150 L264 140 L318 198 L194 204 Z"
                    fill="#1C1816"
                    stroke="#0E0A08"
                    strokeWidth="2.5"
                  />
                  {/* Golden Kintsugi Light Seam along the crack */}
                  <motion.path
                    d="M178 204 L172 178 L184 156 L178 138"
                    fill="none"
                    stroke="#E59D35"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: stage === 1 ? 1 : 0.35,
                      opacity: stage === 1 ? 0.95 : 0.25,
                    }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />

                  {/* Sprouting White Chamomile Stem in Movement II */}
                  {stage === 1 && (
                    <g>
                      <motion.path
                        d="M180 162 Q178 118 184 84"
                        fill="none"
                        stroke="#476B49"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <motion.path
                        d="M181 128 Q164 118 158 108"
                        fill="none"
                        stroke="#476B49"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.1, delay: 0.45 }}
                      />
                      <motion.g
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: '184px 80px' }}
                      >
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                          <ellipse
                            key={deg}
                            cx="184"
                            cy="68"
                            rx="3.6"
                            ry="8.5"
                            fill="#F6F2EA"
                            stroke="#15100E"
                            strokeWidth="1.2"
                            transform={`rotate(${deg} 184 80)`}
                          />
                        ))}
                        <circle cx="184" cy="80" r="5" fill="#E59D35" stroke="#15100E" strokeWidth="1.3" />
                      </motion.g>
                    </g>
                  )}
                </svg>
              </motion.div>
            ) : (
              /* Movement III: Wildflowers Through Cracked Stone -> Embrace Diptych */
              <motion.div
                key="hope-diptych"
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex items-center justify-center gap-4 sm:gap-6 w-full h-full"
              >
                <motion.div
                  initial={{ opacity: 0, x: -12, rotate: -2 }}
                  animate={{ opacity: 1, x: 0, rotate: -2 }}
                  transition={{ duration: 1.2, delay: 0.15 }}
                  className="w-36 sm:w-48 h-48 sm:h-60 bg-[#F6F2EA] p-2 border border-[#15100E] shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                >
                  <img
                    src={ARTWORK_PATHS.wildflowersStone}
                    alt="Wildflowers blooming out of cracked stone"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 12, rotate: 2 }}
                  animate={{ opacity: 1, x: 0, rotate: 2 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="w-40 sm:w-52 h-52 sm:h-64 bg-[#EFEAE0] p-2 border border-[#15100E] shadow-[0_24px_60px_rgba(229,157,53,0.18)]"
                >
                  <img
                    src={ARTWORK_PATHS.epilogueEmbrace}
                    alt="Two figures embracing warmly"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rising Golden Hope Motes in Stage 1 & 2 */}
          {stage >= 1 &&
            FINALE_MOTES.map((mote, i) => (
              <span
                key={i}
                className="pointer-events-none absolute rounded-full bg-[#E59D35] animate-float-ember shadow-[0_0_10px_rgba(229,157,53,0.85)]"
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

        {/* Poetic Narrative Copy */}
        <div className="mt-6 max-w-xl text-center min-h-[145px] flex flex-col items-center justify-start">
          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div
                key="copy-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.85 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#9AB8D9]/80 uppercase">
                  I · What Stayed Behind
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  Three Novembers, grief felt like cold slate that refused to thaw.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/68">
                  You kept the porch light burning anyway, even when the hallway stayed quiet.
                </p>
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div
                key="copy-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.85 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#E59D35] uppercase">
                  II · Behind the Rusted Latch
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  Nothing she left was careless. Every small thing was waiting for steady hands.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/75">
                  Forty minutes across dark water, an oven light was already burning at 7:14 AM.
                </p>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div
                key="copy-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.95 }}
              >
                <p className="text-[11px] tracking-[0.24em] text-[#E59D35] uppercase">
                  III · Morning at Alder Harbor
                </p>
                <h2 className="mt-3 font-display text-2xl sm:text-4xl font-medium leading-snug text-[#F6F2EA] [text-wrap:balance]">
                  Grief is how love remembers. Hope is what grows through the crack.
                </h2>
                <p className="mt-3 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/78">
                  {toneSubline}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Action */}
      <footer className="relative z-20 pb-[max(2rem,env(safe-area-inset-bottom))] px-6 flex justify-center">
        {stage < 2 ? (
          <button
            type="button"
            onClick={handleAdvanceOrFinish}
            className="inline-flex items-center gap-2 border border-[#E59D35]/40 bg-[#15100D]/80 px-5 py-2.5 text-xs tracking-[0.16em] uppercase text-[#F6F2EA]/85 hover:border-[#E59D35] transition-colors cursor-pointer"
          >
            <span>Continue</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#E59D35]" />
          </button>
        ) : (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            onClick={handleFinish}
            className="inline-flex items-center gap-2 bg-[#F6F2EA] text-[#0E0A08] px-7 py-3 text-xs sm:text-sm font-medium tracking-[0.16em] uppercase hover:bg-[#EFEAE0] transition-colors cursor-pointer shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
          >
            <span>Unseal Nora’s Letter</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        )}
      </footer>
    </motion.div>
  );
};

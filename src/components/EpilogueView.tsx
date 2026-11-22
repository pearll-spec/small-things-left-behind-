import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Package, RotateCcw } from 'lucide-react';
import { ARTWORK_PATHS, CHAPTERS, EPILOGUE_BY_TONE } from '../data/storyData';
import { StorySaveState, ToneChoice } from '../types/story';
import { GriefToHopeFinale } from './GriefToHopeFinale';

interface EpilogueViewProps {
  saveState: StorySaveState;
  onBackToStart: () => void;
  onOpenNotebook: () => void;
  onOpenBox: () => void;
}

function getDominantTone(choices: Record<number, ToneChoice>): ToneChoice {
  const counts: Record<ToneChoice, number> = { hold: 0, witness: 0, letgo: 0 };
  Object.values(choices).forEach((t) => {
    counts[t] = (counts[t] || 0) + 1;
  });

  if (counts.witness >= counts.hold && counts.witness >= counts.letgo) return 'witness';
  if (counts.letgo >= counts.hold && counts.letgo >= counts.witness) return 'letgo';
  return 'hold';
}

export const EpilogueView: React.FC<EpilogueViewProps> = ({
  saveState,
  onBackToStart,
  onOpenNotebook,
  onOpenBox,
}) => {
  const [showFinale, setShowFinale] = useState(true);
  const dominantTone = getDominantTone(saveState.choicesByChapter);
  const epilogue = EPILOGUE_BY_TONE[dominantTone];

  const savedNotes = CHAPTERS.map((chap) => ({
    chapter: chap,
    note: saveState.marginNotesByChapter[chap.id]?.trim() || '',
  })).filter((entry) => entry.note.length > 0);

  return (
    <div className="min-h-[100dvh] w-full bg-[#0E0A08] text-[#F6F2EA] dark-grain py-6 px-4 sm:px-8 flex flex-col items-center">
      {showFinale && (
        <GriefToHopeFinale
          dominantTone={dominantTone}
          onComplete={() => setShowFinale(false)}
        />
      )}

      {/* Top Bar */}
      <header className="w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 pb-6">
        <button
          type="button"
          onClick={onBackToStart}
          className="inline-flex items-center gap-2 text-xs text-[#F6F2EA]/75 hover:text-[#E59D35] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Title</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowFinale(true)}
            className="inline-flex items-center gap-1.5 border border-[#E59D35]/40 bg-[#15100D] px-3.5 py-1.5 text-xs text-[#E59D35] hover:border-[#E59D35] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Crossing</span>
          </button>
          <button
            type="button"
            onClick={onOpenNotebook}
            className="inline-flex items-center gap-1.5 border border-[#E59D35]/40 bg-[#15100D] px-3.5 py-1.5 text-xs text-[#F6F2EA]/90 hover:border-[#E59D35] cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E59D35]" />
            <span>Notebook Index</span>
          </button>
          <button
            type="button"
            onClick={onOpenBox}
            className="inline-flex items-center gap-1.5 border border-[#E59D35]/40 bg-[#15100D] px-3.5 py-1.5 text-xs text-[#F6F2EA]/90 hover:border-[#E59D35] cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-[#E59D35]" />
            <span>Inside the Box</span>
          </button>
        </div>
      </header>

      {/* Main Closing Letter Spread */}
      <main className="w-full max-w-5xl bg-[#F6F2EA] text-[#191614] paper-grain border border-[#15100E] shadow-[0_30px_80px_rgba(0,0,0,0.8)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Hand-Drawn Flower Beneath Snow & Morning Sun Artwork */}
        <div className="lg:col-span-5 relative min-h-[320px] bg-[#EFEAE0] border-b lg:border-b-0 lg:border-r border-[#15100E]/20">
          <img
            src={ARTWORK_PATHS.snowFlowerSun}
            alt="Hand-drawn ink and watercolor illustration of a delicate white snowdrop blooming out of melting winter snow beneath a nostalgic morning sun"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(14,10,8,0) 74%, rgba(14,10,8,0.58) 100%)',
            }}
          />
          <p className="absolute bottom-4 left-4 right-4 font-serif-body italic text-xs text-[#F6F2EA]/95">
            After Winter · Still Reaching for Morning
          </p>
        </div>

        {/* Closing Letter Prose */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#191614]/15 pb-3">
              <span className="font-script text-xl text-[#B84935]">{epilogue.dateLabel}</span>
              <span className="text-[11px] tracking-[0.16em] text-[#233B5C] uppercase">
                {epilogue.toneLabel}
              </span>
            </div>

            <h1 className="mt-5 font-display text-3xl sm:text-4xl font-medium text-[#191614]">
              {epilogue.title}
            </h1>

            <p className="mt-5 font-script text-2xl text-[#191614]">{epilogue.openingLine}</p>

            <div className="mt-3 space-y-4 font-serif-body text-sm sm:text-[15.5px] leading-relaxed text-[#191614]/90">
              {epilogue.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <p className="mt-6 font-script text-2xl text-[#B84935] text-right">
              {epilogue.closingSignature}
            </p>
          </div>

          {/* Saved Margin Notes Archive */}
          <div className="mt-8 pt-6 border-t border-[#191614]/15">
            <p className="text-[11px] tracking-[0.18em] text-[#191614]/60 uppercase">
              Your Saved Margin Notes
            </p>

            {savedNotes.length > 0 ? (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {savedNotes.map(({ chapter, note }) => (
                  <div key={chapter.id} className="bg-[#EFEAE0] border border-[#191614]/12 p-3">
                    <p className="text-[10px] tracking-[0.14em] text-[#B84935] uppercase">
                      Ch. {chapter.roman} · {chapter.keepsakeName}
                    </p>
                    <p className="mt-1 font-script text-lg leading-snug text-[#191614]">
                      “{note}”
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 font-serif-body italic text-xs text-[#191614]/60">
                No margin notes were written during this crossing. You can still jot reflections in any chapter from the Notebook Index.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import { ARTWORK_PATHS, CHAPTERS } from '../data/storyData';
import { StorySaveState, ToneChoice } from '../types/story';

interface NotebookIndexModalProps {
  open: boolean;
  saveState: StorySaveState;
  onClose: () => void;
  onSelectChapter: (chapterId: number) => void;
  onOpenEpilogue: () => void;
}

const TONE_NAMES: Record<ToneChoice, string> = {
  hold: 'Hold Close',
  witness: 'Quiet Witness',
  letgo: 'Let Go',
};

export const NotebookIndexModal: React.FC<NotebookIndexModalProps> = ({
  open,
  saveState,
  onClose,
  onSelectChapter,
  onOpenEpilogue,
}) => {
  if (!open) return null;

  const acts = [
    { num: 1, title: 'Act I · The Quiet Room', season: 'November Dusk' },
    { num: 2, title: 'Act II · Echoes in Amber', season: 'August Nights' },
    { num: 3, title: 'Act III · What Went Unsaid', season: 'Autumn Rain' },
    { num: 4, title: 'Act IV · What Remains', season: 'First Snow' },
  ] as const;

  const maxReached = Math.max(
    saveState.currentChapter,
    ...(saveState.completedChapters.length ? saveState.completedChapters : [1])
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0A08]/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90dvh] bg-[#F6F2EA] text-[#191614] paper-grain border border-[#15100E] shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-5 border-b border-[#191614]/15 bg-[#EFEAE0]/70 shrink-0">
          <div>
            <p className="text-[11px] tracking-[0.2em] text-[#B84935] uppercase">
              Archival Field Ledger
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-medium text-[#191614]">
              Notebook Index
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs tabular-nums text-[#191614]/65">
              {saveState.completedChapters.length} / 16 Chapters Recorded
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Notebook Index"
              className="p-2 border border-[#191614]/20 text-[#191614]/75 hover:bg-[#191614]/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto archival-scroll space-y-8">
          {acts.map((act) => {
            const actChapters = CHAPTERS.filter((c) => c.act === act.num);
            return (
              <section key={act.num}>
                <div className="flex items-baseline justify-between border-b border-[#191614]/15 pb-2 mb-4">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#191614]">
                    {act.title}
                  </h3>
                  <span className="font-script text-lg text-[#233B5C]">{act.season}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {actChapters.map((chap) => {
                    const isCompleted = saveState.completedChapters.includes(chap.id);
                    const isUnlocked = chap.id <= maxReached || isCompleted;
                    const tone = saveState.choicesByChapter[chap.id];
                    const note = saveState.marginNotesByChapter[chap.id];

                    return (
                      <button
                        key={chap.id}
                        type="button"
                        disabled={!isUnlocked}
                        onClick={() => {
                          onSelectChapter(chap.id);
                          onClose();
                        }}
                        className={`text-left p-4 border transition-all flex flex-col justify-between min-h-[144px] ${
                          isUnlocked
                            ? 'bg-[#EFEAE0]/65 border-[#191614]/20 hover:border-[#B84935] hover:bg-[#EFEAE0] cursor-pointer'
                            : 'bg-[#191614]/[0.03] border-[#191614]/10 opacity-55 cursor-not-allowed'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[11px] text-[#191614]/60">
                            <span>Chapter {chap.roman}</span>
                            {!isUnlocked && <Lock className="w-3 h-3" />}
                          </div>
                          <h4 className="mt-1 font-display text-lg font-semibold leading-snug text-[#191614]">
                            {chap.title}
                          </h4>
                          <p className="mt-1 text-xs text-[#191614]/65">{chap.keepsakeName}</p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-[#191614]/10">
                          {tone ? (
                            <p className="text-[11px] text-[#476B49] font-medium">
                              Response: {TONE_NAMES[tone]}
                            </p>
                          ) : isUnlocked ? (
                            <p className="text-[11px] text-[#B84935]">Ready to open</p>
                          ) : (
                            <p className="text-[11px] text-[#191614]/45">Sealed until prior chapter</p>
                          )}
                          {note && (
                            <p className="mt-1 font-script text-sm text-[#191614]/80 truncate">
                              “{note}”
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Epilogue Card with Wildflowers Through Cracked Stone Artwork */}
          <section className="pt-2">
            <div className="border border-[#15100E] bg-[#15100D] text-[#F6F2EA] grid grid-cols-1 md:grid-cols-12 overflow-hidden">
              <div className="md:col-span-5 relative min-h-[210px] bg-[#F6F2EA] border-b md:border-b-0 md:border-r border-[#15100E]">
                <img
                  src={ARTWORK_PATHS.wildflowersStone}
                  alt="Wildflowers growing upward through cracked stone"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-opacity ${
                    saveState.epilogueUnlocked ? 'opacity-100' : 'opacity-65 grayscale-[30%]'
                  }`}
                />
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-[#E59D35] uppercase">
                    Epilogue · The Cedar Tray
                  </p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-medium text-[#F6F2EA]">
                    Even Through Cracked Stone
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#F6F2EA]/75">
                    {saveState.epilogueUnlocked
                      ? 'Every keepsake rests dry in cedar. Nora’s final sealed letter—hidden beneath the tray for the night you packed her room—is waiting.'
                      : 'Complete all sixteen keepsake chapters to unlock the five-movement crossing and Nora’s final sealed letter.'}
                  </p>
                </div>

                <div className="mt-6">
                  {saveState.epilogueUnlocked ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenEpilogue();
                      }}
                      className="inline-flex items-center gap-2 bg-[#F6F2EA] text-[#0E0A08] px-5 py-2.5 text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                    >
                      <span>Read Epilogue Letter</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <p className="inline-flex items-center gap-2 text-xs text-[#F6F2EA]/50 border border-[#F6F2EA]/15 px-4 py-2">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Unlocks after Chapter XVI</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

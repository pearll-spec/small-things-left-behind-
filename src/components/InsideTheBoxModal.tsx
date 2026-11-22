import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';
import { ARTWORK_PATHS, BOOKMARK_QUOTES, CHAPTERS } from '../data/storyData';
import { StorySaveState, ToneChoice } from '../types/story';
import { KeepsakeIllustration } from './KeepsakeIllustration';

interface InsideTheBoxModalProps {
  open: boolean;
  saveState: StorySaveState;
  onClose: () => void;
  onJumpToChapter: (chapterId: number) => void;
}

const TONE_LABELS: Record<ToneChoice, string> = {
  hold: 'Held Close',
  witness: 'Quiet Witness',
  letgo: 'Let Go',
};

export const InsideTheBoxModal: React.FC<InsideTheBoxModalProps> = ({
  open,
  saveState,
  onClose,
  onJumpToChapter,
}) => {
  const [activeTab, setActiveTab] = useState<'plates' | 'bookmarks'>('plates');

  if (!open) return null;

  const collectedIds = new Set([
    ...saveState.collectedStarQuotes,
    ...saveState.collectedPlateQuotes,
  ]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0A08]/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl max-h-[90dvh] bg-[#15100D] text-[#F6F2EA] border border-[#E59D35]/35 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Tabs */}
        <div className="px-5 sm:px-8 pt-5 pb-4 border-b border-[#F6F2EA]/12 flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
          <div>
            <p className="text-[10px] tracking-[0.22em] text-[#E59D35] uppercase">
              Cedar Keepsake Archive
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-medium text-[#F6F2EA]">
              Inside the Box
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <div className="flex items-center gap-1 bg-[#0E0A08] p-1 border border-[#F6F2EA]/15">
              <button
                type="button"
                onClick={() => setActiveTab('plates')}
                className={`px-3.5 py-1.5 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'plates'
                    ? 'bg-[#F6F2EA] text-[#0E0A08] font-medium'
                    : 'text-[#F6F2EA]/75 hover:text-[#F6F2EA]'
                }`}
              >
                Memory Plates ({saveState.completedChapters.length}/16)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bookmarks')}
                className={`px-3.5 py-1.5 text-xs transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === 'bookmarks'
                    ? 'bg-[#F6F2EA] text-[#0E0A08] font-medium'
                    : 'text-[#F6F2EA]/75 hover:text-[#F6F2EA]'
                }`}
              >
                Quote Bookmarks ({collectedIds.size}/32)
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Inside the Box"
              className="p-2 border border-[#F6F2EA]/20 text-[#F6F2EA]/70 hover:text-[#F6F2EA] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto archival-scroll space-y-6">
          {activeTab === 'plates' ? (
            <>
              {/* Archival Lid Frontispiece */}
              <div className="flex items-center gap-4 border border-[#E59D35]/25 bg-[#0E0A08]/65 p-3.5">
                <img
                  src={ARTWORK_PATHS.bloomHeart}
                  alt="Painted figure with blossoming white flower branches growing from the heart"
                  referrerPolicy="no-referrer"
                  className="w-14 h-16 sm:w-16 sm:h-20 object-cover border border-[#E59D35]/30 shrink-0"
                />
                <div>
                  <p className="text-[10px] tracking-[0.18em] text-[#E59D35] uppercase">
                    Cedar Box Lining · Sixteen Keepsakes
                  </p>
                  <p className="mt-1 font-serif-body italic text-xs sm:text-sm text-[#F6F2EA]/80">
                    Each memory plate is taped cleanly onto linen board as you sort the sixteen small things Nora left behind.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {CHAPTERS.map((chap) => {
                  const isCollected = saveState.completedChapters.includes(chap.id);
                  const tone = saveState.choicesByChapter[chap.id];

                  return (
                    <div
                      key={chap.id}
                      className={`relative bg-[#F6F2EA] text-[#191614] paper-grain p-4 border border-[#15100E] shadow-lg transition-opacity ${
                        isCollected ? 'opacity-100' : 'opacity-45'
                      }`}
                    >
                      {/* Masking-tape hinge at top */}
                      <div
                        aria-hidden="true"
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#E59D35]/55 border border-[#15100E]/20 -rotate-2"
                      />

                      <div className="flex items-center justify-between text-[10px] tracking-[0.16em] text-[#191614]/60 uppercase">
                        <span>Plate {chap.roman}</span>
                        {tone && <span className="text-[#476B49] font-medium">{TONE_LABELS[tone]}</span>}
                      </div>

                      <div className="h-32 my-2 flex items-center justify-center bg-[#EFEAE0]/70 border border-[#191614]/10 p-2">
                        {isCollected ? (
                          <KeepsakeIllustration
                            keepsakeId={chap.keepsakeId}
                            keepsakeName={chap.keepsakeName}
                            backInscription={chap.keepsakeBackInscription}
                            backDetail={chap.keepsakeBackDetail}
                            compact
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-1.5 text-[#191614]/40">
                            <Lock className="w-5 h-5" />
                            <span className="text-[11px]">Unpacked in Ch. {chap.roman}</span>
                          </div>
                        )}
                      </div>

                      <h3 className="font-display text-lg font-semibold text-[#191614]">
                        {chap.keepsakeName}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#191614]/75">
                        {isCollected
                          ? chap.memoryPlateCaption
                          : 'Complete this chapter to mount its keepsake plate.'}
                      </p>

                      {isCollected && (
                        <button
                          type="button"
                          onClick={() => {
                            onJumpToChapter(chap.id);
                            onClose();
                          }}
                          className="mt-3 text-[11px] font-medium text-[#B84935] hover:underline cursor-pointer"
                        >
                          Revisit Chapter {chap.roman}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center gap-4 border border-[#E59D35]/25 bg-[#0E0A08]/65 p-3.5 mb-5">
                <img
                  src={ARTWORK_PATHS.cutPaperStars}
                  alt="Watercolor night sky with yellow cut-paper stars"
                  referrerPolicy="no-referrer"
                  className="w-20 h-14 object-cover border border-[#E59D35]/30 shrink-0"
                />
                <p className="text-xs sm:text-sm text-[#F6F2EA]/78">
                  Thirty-two book and cinema bookmarks tucked inside the cedar box: sixteen discovered by flipping keepsakes to tap their Cut-Paper Stars, and sixteen unlocked as each Memory Plate is recorded.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BOOKMARK_QUOTES.map((item) => {
                  const unlocked = collectedIds.has(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`p-4 border transition-colors ${
                        unlocked
                          ? 'bg-[#EFEAE0] text-[#191614] border-[#15100E] paper-grain'
                          : 'bg-[#0E0A08]/60 text-[#F6F2EA]/45 border-[#F6F2EA]/12'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase mb-2">
                        <span className={unlocked ? 'text-[#B84935]' : 'text-[#F6F2EA]/40'}>
                          Chapter {item.chapterId} ·{' '}
                          {item.sourceType === 'star' ? 'Cut-Paper Star' : 'Memory Plate'}
                        </span>
                        {!unlocked && <Lock className="w-3 h-3" />}
                      </div>

                      {unlocked ? (
                        <>
                          <blockquote className="font-serif-body italic text-sm leading-relaxed text-[#191614]">
                            “{item.quote}”
                          </blockquote>
                          <p className="mt-2.5 text-xs text-[#191614]/70">
                            {item.attribution} · <span className="italic">{item.work}</span>
                          </p>
                        </>
                      ) : (
                        <p className="text-xs italic">
                          {item.sourceType === 'star'
                            ? `Flip the keepsake in Chapter ${item.chapterId} and tap its Cut-Paper Star.`
                            : `Complete Chapter ${item.chapterId} to uncover this archival bookmark.`}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

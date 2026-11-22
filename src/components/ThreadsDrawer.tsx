import React from 'react';
import { X, Link2, Lock } from 'lucide-react';
import { THREAD_CLUES } from '../data/storyData';
import { StorySaveState } from '../types/story';

interface ThreadsDrawerProps {
  open: boolean;
  saveState: StorySaveState;
  onClose: () => void;
  onJumpToChapter: (chapterId: number) => void;
}

export const ThreadsDrawer: React.FC<ThreadsDrawerProps> = ({
  open,
  saveState,
  onClose,
  onJumpToChapter,
}) => {
  if (!open) return null;

  const maxChapter = Math.max(
    saveState.currentChapter,
    ...(saveState.completedChapters.length ? saveState.completedChapters : [1])
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0E0A08]/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-[#15100D] border-l border-[#E59D35]/30 p-6 flex flex-col text-[#F6F2EA] overflow-y-auto archival-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#F6F2EA]/12 pb-4">
          <div>
            <p className="text-[10px] tracking-[0.2em] text-[#E59D35] uppercase">
              Connected Evidence
            </p>
            <h2 className="font-display text-2xl font-medium text-[#F6F2EA]">Story Threads</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Story Threads"
            className="p-2 border border-[#F6F2EA]/15 text-[#F6F2EA]/70 hover:text-[#F6F2EA] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-[#F6F2EA]/65">
          Small details across Nora’s keepsakes quietly interlock—revealing everything she tucked away for the winter after she was gone.
        </p>

        <div className="mt-5 space-y-4">
          {THREAD_CLUES.map((thread) => {
            const unlocked = maxChapter >= thread.unlockedAtChapter;
            return (
              <div
                key={thread.id}
                className={`p-4 border ${
                  unlocked
                    ? 'bg-[#0E0A08]/80 border-[#E59D35]/35'
                    : 'bg-[#0E0A08]/40 border-[#F6F2EA]/10 opacity-55'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E59D35]">
                    {unlocked ? <Link2 className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{unlocked ? thread.title : 'Unrevealed Thread'}</span>
                  </span>
                </div>

                {unlocked ? (
                  <>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#F6F2EA]/85">
                      {thread.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {thread.chapters.map((cid) => {
                        const reachable = cid <= maxChapter;
                        return (
                          <button
                            key={cid}
                            type="button"
                            disabled={!reachable}
                            onClick={() => {
                              onJumpToChapter(cid);
                              onClose();
                            }}
                            className={`px-2.5 py-1 text-[11px] border transition-colors ${
                              reachable
                                ? 'border-[#E59D35]/40 text-[#F6F2EA]/90 hover:bg-[#E59D35]/15 cursor-pointer'
                                : 'border-[#F6F2EA]/15 text-[#F6F2EA]/40 cursor-not-allowed'
                            }`}
                          >
                            Ch. {cid}
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <p className="mt-2 text-xs italic text-[#F6F2EA]/50">
                    Unlocks upon reaching Chapter {thread.unlockedAtChapter}.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

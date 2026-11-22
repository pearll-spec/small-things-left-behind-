import React from 'react';
import { X, Link2 } from 'lucide-react';
import { ChapterData } from '../types/story';

interface LetterSpreadModalProps {
  chapter: ChapterData;
  onClose: () => void;
  onOpenThreads: () => void;
}

export const LetterSpreadModal: React.FC<LetterSpreadModalProps> = ({
  chapter,
  onClose,
  onOpenThreads,
}) => {
  const { letter } = chapter;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0E0A08]/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F6F2EA] text-[#191614] paper-grain border border-[#15100E] shadow-[0_28px_70px_rgba(0,0,0,0.75)] p-5 sm:p-9 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close & Postmark Row */}
        <div className="flex items-start justify-between gap-4 border-b border-[#191614]/15 pb-4">
          <div>
            <p className="font-script text-lg sm:text-xl text-[#B84935]">{letter.dateLabel}</p>
            <div className="mt-1 inline-block border border-[#233B5C]/55 px-2.5 py-0.5 text-[10px] tracking-[0.2em] text-[#233B5C] uppercase -rotate-1">
              {letter.postmark}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Crimson Wax Seal */}
            <svg viewBox="0 0 48 48" className="w-10 h-10 shrink-0" aria-hidden="true">
              <path
                d="M24 3 C31 3 39 7 42 15 C46 23 43 34 36 40 C29 45 18 45 11 40 C4 34 2 22 7 14 C11 7 17 3 24 3 Z"
                fill="#B84935"
                stroke="#15100E"
                strokeWidth="1.8"
              />
              <circle cx="24" cy="24" r="12" fill="none" stroke="#F6F2EA" strokeOpacity="0.45" strokeWidth="1.2" />
              <text x="24" y="28" textAnchor="middle" fill="#F6F2EA" fontSize="12" fontFamily="serif">
                N
              </text>
            </svg>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close letter"
              className="p-2 border border-[#191614]/20 text-[#191614]/70 hover:text-[#191614] hover:bg-[#EFEAE0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pressed White Blossom Decoration */}
        <div className="relative mt-5">
          <svg
            viewBox="0 0 80 80"
            className="hidden sm:block float-right ml-4 mb-2 w-16 h-16 opacity-90"
            aria-hidden="true"
          >
            <path d="M40 42 Q35 60 28 74" stroke="#476B49" strokeWidth="2.2" fill="none" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse
                key={deg}
                cx="40"
                cy="25"
                rx="4.5"
                ry="11"
                fill="#FFFFFF"
                stroke="#15100E"
                strokeWidth="1.2"
                transform={`rotate(${deg} 40 40)`}
              />
            ))}
            <circle cx="40" cy="40" r="6" fill="#E59D35" stroke="#15100E" strokeWidth="1.3" />
          </svg>

          <p className="font-script text-2xl text-[#191614]">{letter.salutation}</p>

          <div className="mt-3 space-y-3.5 font-serif-body text-sm sm:text-[15.5px] leading-relaxed text-[#191614]/90">
            {letter.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <p className="mt-4 font-script text-2xl text-[#191614] text-right">{letter.signOff}</p>
        </div>

        {/* Highlighted Clue & Linked Thread Card */}
        <div className="mt-6 pt-4 border-t border-[#191614]/15 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="bg-[#EFEAE0] border border-[#E59D35]/45 p-3.5">
            <p className="text-[10px] tracking-[0.18em] text-[#B84935] uppercase font-medium">
              Observed Clue
            </p>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#191614]">
              {letter.highlightedClue}
            </p>
          </div>

          <div className="bg-[#EFEAE0] border border-[#233B5C]/30 p-3.5 flex flex-col justify-between">
            <div>
              <p className="text-[10px] tracking-[0.18em] text-[#233B5C] uppercase font-medium">
                Linked Thread · {letter.threadTitle}
              </p>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#191614]/85">
                {letter.threadConnection}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenThreads();
              }}
              className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#233B5C] hover:underline cursor-pointer self-start"
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Inspect Story Threads</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

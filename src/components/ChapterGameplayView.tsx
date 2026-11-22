import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Link2,
  MailOpen,
  Package,
  SlidersHorizontal,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { AudioMode, ChapterData, ToneChoice } from '../types/story';
import { soundEngine } from '../audio/soundEngine';
import { CottageDioramaStage } from './CottageDioramaStage';
import { LetterSpreadModal } from './LetterSpreadModal';

interface ChapterGameplayViewProps {
  chapter: ChapterData;
  totalChapters: number;
  selectedChoice?: ToneChoice;
  marginNote: string;
  starCollected: boolean;
  audioMode: AudioMode;
  onBackToStart: () => void;
  onCycleAudioMode: () => void;
  onOpenSettings: () => void;
  onOpenNotebook: () => void;
  onOpenBox: () => void;
  onOpenThreads: () => void;
  onCollectStar: () => void;
  onSelectChoice: (tone: ToneChoice) => void;
  onSaveMarginNote: (note: string) => void;
  onNextChapter: () => void;
  onOpenEpilogue: () => void;
}

export const ChapterGameplayView: React.FC<ChapterGameplayViewProps> = ({
  chapter,
  totalChapters,
  selectedChoice,
  marginNote,
  starCollected,
  audioMode,
  onBackToStart,
  onCycleAudioMode,
  onOpenSettings,
  onOpenNotebook,
  onOpenBox,
  onOpenThreads,
  onCollectStar,
  onSelectChoice,
  onSaveMarginNote,
  onNextChapter,
  onOpenEpilogue,
}) => {
  const [beatIndex, setBeatIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [localNote, setLocalNote] = useState(marginNote);
  const [keepsakeInteracted, setKeepsakeInteracted] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Reset dialogue state when chapter changes
  useEffect(() => {
    setBeatIndex(0);
    setTypedChars(0);
    setLetterOpen(false);
    setShowChoices(Boolean(selectedChoice));
    setLocalNote(marginNote);
    setKeepsakeInteracted(false);
    soundEngine.setAct(chapter.act);
  }, [chapter.id]);

  // Keep local note synced if cleared/changed externally
  useEffect(() => {
    setLocalNote(marginNote);
  }, [marginNote]);

  const currentBeat = chapter.dialogue[beatIndex] ?? chapter.dialogue[0];
  const isTypingComplete = typedChars >= currentBeat.text.length;

  // Typewriter with punctuation pauses
  useEffect(() => {
    if (showChoices) return;
    if (typedChars >= currentBeat.text.length) return;

    const char = currentBeat.text[typedChars];
    const isPauseChar = char === '.' || char === ',' || char === '—' || char === '?' || char === '!';
    const delay = isPauseChar ? 175 : 28;

    timerRef.current = window.setTimeout(() => {
      setTypedChars((c) => c + 1);
      if (typedChars % 3 === 0) {
        soundEngine.playTypewriterTick();
      }
    }, delay);

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [typedChars, beatIndex, chapter.id, showChoices, currentBeat.text]);

  const handleAdvanceDialogue = () => {
    soundEngine.unlockAndStart();
    if (!isTypingComplete) {
      setTypedChars(currentBeat.text.length);
      return;
    }

    if (beatIndex < chapter.dialogue.length - 1) {
      setBeatIndex((i) => i + 1);
      setTypedChars(0);
    } else {
      setShowChoices(true);
    }
  };

  const handleOpenLetter = () => {
    soundEngine.unlockAndStart();
    soundEngine.playPaperRustle();
    setLetterOpen(true);
  };

  const activeChoiceObj = chapter.choices.find((c) => c.tone === selectedChoice);

  const audioLabel =
    audioMode === 'piano-rain' ? 'Piano · Rain' : audioMode === 'piano' ? 'Felt Piano' : 'Sound Off';

  const channelLabel =
    currentBeat.channel === 'phone-call'
      ? 'Phone Call'
      : currentBeat.channel === 'text-message'
        ? 'Text Message'
        : currentBeat.channel === 'voice-note'
          ? 'Voice Note'
          : currentBeat.channel === 'memory'
            ? 'Memory'
            : 'In the Room';

  return (
    <div className="min-h-[100dvh] w-full bg-[#0E0A08] text-[#F6F2EA] flex flex-col justify-between dark-grain">
      {/* Minimal Indie Header */}
      <header className="w-full max-w-6xl mx-auto px-3 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            type="button"
            onClick={onBackToStart}
            aria-label="Return to starting screen"
            className="flex items-center gap-1.5 text-xs text-[#F6F2EA]/75 hover:text-[#E59D35] transition-colors cursor-pointer shrink-0 py-1.5 pr-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Title</span>
          </button>

          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] tracking-[0.2em] text-[#E59D35]/85 uppercase truncate">
              ACT {chapter.act} · {chapter.actTitle} · CHAPTER {chapter.roman} OF XVI
            </p>
            <h2 className="font-display text-lg sm:text-2xl font-medium text-[#F6F2EA] truncate leading-tight">
              {chapter.title}
            </h2>
          </div>
        </div>

        {/* Utility Nav */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenThreads}
            title="Story Threads"
            className="flex items-center gap-1.5 border border-[#E59D35]/30 bg-[#16100D] px-2.5 py-1.5 text-xs text-[#F6F2EA]/85 hover:border-[#E59D35]/70 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Link2 className="w-3.5 h-3.5 text-[#E59D35]" />
            <span className="hidden md:inline">Threads</span>
          </button>

          <button
            type="button"
            onClick={onOpenNotebook}
            title="Notebook Index"
            className="flex items-center gap-1.5 border border-[#E59D35]/30 bg-[#16100D] px-2.5 py-1.5 text-xs text-[#F6F2EA]/85 hover:border-[#E59D35]/70 transition-colors cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#E59D35]" />
            <span className="hidden md:inline">Notebook</span>
          </button>

          <button
            type="button"
            onClick={onOpenBox}
            title="Inside the Box"
            className="flex items-center gap-1.5 border border-[#E59D35]/30 bg-[#16100D] px-2.5 py-1.5 text-xs text-[#F6F2EA]/85 hover:border-[#E59D35]/70 transition-colors cursor-pointer whitespace-nowrap"
          >
            <Package className="w-3.5 h-3.5 text-[#E59D35]" />
            <span className="hidden md:inline">Box</span>
          </button>

          <button
            type="button"
            onClick={onCycleAudioMode}
            title={audioLabel}
            className="hidden sm:flex items-center gap-1.5 border border-[#F6F2EA]/15 bg-[#16100D] px-2.5 py-1.5 text-xs text-[#F6F2EA]/85 hover:border-[#E59D35]/55 transition-colors cursor-pointer whitespace-nowrap"
          >
            {audioMode === 'off' ? (
              <VolumeX className="w-3.5 h-3.5 text-[#F6F2EA]/50" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#E59D35]" />
            )}
            <span className="hidden lg:inline">{audioLabel}</span>
          </button>

          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Settings"
            className="border border-[#F6F2EA]/15 bg-[#16100D] p-1.5 sm:p-2 text-[#F6F2EA]/80 hover:text-[#F6F2EA] hover:border-[#E59D35]/55 transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </header>

      {/* Center 2D Hand-Inked Cottage Diorama */}
      <main className="w-full px-3 sm:px-6 flex-1 flex flex-col justify-center">
        <CottageDioramaStage
          chapter={chapter}
          starCollected={starCollected}
          onCollectStar={onCollectStar}
          onOpenLetter={handleOpenLetter}
          onKeepsakeInteracted={() => setKeepsakeInteracted(true)}
        />

        {/* Quiet Keepsake Prompt Line */}
        <div className="max-w-5xl w-full mx-auto mt-1.5 flex items-center justify-between text-[11px] sm:text-xs text-[#F6F2EA]/55 px-1">
          <span className="truncate">
            {keepsakeInteracted ? chapter.keepsakeReactionNote : chapter.keepsakeTapHint}
          </span>
          <span className="font-script text-sm text-[#E59D35]/85 shrink-0 ml-3">
            {chapter.keepsakeName}
          </span>
        </div>
      </main>

      {/* Bottom Cinema Bar */}
      <section className="w-full max-w-5xl mx-auto px-3 sm:px-6 pt-2 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
        <div className="border border-[#E59D35]/30 bg-[#15100D]/95 p-3.5 sm:p-5 shadow-[0_-12px_40px_rgba(0,0,0,0.45)]">
          {/* Dialogue Phase */}
          {!showChoices ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-[#E59D35] tracking-wide">
                    {currentBeat.speaker}
                  </span>
                  <span className="text-[#F6F2EA]/35">·</span>
                  <span className="font-script text-base text-[#F6F2EA]/70 leading-none">
                    {channelLabel}
                  </span>
                </div>

                {/* Progress Dots */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5" aria-label="Dialogue progress">
                    {chapter.dialogue.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setBeatIndex(idx);
                          setTypedChars(chapter.dialogue[idx].text.length);
                        }}
                        aria-label={`Dialogue beat ${idx + 1}`}
                        className={`h-1.5 transition-all cursor-pointer ${
                          idx === beatIndex
                            ? 'w-5 bg-[#E59D35]'
                            : idx < beatIndex
                              ? 'w-2 bg-[#E59D35]/50'
                              : 'w-2 bg-[#F6F2EA]/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Typewriter Prose */}
              <div
                onClick={handleAdvanceDialogue}
                className="min-h-[3.5rem] sm:min-h-[4rem] text-sm sm:text-[15.5px] leading-relaxed text-[#F6F2EA]/92 cursor-pointer"
              >
                {currentBeat.text.slice(0, typedChars)}
                {!isTypingComplete && (
                  <span className="inline-block w-1.5 h-4 ml-0.5 align-middle bg-[#E59D35]/75 animate-pulse" />
                )}
              </div>

              {/* Cinema Bar Controls */}
              <div className="mt-3 pt-3 border-t border-[#F6F2EA]/10 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="inline-flex items-center gap-2 border border-[#E59D35]/45 bg-[#E59D35]/10 px-3.5 py-1.5 text-xs text-[#F6F2EA] hover:bg-[#E59D35]/20 transition-colors cursor-pointer"
                >
                  <MailOpen className="w-3.5 h-3.5 text-[#E59D35]" />
                  <span>Unfold Letter</span>
                </button>

                <button
                  type="button"
                  onClick={handleAdvanceDialogue}
                  className="inline-flex items-center gap-1.5 bg-[#F6F2EA] text-[#0E0A08] px-4 py-1.5 text-xs font-medium tracking-wider uppercase hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                >
                  <span>
                    {!isTypingComplete
                      ? 'Reveal Line'
                      : beatIndex < chapter.dialogue.length - 1
                        ? 'Next'
                        : 'Respond'}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* Reply Choices & Margin Notes Phase */
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-xs tracking-[0.16em] text-[#E59D35] uppercase">
                  {selectedChoice ? 'Your Response Recorded' : 'How do you keep this memory?'}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChoices(false);
                      setBeatIndex(0);
                      setTypedChars(chapter.dialogue[0].text.length);
                    }}
                    className="text-xs text-[#F6F2EA]/60 hover:text-[#F6F2EA] underline cursor-pointer"
                  >
                    Re-read Room Dialogue
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenLetter}
                    className="inline-flex items-center gap-1.5 border border-[#E59D35]/45 bg-[#E59D35]/10 px-3 py-1 text-xs text-[#F6F2EA] hover:bg-[#E59D35]/20 transition-colors cursor-pointer"
                  >
                    <MailOpen className="w-3.5 h-3.5 text-[#E59D35]" />
                    <span>Unfold Letter</span>
                  </button>
                </div>
              </div>

              {!selectedChoice ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                  {chapter.choices.map((option) => (
                    <button
                      key={option.tone}
                      type="button"
                      onClick={() => {
                        soundEngine.playPaperRustle();
                        onSelectChoice(option.tone);
                      }}
                      className="group relative text-left bg-[#0E0A08]/80 border border-[#E59D35]/25 hover:border-[#E59D35] p-3 transition-colors cursor-pointer"
                    >
                      {/* Bronze Corner Brackets */}
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E59D35]/70" />
                      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E59D35]/70" />
                      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E59D35]/70" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E59D35]/70" />

                      <p className="font-display text-base font-semibold text-[#F6F2EA] group-hover:text-[#E59D35] transition-colors">
                        {option.label}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-[#F6F2EA]/75">
                        {option.sublabel}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  {/* Companion Reaction + Closing Thought */}
                  <div className="lg:col-span-7 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#E59D35]">
                      <span>{activeChoiceObj?.label}</span>
                      <span className="text-[#F6F2EA]/35">·</span>
                      <span className="text-[#F6F2EA]/65">
                        {activeChoiceObj?.companionSpeaker}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#F6F2EA]/92">
                      {activeChoiceObj?.reaction}
                    </p>
                    <p className="font-serif-body italic text-xs sm:text-sm text-[#E59D35]/90">
                      {activeChoiceObj?.closingThought}
                    </p>
                  </div>

                  {/* Optional Handwritten Margin Notes */}
                  <div className="lg:col-span-5 space-y-2.5">
                    <div className="bg-[#F6F2EA] text-[#191614] p-2.5 border border-[#15100E]">
                      <label
                        htmlFor={`margin-note-${chapter.id}`}
                        className="block text-[10px] tracking-[0.16em] text-[#B84935] uppercase"
                      >
                        Margin Note (Optional)
                      </label>
                      <textarea
                        id={`margin-note-${chapter.id}`}
                        rows={2}
                        value={localNote}
                        onChange={(e) => {
                          setLocalNote(e.target.value);
                          onSaveMarginNote(e.target.value);
                        }}
                        placeholder="Jot down a thought in the margin..."
                        className="mt-1 w-full bg-transparent font-script text-lg leading-snug text-[#191614] placeholder:text-[#191614]/40 focus:outline-none resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectChoice(selectedChoice)}
                        className="hidden"
                        aria-hidden="true"
                      />
                      {chapter.id < totalChapters ? (
                        <button
                          type="button"
                          onClick={onNextChapter}
                          className="ml-auto inline-flex items-center gap-1.5 bg-[#F6F2EA] text-[#0E0A08] px-5 py-2 text-xs font-medium tracking-[0.14em] uppercase hover:bg-[#EFEAE0] transition-colors cursor-pointer"
                        >
                          <span>Proceed to Chapter {chapter.id + 1}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onOpenEpilogue}
                          className="ml-auto inline-flex items-center gap-1.5 bg-[#E59D35] text-[#0E0A08] px-5 py-2 text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#f0aa43] transition-colors cursor-pointer"
                        >
                          <span>Open Epilogue Letter</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Unfold Letter Overlay */}
      {letterOpen && (
        <LetterSpreadModal
          chapter={chapter}
          onClose={() => setLetterOpen(false)}
          onOpenThreads={onOpenThreads}
        />
      )}
    </div>
  );
};

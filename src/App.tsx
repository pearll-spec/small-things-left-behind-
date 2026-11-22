import { useEffect, useState } from 'react';
import { CHAPTERS, BOOKMARK_QUOTES } from './data/storyData';
import { AudioMode, ScreenView, StorySaveState, ToneChoice } from './types/story';
import { soundEngine } from './audio/soundEngine';
import { StartingScreen } from './components/StartingScreen';
import { ChapterGameplayView } from './components/ChapterGameplayView';
import { EpilogueView } from './components/EpilogueView';
import { NotebookIndexModal } from './components/NotebookIndexModal';
import { InsideTheBoxModal } from './components/InsideTheBoxModal';
import { ThreadsDrawer } from './components/ThreadsDrawer';
import { SettingsDrawer } from './components/SettingsDrawer';

const STORAGE_KEY = 'small-things-left-behind-save-v1';

const DEFAULT_SAVE_STATE: StorySaveState = {
  currentChapter: 1,
  completedChapters: [],
  choicesByChapter: {},
  marginNotesByChapter: {},
  collectedStarQuotes: [],
  collectedPlateQuotes: [],
  epilogueUnlocked: false,
  audioMode: 'piano-rain',
  musicEnabled: true,
  rainEnabled: true,
};

function loadSaveState(): StorySaveState {
  if (typeof window === 'undefined') return DEFAULT_SAVE_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SAVE_STATE;
    const parsed = JSON.parse(raw) as Partial<StorySaveState>;
    return {
      ...DEFAULT_SAVE_STATE,
      ...parsed,
      completedChapters: Array.isArray(parsed.completedChapters) ? parsed.completedChapters : [],
      choicesByChapter: parsed.choicesByChapter || {},
      marginNotesByChapter: parsed.marginNotesByChapter || {},
      collectedStarQuotes: Array.isArray(parsed.collectedStarQuotes)
        ? parsed.collectedStarQuotes
        : [],
      collectedPlateQuotes: Array.isArray(parsed.collectedPlateQuotes)
        ? parsed.collectedPlateQuotes
        : [],
    };
  } catch {
    return DEFAULT_SAVE_STATE;
  }
}

export default function App() {
  const [saveState, setSaveState] = useState<StorySaveState>(loadSaveState);
  const [screen, setScreen] = useState<ScreenView>('start');

  // Modals & drawers
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);
  const [threadsOpen, setThreadsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Brief archival toast when collecting a Cut-Paper Star quote
  const [quoteToast, setQuoteToast] = useState<{ quote: string; attribution: string } | null>(
    null
  );

  // Persist saveState cleanly to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saveState));
    } catch {
      // Ignore storage quota errors
    }
  }, [saveState]);

  // Configure canonical URL and absolute social card URLs for public sharing & search indexing
  useEffect(() => {
    const currentUrl = window.location.origin + window.location.pathname;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = currentUrl;

    const absImage = `${window.location.origin}/assets/aistudio/IMG_8067_2c73cdef.jpeg`;
    const ogImg = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImg) ogImg.content = absImage;
    const twImg = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    if (twImg) twImg.content = absImage;
  }, []);

  // Sync audio synthesizer settings
  useEffect(() => {
    soundEngine.applySettings(
      saveState.audioMode,
      saveState.musicEnabled,
      saveState.rainEnabled
    );
  }, [saveState.audioMode, saveState.musicEnabled, saveState.rainEnabled]);

  const currentChapterData =
    CHAPTERS.find((c) => c.id === saveState.currentChapter) ?? CHAPTERS[0];

  const hasStartedStory =
    saveState.completedChapters.length > 0 || saveState.currentChapter > 1;

  const handleCycleAudioMode = () => {
    soundEngine.unlockAndStart();
    setSaveState((prev) => {
      const nextMode: AudioMode =
        prev.audioMode === 'piano-rain'
          ? 'piano'
          : prev.audioMode === 'piano'
            ? 'off'
            : 'piano-rain';
      return {
        ...prev,
        audioMode: nextMode,
        musicEnabled: nextMode !== 'off',
        rainEnabled: nextMode === 'piano-rain',
      };
    });
  };

  const handleSetAudioMode = (mode: AudioMode) => {
    soundEngine.unlockAndStart();
    setSaveState((prev) => ({
      ...prev,
      audioMode: mode,
      musicEnabled: mode !== 'off',
      rainEnabled: mode === 'piano-rain',
    }));
  };

  const handleToggleMusic = () => {
    soundEngine.unlockAndStart();
    setSaveState((prev) => {
      const nextMusic = !prev.musicEnabled;
      const nextMode: AudioMode =
        !nextMusic && !prev.rainEnabled
          ? 'off'
          : nextMusic && prev.rainEnabled
            ? 'piano-rain'
            : nextMusic
              ? 'piano'
              : 'off';
      return {
        ...prev,
        musicEnabled: nextMusic,
        audioMode: nextMode,
      };
    });
  };

  const handleToggleRain = () => {
    soundEngine.unlockAndStart();
    setSaveState((prev) => {
      const nextRain = !prev.rainEnabled;
      const nextMode: AudioMode =
        prev.musicEnabled && nextRain
          ? 'piano-rain'
          : prev.musicEnabled
            ? 'piano'
            : 'off';
      return {
        ...prev,
        rainEnabled: nextRain,
        audioMode: nextMode,
      };
    });
  };

  const handleStartOrContinue = () => {
    soundEngine.unlockAndStart();
    soundEngine.setAct(currentChapterData.act);
    setScreen('play');
  };

  const handleJumpToChapter = (chapterId: number) => {
    soundEngine.unlockAndStart();
    const target = CHAPTERS.find((c) => c.id === chapterId);
    if (target) {
      soundEngine.setAct(target.act);
    }
    setSaveState((prev) => ({
      ...prev,
      currentChapter: chapterId,
    }));
    setScreen('play');
  };

  const handleCollectStar = (chapterId: number) => {
    const chapter = CHAPTERS.find((c) => c.id === chapterId);
    if (!chapter) return;

    soundEngine.playStarCollect();

    const quoteObj = BOOKMARK_QUOTES.find((q) => q.id === chapter.starQuoteId);
    if (quoteObj) {
      setQuoteToast({ quote: quoteObj.quote, attribution: quoteObj.attribution });
      window.setTimeout(() => setQuoteToast(null), 4600);
    }

    setSaveState((prev) => {
      if (prev.collectedStarQuotes.includes(chapter.starQuoteId)) return prev;
      return {
        ...prev,
        collectedStarQuotes: [...prev.collectedStarQuotes, chapter.starQuoteId],
      };
    });
  };

  const handleSelectChoice = (chapterId: number, tone: ToneChoice) => {
    const chapter = CHAPTERS.find((c) => c.id === chapterId);
    if (!chapter) return;

    setSaveState((prev) => {
      const completed = prev.completedChapters.includes(chapterId)
        ? prev.completedChapters
        : [...prev.completedChapters, chapterId];

      const plates = prev.collectedPlateQuotes.includes(chapter.plateQuoteId)
        ? prev.collectedPlateQuotes
        : [...prev.collectedPlateQuotes, chapter.plateQuoteId];

      const isFinalChapter = chapterId === CHAPTERS.length;

      return {
        ...prev,
        completedChapters: completed,
        collectedPlateQuotes: plates,
        choicesByChapter: {
          ...prev.choicesByChapter,
          [chapterId]: tone,
        },
        epilogueUnlocked: prev.epilogueUnlocked || isFinalChapter,
      };
    });
  };

  const handleSaveMarginNote = (chapterId: number, note: string) => {
    setSaveState((prev) => ({
      ...prev,
      marginNotesByChapter: {
        ...prev.marginNotesByChapter,
        [chapterId]: note,
      },
    }));
  };

  const handleNextChapter = () => {
    const nextId = Math.min(CHAPTERS.length, saveState.currentChapter + 1);
    handleJumpToChapter(nextId);
  };

  const handleEraseSavedStory = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage issues
    }
    setSaveState((prev) => ({
      ...DEFAULT_SAVE_STATE,
      audioMode: prev.audioMode,
      musicEnabled: prev.musicEnabled,
      rainEnabled: prev.rainEnabled,
    }));
    setScreen('start');
  };

  return (
    <div className="min-h-[100dvh] bg-[#0E0A08] text-[#F6F2EA]">
      {screen === 'start' && (
        <StartingScreen
          currentChapterData={currentChapterData}
          hasStartedStory={hasStartedStory}
          epilogueUnlocked={saveState.epilogueUnlocked}
          audioMode={saveState.audioMode}
          onCycleAudioMode={handleCycleAudioMode}
          onOpenSettings={() => setSettingsOpen(true)}
          onStartOrContinue={handleStartOrContinue}
          onOpenNotebook={() => setNotebookOpen(true)}
          onOpenBox={() => setBoxOpen(true)}
          onOpenEpilogue={() => setScreen('epilogue')}
        />
      )}

      {screen === 'play' && (
        <ChapterGameplayView
          chapter={currentChapterData}
          totalChapters={CHAPTERS.length}
          selectedChoice={saveState.choicesByChapter[currentChapterData.id]}
          marginNote={saveState.marginNotesByChapter[currentChapterData.id] || ''}
          starCollected={saveState.collectedStarQuotes.includes(
            currentChapterData.starQuoteId
          )}
          audioMode={saveState.audioMode}
          onBackToStart={() => setScreen('start')}
          onCycleAudioMode={handleCycleAudioMode}
          onOpenSettings={() => setSettingsOpen(true)}
          onOpenNotebook={() => setNotebookOpen(true)}
          onOpenBox={() => setBoxOpen(true)}
          onOpenThreads={() => setThreadsOpen(true)}
          onCollectStar={() => handleCollectStar(currentChapterData.id)}
          onSelectChoice={(tone) =>
            handleSelectChoice(currentChapterData.id, tone)
          }
          onSaveMarginNote={(note) =>
            handleSaveMarginNote(currentChapterData.id, note)
          }
          onNextChapter={handleNextChapter}
          onOpenEpilogue={() => setScreen('epilogue')}
        />
      )}

      {screen === 'epilogue' && (
        <EpilogueView
          saveState={saveState}
          onBackToStart={() => setScreen('start')}
          onOpenNotebook={() => setNotebookOpen(true)}
          onOpenBox={() => setBoxOpen(true)}
        />
      )}

      {/* Archival Quote Bookmark Collected Toast */}
      {quoteToast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[60] max-w-sm bg-[#F6F2EA] text-[#191614] border border-[#15100E] p-4 shadow-2xl paper-grain"
        >
          <p className="text-[10px] tracking-[0.18em] text-[#B84935] uppercase">
            Cut-Paper Star Saved to Box
          </p>
          <p className="mt-1 font-serif-body italic text-xs sm:text-sm leading-snug">
            “{quoteToast.quote}”
          </p>
          <p className="mt-1 text-[11px] text-[#191614]/65">— {quoteToast.attribution}</p>
        </div>
      )}

      {/* Drawers & Modals */}
      <NotebookIndexModal
        open={notebookOpen}
        saveState={saveState}
        onClose={() => setNotebookOpen(false)}
        onSelectChapter={handleJumpToChapter}
        onOpenEpilogue={() => setScreen('epilogue')}
      />

      <InsideTheBoxModal
        open={boxOpen}
        saveState={saveState}
        onClose={() => setBoxOpen(false)}
        onJumpToChapter={handleJumpToChapter}
      />

      <ThreadsDrawer
        open={threadsOpen}
        saveState={saveState}
        onClose={() => setThreadsOpen(false)}
        onJumpToChapter={handleJumpToChapter}
      />

      <SettingsDrawer
        open={settingsOpen}
        audioMode={saveState.audioMode}
        musicEnabled={saveState.musicEnabled}
        rainEnabled={saveState.rainEnabled}
        onClose={() => setSettingsOpen(false)}
        onToggleMusic={handleToggleMusic}
        onToggleRain={handleToggleRain}
        onSetAudioMode={handleSetAudioMode}
        onEraseSavedStory={handleEraseSavedStory}
      />
    </div>
  );
}

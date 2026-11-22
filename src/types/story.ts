export type ActNumber = 1 | 2 | 3 | 4;

export type ToneChoice = 'hold' | 'witness' | 'letgo';

export type AudioMode = 'piano-rain' | 'piano' | 'off';

export type ScreenView = 'start' | 'play' | 'epilogue';

export type KeepsakeId =
  | 'blossom-diary'
  | 'doorframe-marks'
  | 'mason-jar'
  | 'bicycle-bell'
  | 'mixtape'
  | 'paper-boat'
  | 'polaroid-camera'
  | 'payphone-token'
  | 'kintsugi-mug'
  | 'ticket-stub'
  | 'unsent-letter'
  | 'sash-window'
  | 'music-box'
  | 'field-watch'
  | 'snow-globe'
  | 'keepsake-box';

export interface DialogueBeat {
  speaker: 'You' | 'Mom' | 'Sam' | 'Leo' | 'Nora (Memory)';
  channel?: 'in-person' | 'phone-call' | 'text-message' | 'voice-note' | 'memory';
  text: string;
}

export interface LetterData {
  dateLabel: string;
  postmark: string;
  salutation: string;
  paragraphs: string[];
  highlightedClue: string;
  signOff: string;
  threadTitle: string;
  threadConnection: string;
}

export interface ChoiceOption {
  tone: ToneChoice;
  label: string;
  sublabel: string;
  companionSpeaker: 'Mom' | 'Sam' | 'Leo';
  reaction: string;
  closingThought: string;
}

export interface BookmarkQuote {
  id: string;
  chapterId: number;
  sourceType: 'star' | 'plate';
  quote: string;
  attribution: string;
  work: string;
}

export interface ChapterData {
  id: number;
  roman: string;
  act: ActNumber;
  actTitle: string;
  seasonLabel: string;
  title: string;
  keepsakeId: KeepsakeId;
  keepsakeName: string;
  keepsakeBackInscription: string;
  keepsakeBackDetail: string;
  keepsakeTapHint: string;
  keepsakeReactionNote: string;
  memoryPlateCaption: string;
  dialogue: DialogueBeat[];
  letter: LetterData;
  choices: [ChoiceOption, ChoiceOption, ChoiceOption];
  starQuoteId: string;
  plateQuoteId: string;
}

export interface ThreadClue {
  id: string;
  title: string;
  summary: string;
  chapters: number[];
  unlockedAtChapter: number;
}

export interface StorySaveState {
  currentChapter: number; // 1..16
  completedChapters: number[];
  choicesByChapter: Record<number, ToneChoice>;
  marginNotesByChapter: Record<number, string>;
  collectedStarQuotes: string[];
  collectedPlateQuotes: string[];
  epilogueUnlocked: boolean;
  audioMode: AudioMode;
  musicEnabled: boolean;
  rainEnabled: boolean;
}

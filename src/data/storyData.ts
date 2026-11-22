import { BookmarkQuote, ChapterData, ThreadClue, ToneChoice } from '../types/story';

const BASE_URL = import.meta.env.BASE_URL;

export const ARTWORK_PATHS = {
  emberHand: `${BASE_URL}src/assets/images/hero_handdrawn_keepsakes_1795354297657.jpg`,
  epilogueEmbrace: `${BASE_URL}src/assets/images/epilogue_embrace_1795350090162.jpg`,
  wildflowersStone: `${BASE_URL}src/assets/images/wildflowers_stone_1795350088753.jpg`,
  bloomHeart: `${BASE_URL}src/assets/images/blossom_heart_1795350088046.jpg`,
  cutPaperStars: `${BASE_URL}src/assets/images/solitude_stars_1795350089966.jpg`,
};

export const BOOKMARK_QUOTES: BookmarkQuote[] = [
  // Chapter 1
  {
    id: 'q1-star',
    chapterId: 1,
    sourceType: 'star',
    quote: 'What is grief, if not love persevering when the hands you held have gone still.',
    attribution: 'Archival Margin',
    work: 'Notes After Winter',
  },
  {
    id: 'q1-plate',
    chapterId: 1,
    sourceType: 'plate',
    quote: 'Even if a day seems ordinary while you are living it, later it becomes the house you cannot bear to leave.',
    attribution: 'Yasujirō Ozu',
    work: 'Tokyo Story',
  },
  // Chapter 2
  {
    id: 'q2-star',
    chapterId: 2,
    sourceType: 'star',
    quote: 'We grow older in pencil marks on wood long before we understand how fragile time is.',
    attribution: 'Marilynne Robinson',
    work: 'Housekeeping (adapted motif)',
  },
  {
    id: 'q2-plate',
    chapterId: 2,
    sourceType: 'plate',
    quote: 'You will stay small beside the doorway in my memory even after the world asks you to grow tall without me.',
    attribution: 'Rainer Maria Rilke',
    work: 'Book of Hours (adapted)',
  },
  // Chapter 3
  {
    id: 'q3-star',
    chapterId: 3,
    sourceType: 'star',
    quote: 'And when great souls die, after a period peace blooms, slowly and always irregularly.',
    attribution: 'Maya Angelou',
    work: 'When Great Trees Fall',
  },
  {
    id: 'q3-plate',
    chapterId: 3,
    sourceType: 'plate',
    quote: 'A small light carried in glass is never meant to stay trapped once dawn arrives.',
    attribution: 'Nora’s Creek Notebook',
    work: 'Tin Lid Margin',
  },
  // Chapter 4
  {
    id: 'q4-star',
    chapterId: 4,
    sourceType: 'star',
    quote: 'How strange it is to walk past a streetlamp you used to race beneath with someone who is no longer there.',
    attribution: 'Hirokazu Kore-eda',
    work: 'After Life',
  },
  {
    id: 'q4-plate',
    chapterId: 4,
    sourceType: 'plate',
    quote: 'We were together. I forget the rest.',
    attribution: 'Walt Whitman',
    work: 'Leaves of Grass',
  },
  // Chapter 5
  {
    id: 'q5-star',
    chapterId: 5,
    sourceType: 'star',
    quote: 'Music holds the exact air of the room we sat in before we knew it was the last summer.',
    attribution: 'Wim Wenders',
    work: 'Alice in the Cities',
  },
  {
    id: 'q5-plate',
    chapterId: 5,
    sourceType: 'plate',
    quote: 'Do not ask the dead to stop haunting the radio; it is only their way of sitting in the passenger seat.',
    attribution: 'Ocean Vuong',
    work: 'On Earth We’re Briefly Gorgeous',
  },
  // Chapter 6
  {
    id: 'q6-star',
    chapterId: 6,
    sourceType: 'star',
    quote: 'Water keeps everything we entrust to it, turning heavy names back into salt and foam.',
    attribution: 'Virginia Woolf',
    work: 'The Waves',
  },
  {
    id: 'q6-plate',
    chapterId: 6,
    sourceType: 'plate',
    quote: 'Some goodbyes can only be folded neatly out of paper and trusted to the outgoing tide.',
    attribution: 'Alder Harbor Notes',
    work: 'Ferry Pier Margin',
  },
  // Chapter 7
  {
    id: 'q7-star',
    chapterId: 7,
    sourceType: 'star',
    quote: 'The cruelest mercy of photographs is that everyone inside them is still smiling at a camera we can no longer raise together.',
    attribution: 'Susan Sontag',
    work: 'On Photography',
  },
  {
    id: 'q7-plate',
    chapterId: 7,
    sourceType: 'plate',
    quote: 'One unexposed frame is not emptiness—it is permission to keep living after the dark.',
    attribution: 'Céline Sciamma',
    work: 'Portrait of a Lady on Fire',
  },
  // Chapter 8
  {
    id: 'q8-star',
    chapterId: 8,
    sourceType: 'star',
    quote: 'You never delete the last voicemail because once it ends, there is nowhere left to hear their breath.',
    attribution: 'Joan Didion',
    work: 'The Year of Magical Thinking',
  },
  {
    id: 'q8-plate',
    chapterId: 8,
    sourceType: 'plate',
    quote: 'Twelve seconds of wind and rain on an answering machine can hold an entire lifetime of I love you.',
    attribution: 'Céline Sciamma',
    work: 'Petite Maman',
  },
  // Chapter 9
  {
    id: 'q9-star',
    chapterId: 9,
    sourceType: 'star',
    quote: 'There is a crack in everything; that’s how the light gets in.',
    attribution: 'Leonard Cohen',
    work: 'Anthem',
  },
  {
    id: 'q9-plate',
    chapterId: 9,
    sourceType: 'plate',
    quote: 'Grief does not ruin the vessel; it simply marks every seam in gold so you remember how hard it held.',
    attribution: 'Kintsugi Ledger',
    work: 'Stoneware Notes',
  },
  // Chapter 10
  {
    id: 'q10-star',
    chapterId: 10,
    sourceType: 'star',
    quote: 'The hardest things to pack away are the tickets for trips that stayed forever in next spring.',
    attribution: 'Kazuo Ishiguro',
    work: 'Never Let Me Go',
  },
  {
    id: 'q10-plate',
    chapterId: 10,
    sourceType: 'plate',
    quote: 'We bought two seats because neither of us dared speak aloud what October already knew.',
    attribution: 'David Lean',
    work: 'Brief Encounter',
  },
  // Chapter 11
  {
    id: 'q11-star',
    chapterId: 11,
    sourceType: 'star',
    quote: 'I write in the middle of the night so you have my real voice once my voice leaves the room.',
    attribution: 'Emily Dickinson',
    work: 'Collected Letters',
  },
  {
    id: 'q11-plate',
    chapterId: 11,
    sourceType: 'plate',
    quote: 'Do not make my bedroom a quiet tomb where you are afraid to open a drawer or laugh at dusk.',
    attribution: 'Unmailed Desk Note',
    work: '2:07 AM Margin',
  },
  // Chapter 12
  {
    id: 'q12-star',
    chapterId: 12,
    sourceType: 'star',
    quote: 'Open the window once in winter; stale air makes absence feel heavier than stone.',
    attribution: 'Tove Jansson',
    work: 'The Summer Book',
  },
  {
    id: 'q12-plate',
    chapterId: 12,
    sourceType: 'plate',
    quote: 'Cold rain entering a quiet room is proof the world outside is still turning gently on your behalf.',
    attribution: 'Terrence Malick',
    work: 'The Tree of Life',
  },
  // Chapter 13
  {
    id: 'q13-star',
    chapterId: 13,
    sourceType: 'star',
    quote: 'Music is what sorrow hums when spoken language breaks down halfway across a sentence.',
    attribution: 'Anne Carson',
    work: 'Nox',
  },
  {
    id: 'q13-plate',
    chapterId: 13,
    sourceType: 'plate',
    quote: 'Plant wild chamomile in the coldest crack you can find; beauty knows how to climb through stone.',
    attribution: 'Field Herbarium IV',
    work: 'Seed Envelope Note',
  },
  // Chapter 14
  {
    id: 'q14-star',
    chapterId: 14,
    sourceType: 'star',
    quote: 'At 7:14 the hands stopped, yet every morning after still arrived at 7:14 without permission.',
    attribution: 'Jorge Luis Borges',
    work: 'Labyrinths',
  },
  {
    id: 'q14-plate',
    chapterId: 14,
    sourceType: 'plate',
    quote: 'To live after loss is to learn how an hour can hold both an ending and a sunrise at the same minute.',
    attribution: 'Isao Takahata',
    work: 'Only Yesterday',
  },
  // Chapter 15
  {
    id: 'q15-star',
    chapterId: 15,
    sourceType: 'star',
    quote: 'In the depth of winter, I finally learned that within me there lay an invincible summer.',
    attribution: 'Albert Camus',
    work: 'Return to Tipasa',
  },
  {
    id: 'q15-plate',
    chapterId: 15,
    sourceType: 'plate',
    quote: 'Even through cracked stone, a quiet light remains.',
    attribution: 'Nora’s Snow Globe Base',
    work: 'Painted Inscription',
  },
  // Chapter 16
  {
    id: 'q16-star',
    chapterId: 16,
    sourceType: 'star',
    quote: 'We do not get over the ones we lose; we simply widen our hearts until their memory has a place to rest.',
    attribution: 'Wendell Berry',
    work: 'A Place on Earth',
  },
  {
    id: 'q16-plate',
    chapterId: 16,
    sourceType: 'plate',
    quote: 'We pack the cedar box not to forget her, but so we can carry her gently into the rest of our lives.',
    attribution: 'Small Things Left Behind',
    work: 'Closing Plate XVI',
  },
];

export const THREAD_CLUES: ThreadClue[] = [
  {
    id: 'thread-chamomile',
    title: 'Hospital Drawings & Pressed Chamomile',
    summary:
      'Nora pressed white chamomile blooms beside quiet clinical dates in her diary (Ch. I) and later tucked a seed packet beneath the music box tray (Ch. XIII) asking you to scatter them along cracked stone.',
    chapters: [1, 13, 15],
    unlockedAtChapter: 1,
  },
  {
    id: 'thread-coast',
    title: 'The Unfinished Alder Harbor Trip',
    summary:
      'The folded newspaper boat (Ch. VI) and the pair of unused 6:40 PM ferry tickets (Ch. X) reveal the quiet harbor crossing Nora hoped to make with you one last time before winter worsened.',
    chapters: [6, 10],
    unlockedAtChapter: 6,
  },
  {
    id: 'thread-voicemail',
    title: 'The 12-Second Rainy Payphone Voicemail',
    summary:
      'Taped beside a brass relay token (Ch. VIII), you realize that late-night voicemail filled with wind and harbor foghorns was Nora stepping outside the clinic in the rain just to leave you the sound of her breathing.',
    chapters: [8, 10],
    unlockedAtChapter: 8,
  },
  {
    id: 'thread-sill',
    title: 'What Was Hidden for After the Snow',
    summary:
      'Nora’s 2:07 AM unsent page under the drawer (Ch. XI) and the note caught in the misted window sash (Ch. XII) show how carefully she prepared small mercies for the first winter you would have to face without her.',
    chapters: [11, 12, 13],
    unlockedAtChapter: 11,
  },
  {
    id: 'thread-714',
    title: '7:14 AM · Morning Light Through Cracked Stone',
    summary:
      'Her stopped watch marks 7:14 AM (Ch. XIV)—the quiet snow morning her breathing stilled—yet every small thing inside the cedar box (Ch. XVI) points you gently back toward living.',
    chapters: [14, 15, 16],
    unlockedAtChapter: 14,
  },
];

export const CHAPTERS: ChapterData[] = [
  // ================= ACT I: THE QUIET ROOM =================
  {
    id: 1,
    roman: 'I',
    act: 1,
    actTitle: 'The Quiet Room',
    seasonLabel: 'NOVEMBER DUSK',
    title: 'Pressed Blossom Diary',
    keepsakeId: 'blossom-diary',
    keepsakeName: 'Pressed Blossom Diary',
    keepsakeBackInscription: 'For rainy afternoons — N.',
    keepsakeBackDetail:
      'Inside the back cover, pencil notes list clinic appointments disguised beside pressed wild chamomile.',
    keepsakeTapHint: 'Tap the leather clasp to open her final autumn pages',
    keepsakeReactionNote: 'A dried chamomile petal drifts onto the desk blotter.',
    memoryPlateCaption:
      'One year after the funeral, the first notebook lifted from her shelf still smells faintly of dried tea and autumn rain.',
    dialogue: [
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'I promised myself I wouldn’t leave her bedroom shut up like a shrine for a second winter. One year of dust feels heavy enough.',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'Her linen notebook was tucked behind the radiator shelf. Look—the last three entries are dated in October, right before her last hospital stay.',
      },
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'She pressed white chamomile over the clinic dates so you wouldn’t notice when you borrowed her pen. Even when she was terrified, she tried to spare us the weight.',
      },
    ],
    letter: {
      dateLabel: 'October 19 · Her Final Autumn',
      postmark: 'HOME DESK · PRESSED FLOWER PAGE',
      salutation: 'Diary margin, 11:20 PM,',
      paragraphs: [
        'Doctor’s room was cold again today, so I picked two stubborn chamomile stems out of the sidewalk crack by the bus stop just to give my pocket something bright to hold.',
        'Mom brought wool socks and nobody mentioned winter out loud. If I pretend the days are ordinary long enough, maybe my little sister won’t remember October only as waiting rooms.',
      ],
      highlightedClue:
        'She hid how sick she was getting behind small botanical sketches so your last autumn together stayed gentle.',
      signOff: '— N.',
      threadTitle: 'Hospital Drawings & Pressed Chamomile',
      threadConnection: 'First pressed white blossom covering her October clinic dates.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Press the dried blossom flat inside the ribbon so it doesn’t crumble.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom watches your hands shake slightly as you smooth the frail stem. "She always picked the small weeds nobody else noticed," she whispers.',
        closingThought: 'Grief begins in the fingers—refusing to let even a dry petal break.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Read every masked October date in silence under the desk lamp.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom rests her palm gently against your shoulder. "We didn’t see half of what she carried quietly," she murmurs.',
        closingThought: 'Knowing how hard she protected you hurts almost as much as losing her.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Untie the faded silk ribbon so her bedroom desk can breathe.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom exhales slowly, wiping her cheek with her sleeve. "She never liked locked diaries anyway."',
        closingThought: 'Opening the ribbon doesn’t erase her—it lets air into the quiet.',
      },
    ],
    starQuoteId: 'q1-star',
    plateQuoteId: 'q1-plate',
  },
  {
    id: 2,
    roman: 'II',
    act: 1,
    actTitle: 'The Quiet Room',
    seasonLabel: 'NOVEMBER DUSK',
    title: 'Kitchen Doorframe Marks',
    keepsakeId: 'doorframe-marks',
    keepsakeName: 'Doorframe Measuring Strip',
    keepsakeBackInscription: 'Nora 5’4” · You 5’1”',
    keepsakeBackDetail:
      'One faint pencil notch sits unmeasured above yours, with tiny handwriting: "You’ll pass me next winter."',
    keepsakeTapHint: 'Tap the painted trim strip to trace the pencil marks',
    keepsakeReactionNote: 'Pale graphite smudges softly along the worn paint.',
    memoryPlateCaption:
      'Before moving boxes stacked up in the hall, Mom saved the kitchen doorframe strip so Nora’s handwriting wouldn’t be painted over.',
    dialogue: [
      {
        speaker: 'Mom',
        channel: 'phone-call',
        text: 'I pried the old painted trim piece off the pantry wall before bed. Remember how you two stood back-to-back in wool socks so nobody could cheat?',
      },
      {
        speaker: 'You',
        channel: 'phone-call',
        text: 'Mom... look at the top notch. I stood against the doorway this morning in my kitchen—I’m finally taller than her highest line.',
      },
      {
        speaker: 'Mom',
        channel: 'phone-call',
        text: 'Oh sweetheart. She knew you would pass her. It’s the cruelest part—getting older past the height someone stayed forever.',
      },
    ],
    letter: {
      dateLabel: 'Late September · Last Good Week',
      postmark: 'ARCHIVED TRIM · KITCHEN PASSAGE',
      salutation: 'Pencil note taped behind the wood,',
      paragraphs: [
        'Made one crooked line while the kettle cooled because I wanted an excuse to stand upright in the kitchen without anyone holding my elbow.',
        'You’re half an inch from my shoulder now. Promise you won’t stop standing tall against doorways just because I stop growing here.',
      ],
      highlightedClue:
        'Even as her strength faded in September, she was thinking about the years you would outgrow her.',
      signOff: '— Nora',
      threadTitle: 'The Height She Stopped At',
      threadConnection: 'One of the sharpest aches of grief: growing into a future she never reached.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Press your thumb over the 5’4” notch where her heel once stood.',
        companionSpeaker: 'Mom',
        reaction:
          '"It feels wrong being taller than your big sister," Mom whispers into the phone, her voice breaking.',
        closingThought: 'Time keeps stretching forward even when someone you love stops at twenty-two.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Measure the half-inch gap between her last line and your shadow today.',
        companionSpeaker: 'Mom',
        reaction:
          '"She’d tease you mercilessly for finally beating her," Mom tries to smile through tears.',
        closingThought: 'Memory measures height in love, not inches.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Lay the wooden trim softly inside the cedar tray beside her diary.',
        companionSpeaker: 'Mom',
        reaction:
          '"We’ll keep the wood safe," Mom breathes. "You don’t have to stay frozen at five-foot-one for her."',
        closingThought: 'Growing older is not a betrayal of the dead.',
      },
    ],
    starQuoteId: 'q2-star',
    plateQuoteId: 'q2-plate',
  },
  {
    id: 3,
    roman: 'III',
    act: 1,
    actTitle: 'The Quiet Room',
    seasonLabel: 'NOVEMBER DUSK',
    title: 'Firefly Mason Jar',
    keepsakeId: 'mason-jar',
    keepsakeName: 'Firefly Mason Jar',
    keepsakeBackInscription: '7 nail holes in tin',
    keepsakeBackDetail:
      'Inside the empty glass sits a faint ring of summer beeswax and dry creek grass.',
    keepsakeTapHint: 'Tap the glass jar to wake the fading amber light',
    keepsakeReactionNote: 'Seven pinprick holes scatter tiny golden flecks across the dark desk.',
    memoryPlateCaption:
      'Nora punched seven crooked nail holes in the tin lid—because nothing bright was ever meant to be kept locked up.',
    dialogue: [
      {
        speaker: 'Leo',
        channel: 'text-message',
        text: 'Found a blurry summer photo in my camera roll tonight... do you still have that glass jar Nora punched seven holes into behind the creek?',
      },
      {
        speaker: 'You',
        channel: 'text-message',
        text: 'Sitting right in front of me. I still can’t throw it out even though there hasn’t been anything inside it for years.',
      },
      {
        speaker: 'Leo',
        channel: 'text-message',
        text: 'Remember she always shook the lid open before we walked home? Said bright things dim if you try to own them.',
      },
    ],
    letter: {
      dateLabel: 'August 19 · Before Any of Us Knew',
      postmark: 'CREEK BANK · NOTE UNDER TIN RIM',
      salutation: 'Folded under the rusted lid,',
      paragraphs: [
        'Leo counted six nail holes and told me that was enough, so I hammered a seventh one crooked just to hear the tin pop.',
        'We caught nine fireflies and shook them all loose by the alder fence at 9:30. Never trap light in glass overnight—even if you’re scared of walking home in the dark.',
      ],
      highlightedClue:
        'Her gentlest rule: loving something never means locking it inside a jar.',
      signOff: '— N.',
      threadTitle: 'Seven Holes in Tin',
      threadConnection: 'Foreshadows how she hoped you would release sorrow without hardening around it.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Warm the empty glass jar between both palms in the dark room.',
        companionSpeaker: 'Leo',
        reaction:
          'Leo texts back: "Weird how looking at an old jar can make a grown person cry in a parking lot."',
        closingThought: 'Empty things hurt hardest because your hands remember what filled them.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Count the seven uneven holes under the banker’s lamp.',
        companionSpeaker: 'Leo',
        reaction:
          'Leo writes: "She was stubborn like that. Always one extra hole for luck."',
        closingThought: 'Small eccentricities stay sharper than entire birthdays.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Set the tin lid down beside the jar—open at the top.',
        companionSpeaker: 'Leo',
        reaction:
          'Leo replies: "Yeah. She hated closed lids."',
        closingThought: 'An unsealed jar lets the night air move through.',
      },
    ],
    starQuoteId: 'q3-star',
    plateQuoteId: 'q3-plate',
  },
  {
    id: 4,
    roman: 'IV',
    act: 1,
    actTitle: 'The Quiet Room',
    seasonLabel: 'NOVEMBER DUSK',
    title: 'Chrome Handlebar Bell',
    keepsakeId: 'bicycle-bell',
    keepsakeName: 'Chrome Handlebar Bell',
    keepsakeBackInscription: 'Orchard Lane · Dusk',
    keepsakeBackDetail:
      'A tiny scratched "N" rests inside the thumb lever where chrome wore down to pale brass.',
    keepsakeTapHint: 'Tap the chrome dome to hear the worn hammer chime once',
    keepsakeReactionNote: 'A clear silver ring hangs in the quiet room long after your finger lifts.',
    memoryPlateCaption:
      'The week she stopped having breath enough to ride Orchard Lane, she unbolted her bicycle bell and dropped it in your coat pocket.',
    dialogue: [
      {
        speaker: 'Sam',
        channel: 'phone-call',
        text: 'Wait—you found her chrome bell? I passed her old cruiser chained near the back shed and wondered where the bell went.',
      },
      {
        speaker: 'You',
        channel: 'phone-call',
        text: 'She took a screwdriver to it herself that last October afternoon and hid it in my parka pocket while I wasn’t looking.',
      },
      {
        speaker: 'Sam',
        channel: 'phone-call',
        text: 'God... remember Orchard Lane? Coasting down before streetlights clicked on, ringing twice at every blind corner just to announce we were still alive.',
      },
    ],
    letter: {
      dateLabel: 'November 02 · Coat Pocket Note',
      postmark: 'TORN PHARMACY BAG BACKING',
      salutation: 'Folded around the brass clamp,',
      paragraphs: [
        'Bike feels too heavy to wheel down the steps lately, and I hated seeing the chrome rust under wet maple leaves.',
        'Put the bell on your handlebars or keep it in your coat. Ring twice coming up the front walk in the dark so Mom hears you from the kitchen.',
      ],
      highlightedClue:
        'She gave away the pieces of her strength one by one before she lost them, making sure they stayed in your hands.',
      signOff: '— Nora',
      threadTitle: 'Twice Coming Up the Walk',
      threadConnection: 'Every small hand-me-down was her quiet way of staying beside you on dark evenings.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Ring the bell twice softly into the silent hallway.',
        companionSpeaker: 'Sam',
        reaction:
          '"I heard that through the phone," Sam breathes, voice cracking. "God, I miss her laugh after the second ring."',
        closingThought: 'A familiar chime can split a room open in half a second.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Trace the worn brass patch where her thumb rested for ten summers.',
        companionSpeaker: 'Sam',
        reaction:
          '"She rode that thing through every storm in town," Sam remembers quietly.',
        closingThought: 'Objects outlive the skin that polished them—that is their mercy and their cruelty.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Let the last silver overtone fade completely into nightfall.',
        companionSpeaker: 'Sam',
        reaction:
          '"I still slow down at the bottom of Orchard Lane," Sam confesses softly.',
        closingThought: 'Even when the road empties out, the rhythm of coasting remains.',
      },
    ],
    starQuoteId: 'q4-star',
    plateQuoteId: 'q4-plate',
  },

  // ================= ACT II: ECHOES IN AMBER =================
  {
    id: 5,
    roman: 'V',
    act: 2,
    actTitle: 'Echoes in Amber',
    seasonLabel: 'AUGUST NIGHTS',
    title: '60-Minute Backseat Mixtape',
    keepsakeId: 'mixtape',
    keepsakeName: '60-Minute Backseat Mixtape',
    keepsakeBackInscription: 'SIDE B · FOR DRIVING HOME ALONE',
    keepsakeBackDetail:
      'In pale blue ink inside the sleeve: "For the drive back from the hospital. Don’t skip track 4."',
    keepsakeTapHint: 'Tap the cassette spools to turn the dark ribbon',
    keepsakeReactionNote: 'Two amber spools turn quietly; faint pencil smudges line the J-card.',
    memoryPlateCaption:
      'Dubbed off late-night coastal radio in Sam’s hatchback—Side A for summer highways, Side B for the quiet drives home in winter.',
    dialogue: [
      {
        speaker: 'Sam',
        channel: 'voice-note',
        text: 'Hey... I found the spare lyric sheet she scribbled for that TDK tape. I couldn’t listen to Side B for six months after the service.',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'Between track three and four, you can still hear her laughing in your backseat over the click of your hazard lights.',
      },
      {
        speaker: 'Sam',
        channel: 'voice-note',
        text: 'Nobody warns you that the hardest part of losing someone isn’t the quiet—it’s hearing their laugh unexpectedly on an old tape and forgetting for two seconds they’re gone.',
      },
    ],
    letter: {
      dateLabel: 'Late August · Two Summers Back',
      postmark: 'CASSETTE J-CARD · INNER FOLD',
      salutation: 'Inside the folded sleeve,',
      paragraphs: [
        'Side A is for rolling all four windows down when the salt air hits Orchard Bridge. Side B is quieter—for dark roads after long days when nobody feels like talking.',
        'If you ever drive past the water late at night and feel alone, let track 4 play all the way past the radio fade-out.',
      ],
      highlightedClue:
        'Her voice between tracks preserves three unguarded seconds of her laughing before illness touched anything.',
      signOff: '— N.',
      threadTitle: 'Three Seconds Before the Static',
      threadConnection: 'Hearing her alive on magnetic tape brings back the whole warmth—and the sharp drop when it ends.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Rewind the slack brown ribbon slowly with the tip of a pencil.',
        companionSpeaker: 'Sam',
        reaction:
          'Sam texts: "Don’t break that ribbon. Half her voice lives on that little strip of iron oxide."',
        closingThought: 'Some wounds are tender because you would rewind them ten times over if you could.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Read every song title she underlined in blue ink.',
        companionSpeaker: 'Sam',
        reaction:
          '"She knew every word to every song on Side B," Sam replies softly.',
        closingThought: 'Songs are the rooms people leave behind with the lights still on.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Slide the cassette gently back into its cracked plastic shell.',
        companionSpeaker: 'Sam',
        reaction:
          '"One day I’ll put it back in the dashboard without pulling over," Sam writes.',
        closingThought: 'Grief is learning to listen again without breaking at the chorus.',
      },
    ],
    starQuoteId: 'q5-star',
    plateQuoteId: 'q5-plate',
  },
  {
    id: 6,
    roman: 'VI',
    act: 2,
    actTitle: 'Echoes in Amber',
    seasonLabel: 'AUGUST NIGHTS',
    title: 'Folded Newspaper Boat',
    keepsakeId: 'paper-boat',
    keepsakeName: 'Folded Newspaper Boat',
    keepsakeBackInscription: 'ALDER POINT · LOW TIDE',
    keepsakeBackDetail:
      'Inside the folded mast crease is a damp pencil circle around the harbor cove where she scattered stones.',
    keepsakeTapHint: 'Tap the paper hull to rock the damp newsprint',
    keepsakeReactionNote: 'Dry newsprint whispers as a faint harbor map crease peeks out.',
    memoryPlateCaption:
      'She folded this out of coastal newsprint the afternoon you both sat on Pier 3 watching dark rain cross the sound.',
    dialogue: [
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'Look inside the mast fold of the paper boat she gave me at the harbor. There’s a pencil ring around the cove below Alder Lighthouse.',
      },
      {
        speaker: 'Leo',
        channel: 'text-message',
        text: 'Wait—is that where she asked us to bring wildflowers if anything ever happened? I thought I hallucinated that conversation.',
      },
      {
        speaker: 'You',
        channel: 'text-message',
        text: '"Calmest water in the sound," she wrote along the keel. We haven’t gone back to Pier 3 since November.',
      },
    ],
    letter: {
      dateLabel: 'September 14 · Harbor Bench',
      postmark: 'COASTAL WEEKLY · INSIDE CREASE',
      salutation: 'Scrawled along the damp paper keel,',
      paragraphs: [
        'If there’s ever a morning you feel like taking a long walk without answering anyone’s questions, go out past the breakwater at Alder Point.',
        'Don’t bring dark lilies. Throw yellow chamomile and dry grass off the stones—let something ordinary drift out with the tide.',
      ],
      highlightedClue:
        'She asked specifically for ordinary wildflowers at Alder Point instead of formal grief.',
      signOff: '— Nora',
      threadTitle: 'The Unfinished Alder Harbor Trip',
      threadConnection: 'Connects the cove she circled on paper to the two ferry tickets you later find.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Keep the paper boat intact inside the cedar box until spring.',
        companionSpeaker: 'Leo',
        reaction:
          '"When snow melts, let’s actually take that walk out to Alder Point together," Leo texts.',
        closingThought: 'Promises made to the dead take time to gather breath for.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Trace the penciled breakwater line with your finger.',
        companionSpeaker: 'Leo',
        reaction:
          '"She hated funerals," Leo adds. "She just wanted wind and wild weeds by the water."',
        closingThought: 'Knowing what someone truly loved gives sorrow somewhere honest to walk.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Set the paper hull gently down across the wooden desk.',
        companionSpeaker: 'Leo',
        reaction:
          '"Nothing stays sunk forever if you fold it light enough," Leo writes back.',
        closingThought: 'Some goodbyes only become bearable near salt water.',
      },
    ],
    starQuoteId: 'q6-star',
    plateQuoteId: 'q6-plate',
  },
  {
    id: 7,
    roman: 'VII',
    act: 2,
    actTitle: 'Echoes in Amber',
    seasonLabel: 'AUGUST NIGHTS',
    title: 'Instant Polaroid Camera',
    keepsakeId: 'polaroid-camera',
    keepsakeName: 'Instant Polaroid Camera',
    keepsakeBackInscription: '1 EXPOSURE REMAINING',
    keepsakeBackDetail:
      'Sticker inside the film door: "Save Frame 8 for a morning you laugh without apologizing."',
    keepsakeTapHint: 'Tap the shutter button to hear the empty motor click',
    keepsakeReactionNote: 'The shutter snaps dryly; the film counter still glows 1.',
    memoryPlateCaption:
      'She took Frame 7 of you and Leo squinting into golden hour—and purposefully left Frame 8 unexposed inside the camera.',
    dialogue: [
      {
        speaker: 'Leo',
        channel: 'phone-call',
        text: 'Before you pack her camera away... open the bottom film latch. Does it still show one shot left?',
      },
      {
        speaker: 'You',
        channel: 'phone-call',
        text: 'Yeah. Number one. Wait—why is there a piece of masking tape stuck inside the battery door?',
      },
      {
        speaker: 'Leo',
        channel: 'phone-call',
        text: 'She told me at the pier she wasn’t finishing the pack. She wanted you to have one blank frame left for an ordinary day years from now—when laughing doesn’t feel like forgetting her.',
      },
    ],
    letter: {
      dateLabel: 'August 30 · Pier Sunset',
      postmark: 'WHITE BORDER · FILM PACK #7',
      salutation: 'Sharpie note behind Frame 7,',
      paragraphs: [
        'You had hair in your eyes and Leo dropped half our crackers through the dock slats. If I could freeze one afternoon and live inside it like a warm coat, it would be this one.',
        'Frame 8 stays blank for you. Do not waste it on a gray day—use it when sunlight hits your kitchen table and you realize you’re still okay.',
      ],
      highlightedClue:
        'She left one unshot Polaroid specifically to give you permission to be happy again after she was gone.',
      signOff: '— Nora',
      threadTitle: 'The Unexposed Frame',
      threadConnection: 'A quiet gift waiting years ahead: permission to laugh without guilt.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Keep the last unused frame safe inside the dark film chamber.',
        companionSpeaker: 'Leo',
        reaction:
          '"Wait until you’re ready," Leo murmurs softly. "No rush at all to spend number eight."',
        closingThought: 'Guilt is the hardest ghost in grief; permission takes time to accept.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Hold Frame 7 of the pier sunset under the warm desk light.',
        companionSpeaker: 'Leo',
        reaction:
          '"Look how bright your eyes were," Leo whispers. "She caught us right before everything changed."',
        closingThought: 'A photograph holds a sunny afternoon that never suspected November.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Close the leather strap gently over the lens until dawn.',
        companionSpeaker: 'Leo',
        reaction:
          '"One day we’ll take that eighth picture," Leo promises quietly. "Maybe at the cove."',
        closingThought: 'Saving space for future joy is not forgetting.',
      },
    ],
    starQuoteId: 'q7-star',
    plateQuoteId: 'q7-plate',
  },
  {
    id: 8,
    roman: 'VIII',
    act: 2,
    actTitle: 'Echoes in Amber',
    seasonLabel: 'AUGUST NIGHTS',
    title: 'Corner Payphone Relay Token',
    keepsakeId: 'payphone-token',
    keepsakeName: 'Corner Payphone Relay Token',
    keepsakeBackInscription: 'NOV 14 · 6:28 PM',
    keepsakeBackDetail:
      'Taped to a folded receipt: "Battery died in my room—ran to the corner payphone just to hear your voicemail greeting."',
    keepsakeTapHint: 'Tap the brass token to hear it ring like steel',
    keepsakeReactionNote: 'A lonely metallic chime rings out—cold coin against booth glass.',
    memoryPlateCaption:
      'You thought the twelve-second static voicemail from last November was a pocket dial—until you found this brass booth token taped to her card.',
    dialogue: [
      {
        speaker: 'Mom',
        channel: 'phone-call',
        text: 'Wait... why is a payphone token taped inside her coat pocket? Didn’t her phone break the week she went into Alder Ward?',
      },
      {
        speaker: 'You',
        channel: 'phone-call',
        text: 'Look at the timestamp on the receipt—November 14, 6:28 PM. Mom... that static voicemail I almost deleted last winter...',
      },
      {
        speaker: 'Mom',
        channel: 'phone-call',
        text: 'It wasn’t a pocket dial, was it? She slipped down to the corner rain shelter in her slippers just to hear your voice say "Leave a message" and breathe into the receiver.',
      },
    ],
    letter: {
      dateLabel: 'November 14 · 6:28 PM',
      postmark: 'RAIN SHELTER BOOTH · INK SMUDGED',
      salutation: 'Written against foggy booth glass,',
      paragraphs: [
        'Didn’t have enough quarters to wait for you to pick up, and my voice felt too thin to survive the wind off the corner.',
        'So I just let the tape roll for twelve seconds so your phone would hold the rain from tonight—and me standing under it, thinking about home.',
      ],
      highlightedClue:
        'That 12-second static voicemail you saved all year was Nora deliberately leaving the sound of her breath on your phone.',
      signOff: '— N.',
      threadTitle: 'The 12-Second Rainy Payphone Voicemail',
      threadConnection: 'Turns an old mysterious static voicemail into her most desperate late-night gesture.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Clench the cold brass token inside your palm until it warms.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom cries quietly across the phone line: "Never delete that voicemail. Never."',
        closingThought: 'Twelve seconds of wind on a recording suddenly sounds louder than a whole symphony.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Line up the 6:28 PM rain receipt beside her hospital admission band.',
        companionSpeaker: 'Mom',
        reaction:
          '"She stood out in the cold just to hear your greeting," Mom whispers in disbelief.',
        closingThought: 'Grief rearranges old mysteries until every blank spot aches with love.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Set the token gently beside the index card and exhale.',
        companionSpeaker: 'Mom',
        reaction:
          '"She heard your voice that night," Mom comforts you softly. "That’s what mattered to her."',
        closingThought: 'At least on that rainy corner, she didn’t feel unheard.',
      },
    ],
    starQuoteId: 'q8-star',
    plateQuoteId: 'q8-plate',
  },

  // ================= ACT III: WHAT WENT UNSAID =================
  {
    id: 9,
    roman: 'IX',
    act: 3,
    actTitle: 'What Went Unsaid',
    seasonLabel: 'AUTUMN RAIN',
    title: 'Kintsugi Mended Mug',
    keepsakeId: 'kintsugi-mug',
    keepsakeName: 'Kintsugi Mended Mug',
    keepsakeBackInscription: 'GOLD SEAM · HANDLE LEFT',
    keepsakeBackDetail:
      'Painted under the glazed base: "Broken things still hold warmth if someone sits with them."',
    keepsakeTapHint: 'Tap the stoneware rim for a quiet ceramic chime',
    keepsakeReactionNote: 'A delicate ceramic ring trembles along the golden resin fracture.',
    memoryPlateCaption:
      'Mom still fills this mended mug when rain taps the roof, then realizes she set two cups on the counter out of habit.',
    dialogue: [
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'Sometimes I still reach into the cupboard and pull down two mugs before turning around to an empty chair. Remember when you broke this on the slate?',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'I grabbed the dustpan crying because I thought I’d ruined her favorite cup. She took the broom out of my hand.',
      },
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'Four hours at the kitchen table gluing every sliver back with gold lacquer. She never believed something cracked had to be thrown in the bin.',
      },
    ],
    letter: {
      dateLabel: 'October 04 · Rainy Sunday',
      postmark: 'CUPBOARD SHELF · RESIN TIN NOTE',
      salutation: 'Card tucked inside the cupboard,',
      paragraphs: [
        'Stop apologizing for dropping porcelain—stoneware cracks when water hits cold ceramic too fast. It happens to hearts too.',
        'The gold seam gives your fingers somewhere honest to grip. Keep drinking out of it after I’m gone; a cupboard full of untouched things is the saddest room in any house.',
      ],
      highlightedClue:
        'She mended the fracture in gold deliberately so you wouldn’t treat brokenness as something shameful to hide.',
      signOff: '— Nora',
      threadTitle: 'Gold Along the Fracture',
      threadConnection: 'Connects her kintsugi repair directly to the cracked stone snow globe in Chapter XV.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Wrap both hands tight around the warm stoneware seam.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom pours hot chamomile into it anyway and slides it to your palm. "Still doesn’t leak a drop," she whispers.',
        closingThought: 'Warmth feels sharpest inside cups you thought couldn’t hold water anymore.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Follow the crooked gold vein from rim to base with your fingertip.',
        companionSpeaker: 'Mom',
        reaction:
          '"We’re all glued together at the seams this year," Mom says with a small, aching smile.',
        closingThought: 'Survival doesn’t look unbroken—it looks mended in quiet gold.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Use the mug on the desk tonight instead of locking it behind glass.',
        companionSpeaker: 'Mom',
        reaction:
          '"She’d be glad to see tea inside it again," Mom nods softly.',
        closingThought: 'Honoring someone can be as simple as using what they loved.',
      },
    ],
    starQuoteId: 'q9-star',
    plateQuoteId: 'q9-plate',
  },
  {
    id: 10,
    roman: 'X',
    act: 3,
    actTitle: 'What Went Unsaid',
    seasonLabel: 'AUTUMN RAIN',
    title: '6:40 Station Ticket Stub',
    keepsakeId: 'ticket-stub',
    keepsakeName: '6:40 Station Ticket Stub',
    keepsakeBackInscription: 'TWO UNUSED TICKETS · 18:40',
    keepsakeBackDetail:
      'Two unpunched Alder Harbor crossing stubs pinned together inside her scarf lining: "For when the fever breaks."',
    keepsakeTapHint: 'Tap the unpunched tickets to reveal the harbor ink',
    keepsakeReactionNote: 'Two crisp unpunched ferry stubs catch the amber lamp—never torn at the gate.',
    memoryPlateCaption:
      'Two unused evening tickets for a harbor trip she bought in October—for a weekend her fever never let arrive.',
    dialogue: [
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'Mom... look inside the hem of her wool scarf. There aren’t torn stubs here—they’re unpunched. Two full tickets to Alder Point.',
      },
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'Oh God. She bought them the first week of October, when the doctor still talked about "getting strength back by Thanksgiving."',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'She packed them in her scarf hoping we’d make the 6:40 boat one rainy evening. We kept saying "next weekend" until there wasn’t one.',
      },
    ],
    letter: {
      dateLabel: 'October 09 · Unpunched Ferry Tickets',
      postmark: 'PIER 3 COUNTER · UNUSED',
      salutation: 'Pencil note clipped to two unpunched tickets,',
      paragraphs: [
        'Bought two round-trip seats for the 6:40 evening crossing even though climbing the stairs wiped me out today. Just wanted something real waiting on the dresser besides pill bottles.',
        'If my chest stays too heavy by Friday, don’t be mad at me for canceling again. Go stand on the deck one sunset anyway and look at the seals for both of us.',
      ],
      highlightedClue:
        'The hardest ache of grief: all the ordinary "next weekends" that vanish silently without warning.',
      signOff: '— N.',
      threadTitle: 'The Unfinished Alder Harbor Trip',
      threadConnection: 'Reveals how fiercely she kept planning mornings ahead even as time ran out.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Press the two unpunched tickets flat inside your palm.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom hides her face against her hands for a long moment. "Nothing hurts quite like plans someone bought tickets for."',
        closingThought: 'Unused tickets are heavier than gravestones.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Look closely at the faint October purchase stamp without turning away.',
        companionSpeaker: 'Mom',
        reaction:
          '"She kept hoping right up to the snow," Mom whispers.',
        closingThought: 'Hope isn’t naive just because winter comes early.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Lay one ticket beside the folded paper boat on the blotter.',
        companionSpeaker: 'Mom',
        reaction:
          '"Take the ferry across next spring," Mom tells you gently. "Stand on deck for her."',
        closingThought: 'Someone else can finish the crossing when the ice breaks.',
      },
    ],
    starQuoteId: 'q10-star',
    plateQuoteId: 'q10-plate',
  },
  {
    id: 11,
    roman: 'XI',
    act: 3,
    actTitle: 'What Went Unsaid',
    seasonLabel: 'AUTUMN RAIN',
    title: '2 AM Wax-Sealed Unsent Letter',
    keepsakeId: 'unsent-letter',
    keepsakeName: '2 AM Wax-Sealed Unsent Letter',
    keepsakeBackInscription: '2:07 AM · DO NOT OPEN TILL AFTER',
    keepsakeBackDetail:
      'Taped beneath the bottom drawer liner: crimson wax cracked with a faint smudge of midnight tears.',
    keepsakeTapHint: 'Tap the crimson wax seal to break it open at last',
    keepsakeReactionNote: 'The crimson seal splits softly—dated three nights before the hospital.',
    memoryPlateCaption:
      'Written at 2:07 AM in total honesty when Nora finally understood she was not coming home from the ward.',
    dialogue: [
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'It was taped underneath the bottom drawer liner of her writing desk. Crimson wax. Addressed simply to me.',
      },
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'I knew she stayed up writing something the night before the ambulance came... I couldn’t bear to read it alone.',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: '"Written at 2:07 AM. Everyone is asleep downstairs and I’m finally quiet enough to admit I am scared of disappearing from your mornings."',
      },
    ],
    letter: {
      dateLabel: 'November 18 · 2:07 AM',
      postmark: 'TAPED UNDER DESK DRAWER · UNMAILED',
      salutation: 'My brave little sister,',
      paragraphs: [
        'I’ve torn up four drafts because every one sounded like a lecture or a sermon, and God knows I’m mostly just twenty-two and terrified of leaving you before you finish growing up.',
        'When the quiet after the funeral finally gets too loud, please don’t lock my bedroom door and turn my sweaters into dust. Open the window, borrow my boots when yours soak through, cry ugly if you need to—and then go make yourself breakfast. You don’t prove you loved me by disappearing with me.',
      ],
      highlightedClue:
        'In her most honest 2 AM confession, she begged you not to turn her memory into a cage that stops your life.',
      signOff: 'Always right beside you, Nora',
      threadTitle: 'What Was Hidden for After the Snow',
      threadConnection: 'Reveals why she hid letters around the room—so you wouldn’t feel completely abandoned in the quiet.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Hold the tear-smudged stationery against your chest until your breathing slows.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom pulls you close beside the desk while the rain ticks against the glass. Neither of you speaks for a long time.',
        closingThought: 'Sometimes the only honest answer to grief is letting yourself break open completely.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Read "You don’t prove you loved me by disappearing with me" three times.',
        companionSpeaker: 'Mom',
        reaction:
          '"She saw straight through how you’ve been hurting this whole year," Mom whispers.',
        closingThought: 'Being known that deeply leaves an echo nothing can erase.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Lay the letter flat under the lamp where the whole room can hold it.',
        companionSpeaker: 'Mom',
        reaction:
          '"She knew we’d be scared to open her drawers," Mom breathes.',
        closingThought: 'Truth written at 2 AM asks for courage in daylight.',
      },
    ],
    starQuoteId: 'q11-star',
    plateQuoteId: 'q11-plate',
  },
  {
    id: 12,
    roman: 'XII',
    act: 3,
    actTitle: 'What Went Unsaid',
    seasonLabel: 'AUTUMN RAIN',
    title: 'Misted Bedroom Sash Window',
    keepsakeId: 'sash-window',
    keepsakeName: 'Misted Bedroom Sash Window',
    keepsakeBackInscription: 'SEALED FOR A WINTER',
    keepsakeBackDetail:
      'Wedged beside the painted wooden sash pin sits a small cream card marked: "Open when first snow hits the glass."',
    keepsakeTapHint: 'Tap the misted pane to wipe clear the winter fog',
    keepsakeReactionNote: 'Your sleeve clears a circle of glass; cold rain air slips through the cracked sash.',
    memoryPlateCaption:
      'For an entire year nobody unlatched her bedroom window—until wiping the fog revealed one more note tucked by the frame.',
    dialogue: [
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'Nobody has cracked this window open since last November. The air in here still smells like dry cedar and hospital wool.',
      },
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'Wait—when you slid the rusted brass pin free, what fell out of the sill groove?',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'A folded cream envelope, damp on one corner from condensation. On the front in Nora’s handwriting: "For when the room gets too stale."',
      },
    ],
    letter: {
      dateLabel: 'November · Inside the Window Groove',
      postmark: 'SASH FRAME · HIDDEN NOTE',
      salutation: 'If you finally unlatched the window,',
      paragraphs: [
        'Good. The air in here always got stuffy whenever people tiptoed past my doorway talking in hospital whispers.',
        'Lean your forehead near the cold screen for five seconds and listen to the rain hitting the gutter outside. The world is still loud, wet, and stubbornly alive—go let some of it inside.',
      ],
      highlightedClue:
        'Unlatching the window lets the stale air of mourning move—exactly as she hoped.',
      signOff: '— N.',
      threadTitle: 'What Was Hidden for After the Snow',
      threadConnection: 'Marks the first shift in the room: cold fresh air replacing locked-up stillness.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Rest your palm against the cold damp glass as rain streaks down outside.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom unhooks the curtain tie completely so grey daylight fills the floorboards. "She’s right," she whispers.',
        closingThought: 'Grief hates cold air at first—until you realize you can finally breathe inside it.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Notice how much brighter the oak desk looks once the fog is wiped clear.',
        companionSpeaker: 'Mom',
        reaction:
          '"Everything in here looked darker with the curtains shut," Mom murmurs.',
        closingThought: 'Light doesn’t erase absence, yet it lets you see what remains intact.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Prop the sash open two inches so autumn rain air moves across the desk.',
        companionSpeaker: 'Mom',
        reaction:
          'A sharp breath of pine and wet leaves sweeps into the room—and neither of you shuts the latch.',
        closingThought: 'Opening a window is how a house learns to live again.',
      },
    ],
    starQuoteId: 'q12-star',
    plateQuoteId: 'q12-plate',
  },

  // ================= ACT IV: WHAT REMAINS =================
  {
    id: 13,
    roman: 'XIII',
    act: 4,
    actTitle: 'What Remains',
    seasonLabel: 'FIRST SNOW',
    title: 'Walnut Music Box',
    keepsakeId: 'music-box',
    keepsakeName: 'Walnut Music Box',
    keepsakeBackInscription: 'PLANT IN CRACKED STONE',
    keepsakeBackDetail:
      'Beneath the red velvet ring tray rests a sealed brown paper seed packet of wild chamomile & marigold.',
    keepsakeTapHint: 'Tap the brass key to play her slow winter waltz',
    keepsakeReactionNote: 'Five tender steel-comb chimes echo across the quiet wooden floor.',
    memoryPlateCaption:
      'Underneath the velvet tray of her walnut music box sits a folded brown packet of wildflower seeds labeled "For first thaw."',
    dialogue: [
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'When she stopped talking those last nights, winding this box was the only thing that settled her hands on the blanket.',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'Wait—did you ever lift the red velvet tray out? There’s a brown seed envelope taped beneath the comb.',
      },
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: '"Wild chamomile & marigold. Plant in cracked stone at first thaw." She didn’t even leave an empty box—she left something waiting to bloom.',
      },
    ],
    letter: {
      dateLabel: 'First Snow · Under Velvet Tray',
      postmark: 'BROWN SEED PACKET · MUSIC BOX BASE',
      salutation: 'Taped under the red felt,',
      paragraphs: [
        'Don’t wait for nice garden soil. Shake these into the gravel crack by the back steps or along the seawall stones at Alder Point when winter breaks.',
        'Every time the little waltz runs down at the end of the spring key, wind it once more if you miss my voice in the hall.',
      ],
      highlightedClue:
        'Even from beneath a music box tray, she planned wildflower seeds to grow through stone in spring.',
      signOff: 'Yours, Nora',
      threadTitle: 'Hospital Drawings & Pressed Chamomile',
      threadConnection: 'Completes the botanical arc from Chapter I: dried mourning blossoms becoming living seeds.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Wind the brass key softly and listen until every final chime dies away.',
        companionSpeaker: 'Mom',
        reaction:
          'Mom leans her forehead briefly against yours while the tiny comb clicks to silence. "I still hear her humming the third bar," she whispers.',
        closingThought: 'A song can hold someone inside a room for thirty gentle seconds.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Count the tiny seeds rattling gently inside the brown paper envelope.',
        companionSpeaker: 'Mom',
        reaction:
          '"First thaw," Mom repeats quietly, tucking the packet safe beside the cedar lid.',
        closingThought: 'Small seeds look dead all winter until rain teaches them otherwise.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Leave the walnut lid propped open so light catches the brass cylinder.',
        companionSpeaker: 'Mom',
        reaction:
          '"It sounds less lonely when the lid stays open," Mom agrees softly.',
        closingThought: 'Even music knows how to rest without pretending it never played.',
      },
    ],
    starQuoteId: 'q13-star',
    plateQuoteId: 'q13-plate',
  },
  {
    id: 14,
    roman: 'XIV',
    act: 4,
    actTitle: 'What Remains',
    seasonLabel: 'FIRST SNOW',
    title: 'Stopped 7:14 Field Watch',
    keepsakeId: 'field-watch',
    keepsakeName: 'Stopped 7:14 Mechanical Field Watch',
    keepsakeBackInscription: '7:14 AM · QUIET SNOW',
    keepsakeBackDetail:
      'The watch stopped on the morning of her last breath while resting on her nightstand beside cold tea.',
    keepsakeTapHint: 'Tap the brass crown to hear the frozen escapement pulse',
    keepsakeReactionNote: 'Four sharp ticks tremble in the quiet—then return softly to 7:14.',
    memoryPlateCaption:
      'Her bedside watch stopped at 7:14 AM—the exact snowy morning the room went completely still.',
    dialogue: [
      {
        speaker: 'Sam',
        channel: 'text-message',
        text: 'Hey... I’ve been thinking about you both packing her room tonight. How are you holding up?',
      },
      {
        speaker: 'You',
        channel: 'text-message',
        text: 'Just picked up her old brass field watch. Still frozen at 7:14. The exact minute snow started outside the hospital window that morning.',
      },
      {
        speaker: 'Sam',
        channel: 'text-message',
        text: 'God. I remember Mom calling me at 7:20 and watching the clock on my stove refuse to move. Take your time tonight, okay? We’re right here.',
      },
    ],
    letter: {
      dateLabel: '7:14 AM · One Winter Ago',
      postmark: 'BEDSIDE NIGHTSTAND · HOSPITAL TAG',
      salutation: 'From Mom’s small notebook kept that morning,',
      paragraphs: [
        '7:14 AM. Snow started falling sideways across the parking lot floodlights right as her fingers loosened in mine.',
        'For an hour afterward neither of us could believe how people in the street below were scraping windshields and walking dogs like the morning hadn’t just torn in half.',
      ],
      highlightedClue:
        '7:14 AM marks the exact moment of loss—and the terrifying ordinary morning that kept arriving after it.',
      signOff: '— Remembered always',
      threadTitle: '7:14 AM · Morning Light Through Cracked Stone',
      threadConnection: 'The emotional center of the entire box: facing the hour everything stopped.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Keep the watch hands untouched at 7:14 inside the velvet slot.',
        companionSpeaker: 'Sam',
        reaction:
          '"Some minutes deserve their own quiet monument," Sam texts back softly.',
        closingThought: '7:14 will never feel like an ordinary morning again—and that’s okay.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Watch how pale snow light falls across the cracked glass face.',
        companionSpeaker: 'Sam',
        reaction:
          '"She wasn’t alone at 7:14," Sam reminds you gently. "Both of you were holding her hands."',
        closingThought: 'Being there at the end hurts forever—yet you would never trade having held her.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Wind the crown gently once so the second hand starts moving past 7:14.',
        companionSpeaker: 'Sam',
        reaction:
          '"Hearing it tick again doesn’t mean leaving her behind," Sam writes gently.',
        closingThought: 'Time starting again is how survival apologizes softly and keeps walking.',
      },
    ],
    starQuoteId: 'q14-star',
    plateQuoteId: 'q14-plate',
  },
  {
    id: 15,
    roman: 'XV',
    act: 4,
    actTitle: 'What Remains',
    seasonLabel: 'FIRST SNOW',
    title: 'Cracked Winter Snow Globe',
    keepsakeId: 'snow-globe',
    keepsakeName: 'Cracked Winter Snow Globe',
    keepsakeBackInscription: 'EVEN THROUGH CRACKED STONE',
    keepsakeBackDetail:
      'Along the dark resin base she painted white chamomile flowers breaking out of split slate.',
    keepsakeTapHint: 'Tap the cracked glass dome to let winter settle slowly',
    keepsakeReactionNote: 'Snowflakes swirl around the tiny brass light; not a drop leaks through the seam.',
    memoryPlateCaption:
      'Cracked during the move home from the service without losing a drop—her own painted wildflowers lining the split stone base.',
    dialogue: [
      {
        speaker: 'Leo',
        channel: 'in-person',
        text: 'I brought this back over because Sam and I couldn’t bear letting you finish the last box alone tonight. Remember when I dropped this on the porch steps the week after the service?',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'I thought the glass shattered for good... then I realized not a drop of water leaked out. Look along the base she painted last winter.',
      },
      {
        speaker: 'Leo',
        channel: 'in-person',
        text: 'Tiny white flowers pushing straight out of grey cracked stone. "Even through cracked stone, a quiet light remains." That was her whole heartbeat in one line.',
      },
    ],
    letter: {
      dateLabel: 'First Snow · Underneath Felt Base',
      postmark: 'PAINTED BASE · TINY BRUSH LETTERS',
      salutation: 'Underneath the dark green felt,',
      paragraphs: [
        'Nothing stays unmarked if it lives through real winter. Glass cracks, voices crack, whole families crack down the middle.',
        'Yet look closely—sometimes the break is the exact line where stubborn small flowers finally find room to reach daylight.',
      ],
      highlightedClue:
        'Her central truth: surviving grief doesn’t mean mending into something unmarked—it means blooming straight through the scar.',
      signOff: '— N.',
      threadTitle: '7:14 AM · Morning Light Through Cracked Stone',
      threadConnection: 'Carries her grief-and-hope philosophy right into the final cedar box.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: 'Cup both hands around the cracked glass dome until every flake rests.',
        companionSpeaker: 'Leo',
        reaction:
          'Leo sits quietly beside you watching the miniature snow drift down. "Not a drop leaked out," he murmurs.',
        closingThought: 'Broken hearts still hold everything they loved without spilling a drop.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: 'Study the tiny white wildflowers Nora painted along the split stone base.',
        companionSpeaker: 'Leo',
        reaction:
          '"Everything she loved grew stubbornly in hard places," Leo whispers.',
        closingThought: 'Wildflowers do not ask stone for permission before blooming.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: 'Place the snow globe gently on the sill where real snowflakes pass outside.',
        companionSpeaker: 'Leo',
        reaction:
          '"Look outside," Leo murmurs softly toward the sash window. "First snow’s finally falling."',
        closingThought: 'Inside and outside the glass, winter feels quieter when shared.',
      },
    ],
    starQuoteId: 'q15-star',
    plateQuoteId: 'q15-plate',
  },
  {
    id: 16,
    roman: 'XVI',
    act: 4,
    actTitle: 'What Remains',
    seasonLabel: 'FIRST SNOW',
    title: 'Cedar Keepsake Box',
    keepsakeId: 'keepsake-box',
    keepsakeName: 'Cedar Keepsake Box',
    keepsakeBackInscription: 'FOR WHEN YOU CAN BREATHE AGAIN',
    keepsakeBackDetail:
      'Beneath the cedar lining rests a thick sealed ivory envelope—Nora’s final letter saved for tonight.',
    keepsakeTapHint: 'Tap the cedar lid to gather every small thing safely inside',
    keepsakeReactionNote: 'Warm cedarwood scent rises beside one final sealed envelope waiting at the bottom.',
    memoryPlateCaption:
      'All sixteen small things gathered safe inside warm cedar—and beneath the tray waits her last letter for the night you finally pack the room.',
    dialogue: [
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: 'All sixteen things, tucked warm and safe inside the cedar box. Look around her bedroom—the shelves aren’t erased. They’re finally resting.',
      },
      {
        speaker: 'You',
        channel: 'in-person',
        text: 'Mom... when I lifted the cedar floor tray to lay the snow globe in, there was one last sealed envelope taped flat to the bottom.',
      },
      {
        speaker: 'Mom',
        channel: 'in-person',
        text: '"Open only on the night you pack my desk." Read it slowly, sweetheart. Take all the time you need—I’m sitting right beside you.',
      },
    ],
    letter: {
      dateLabel: 'November · Unwritten Reply to Nora',
      postmark: 'CEDAR TRAY · BLANK CARD FOR WORDS UNSAID',
      salutation: 'Before you open her final envelope,',
      paragraphs: [
        'People tell you grief fades until it disappears, as if forgetting someone is the goal of surviving them. It isn’t. You still miss her laugh at stop signs, her handwriting on wooden trim, her footsteps coming up the walk.',
        'Yet tonight, for the first time since 7:14 AM, packing the cedar box doesn’t feel like closing a grave—it feels like placing everything sacred in a warm lantern you get to carry forward.',
      ],
      highlightedClue:
        'Packing the box lets you keep her near without staying trapped inside a frozen winter bedroom.',
      signOff: 'Forever carried with us',
      threadTitle: '7:14 AM · Morning Light Through Cracked Stone',
      threadConnection: 'Closes all sixteen keepsakes and opens the final 5-movement Crossing & Epilogue Letter.',
    },
    choices: [
      {
        tone: 'hold',
        label: 'Hold Close',
        sublabel: '"I’ll keep every small thing warm inside me wherever life takes me next."',
        companionSpeaker: 'Mom',
        reaction:
          'Mom lays a dried chamomile blossom beside your wrist as you reach for the last envelope. "That is more than enough, sweetheart."',
        closingThought: 'Holding close doesn’t have to mean drowning; sometimes it just means remembering warmly.',
      },
      {
        tone: 'witness',
        label: 'Quiet Witness',
        sublabel: '"I won’t rush past the ache—I’ll carry both the sorrow and every bright summer whole."',
        companionSpeaker: 'Mom',
        reaction:
          'Mom nods through quiet tears, holding your left hand steady. "Honest, clear, and tender—just like she loved you."',
        closingThought: 'Witnessing loss clearly lets love and sorrow share the same chair.',
      },
      {
        tone: 'letgo',
        label: 'Let Go',
        sublabel: '"I’m opening the window latch and stepping into spring—carrying your light with me."',
        companionSpeaker: 'Mom',
        reaction:
          'Mom kisses the top of your head softly. "Go gently forward. She wanted you alive in the sun."',
        closingThought: 'Letting go isn’t losing them again—it is letting their love stay free.',
      },
    ],
    starQuoteId: 'q16-star',
    plateQuoteId: 'q16-plate',
  },
];

export interface EpilogueVariant {
  title: string;
  toneLabel: string;
  dateLabel: string;
  openingLine: string;
  paragraphs: string[];
  closingSignature: string;
}

export const EPILOGUE_BY_TONE: Record<ToneChoice, EpilogueVariant> = {
  hold: {
    title: 'What You Kept Warm',
    toneLabel: 'Predominant Tone · Hold Close',
    dateLabel: 'Saved at the Bottom of the Cedar Box',
    openingLine: 'My dearest little sister,',
    paragraphs: [
      'If you’re holding this heavy ivory page, it means you finally stood in my bedroom with enough breath in your lungs to pack the small things I couldn’t carry past November. I know how hard you held on this whole year—probably checking the door twice at dusk, probably saving my coat pockets exactly as I left them.',
      'I never wanted my absence to turn into cold stone inside your chest. When you ring that worn chrome bell twice on dark walks home, when you pour tea into the mended gold mug, or touch that 5’4” pencil line you’ve probably grown taller than by now—none of that is clinging. That is just love refusing to let a short life be small.',
      'I am so sorry I couldn’t stay for your winters ahead. Hold what feels warm, cry when the radio catches you off guard, and please keep walking out into the daylight for both of us. Take Frame 8 when your kitchen fills with sun again.',
    ],
    closingSignature: 'Every ounce of love I had, Nora',
  },
  witness: {
    title: 'In the Light That Remained',
    toneLabel: 'Predominant Tone · Quiet Witness',
    dateLabel: 'Saved at the Bottom of the Cedar Box',
    openingLine: 'My dearest little sister,',
    paragraphs: [
      'You always noticed every silent detail nobody else slowed down long enough to read—the hidden clinic dates under chamomile petals, the twelve-second static voicemail, the two unused October ferry tickets waiting in wool.',
      'Thank you for looking honestly at all the unfinished edges of what we lost without hiding them under polite silence. Grief isn’t neat, and dying at twenty-two leaves messy, aching things scattered in drawers. Knowing you sat calmly beside every piece of my life—the flawed, the terrified, and the bright—makes leaving feel a little less lonely.',
      'Spring comes even to broken limestone. Scatter the seeds from under the music box out by Alder Point when snow melts, keep that last Polaroid frame in your pocket, and live wide awake enough for both of us.',
    ],
    closingSignature: 'Always watching out for you, Nora',
  },
  letgo: {
    title: 'Open Windows at Dawn',
    toneLabel: 'Predominant Tone · Let Go',
    dateLabel: 'Saved at the Bottom of the Cedar Box',
    openingLine: 'My dearest little sister,',
    paragraphs: [
      'Look around my room right now—if you unlatched the sash window and let cold rain air wash through all that dust, thank you. A bedroom was never meant to be a sealed vault where you felt guilty for laughing downstairs.',
      'I hid those little keys, firefly lids, and unexposed Polaroid frames across our house because I wanted you to know with certainty that letting my hand go at 7:14 wasn’t abandoning me. Love doesn’t shrink when you walk back out onto Orchard Lane with friends or spend that eighth film frame on a completely ordinary Sunday.',
      'Nothing we shared ever actually ended—it just changed rooms, from the hallway beside the measuring trim into the quiet amber light you carry everywhere next. Go live a long, sunlit life without apologizing to ghosts.',
    ],
    closingSignature: 'Free and forever yours, Nora',
  },
};

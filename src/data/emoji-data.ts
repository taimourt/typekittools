export interface EmojiRecord {
  char: string;
  name: string;
  category: "smileys" | "people" | "gestures" | "hearts" | "food" | "animals" | "travel" | "objects";
  keywords: string[];
  supportsSkinTone?: boolean;
}

export interface EmojiCategoryMeta {
  slug: EmojiRecord["category"];
  name: string;
  description: string;
  iconChar: string;
}

export const EMOJI_CATEGORIES: EmojiCategoryMeta[] = [
  {
    slug: "smileys",
    name: "Smileys & Faces",
    description: "Happy, laughing, thoughtful, and expressive smiley face emojis.",
    iconChar: "😀",
  },
  {
    slug: "gestures",
    name: "Hand Gestures & Body",
    description: "Thumbs up, peace signs, clapping, and hand signals with skin tones.",
    iconChar: "👍",
  },
  {
    slug: "hearts",
    name: "Hearts & Love",
    description: "Coloured hearts, sparkles, stars, and emotional love symbols.",
    iconChar: "❤️",
  },
  {
    slug: "people",
    name: "People & Roles",
    description: "Professions, roles, family sequences, and avatars.",
    iconChar: "👩‍💻",
  },
  {
    slug: "food",
    name: "Food & Drink",
    description: "Fruits, vegetables, prepared meals, coffee, and dessert emojis.",
    iconChar: "🍕",
  },
  {
    slug: "animals",
    name: "Animals & Nature",
    description: "Mammals, birds, reptiles, marine life, and nature symbols.",
    iconChar: "🐶",
  },
  {
    slug: "travel",
    name: "Travel & Places",
    description: "Vehicles, buildings, landscapes, maps, and world landmarks.",
    iconChar: "🚀",
  },
  {
    slug: "objects",
    name: "Objects & Technology",
    description: "Computers, tools, stationery, musical instruments, and games.",
    iconChar: "💻",
  },
];

export const EMOJI_DATA: EmojiRecord[] = [
  // Smileys
  { char: "😀", name: "Grinning Face", category: "smileys", keywords: ["happy", "smile", "grin"] },
  { char: "😃", name: "Grinning Face with Big Eyes", category: "smileys", keywords: ["happy", "joy"] },
  { char: "😄", name: "Grinning Face with Smiling Eyes", category: "smileys", keywords: ["laugh", "happy"] },
  { char: "😁", name: "Beaming Face with Smiling Eyes", category: "smileys", keywords: ["cheer", "teeth"] },
  { char: "😆", name: "Grinning Squinting Face", category: "smileys", keywords: ["laugh", "lol"] },
  { char: "😅", name: "Grinning Face with Sweat", category: "smileys", keywords: ["hot", "nervous"] },
  { char: "🤣", name: "Rolling on the Floor Laughing", category: "smileys", keywords: ["rofl", "lol", "laugh"] },
  { char: "😂", name: "Face with Tears of Joy", category: "smileys", keywords: ["cry", "tears", "laugh"] },
  { char: "🙂", name: "Slightly Smiling Face", category: "smileys", keywords: ["smile", "ok"] },
  { char: "🙃", name: "Upside-Down Face", category: "smileys", keywords: ["silly", "irony"] },
  { char: "😉", name: "Winking Face", category: "smileys", keywords: ["wink", "flirt"] },
  { char: "😊", name: "Smiling Face with Smiling Eyes", category: "smileys", keywords: ["warm", "blush"] },
  { char: "😇", name: "Smiling Face with Halo", category: "smileys", keywords: ["angel", "innocent"] },
  { char: "🥰", name: "Smiling Face with Hearts", category: "smileys", keywords: ["love", "crush", "hearts"] },
  { char: "😍", name: "Heart Eyes", category: "smileys", keywords: ["love", "heart", "eyes"] },
  { char: "🤩", name: "Star-Struck", category: "smileys", keywords: ["star", "excited", "wow"] },
  { char: "😘", name: "Face Blowing a Kiss", category: "smileys", keywords: ["kiss", "love"] },
  { char: "😋", name: "Face Savoring Food", category: "smileys", keywords: ["yum", "delicious"] },
  { char: "😎", name: "Smiling Face with Sunglasses", category: "smileys", keywords: ["cool", "shades"] },
  { char: "🤓", name: "Nerd Face", category: "smileys", keywords: ["geek", "smart", "glasses"] },
  { char: "🧐", name: "Face with Monocle", category: "smileys", keywords: ["inspect", "curious"] },
  { char: "🥳", name: "Partying Face", category: "smileys", keywords: ["party", "celebrate", "birthday"] },
  { char: "🤔", name: "Thinking Face", category: "smileys", keywords: ["think", "hmm", "ponder"] },
  { char: "🤫", name: "Shushing Face", category: "smileys", keywords: ["quiet", "secret", "shh"] },
  { char: "🤭", name: "Face with Hand Over Mouth", category: "smileys", keywords: ["gasp", "shock"] },
  { char: "🤗", name: "Hugging Face", category: "smileys", keywords: ["hug", "open"] },
  { char: "😴", name: "Sleeping Face", category: "smileys", keywords: ["sleep", "tired", "zzz"] },

  // Gestures (with skin tone support)
  { char: "👍", name: "Thumbs Up", category: "gestures", keywords: ["approve", "ok", "yes", "like"], supportsSkinTone: true },
  { char: "👎", name: "Thumbs Down", category: "gestures", keywords: ["disapprove", "no", "bad"], supportsSkinTone: true },
  { char: "👌", name: "OK Hand", category: "gestures", keywords: ["perfect", "good"], supportsSkinTone: true },
  { char: "✌️", name: "Victory Hand", category: "gestures", keywords: ["peace", "v"], supportsSkinTone: true },
  { char: "🤞", name: "Crossed Fingers", category: "gestures", keywords: ["luck", "hope"], supportsSkinTone: true },
  { char: "🤟", name: "Love-You Gesture", category: "gestures", keywords: ["ily", "rock"], supportsSkinTone: true },
  { char: "🤘", name: "Sign of the Horns", category: "gestures", keywords: ["rock", "metal"], supportsSkinTone: true },
  { char: "🤙", name: "Call Me Hand", category: "gestures", keywords: ["shaka", "hang loose"], supportsSkinTone: true },
  { char: "👏", name: "Clapping Hands", category: "gestures", keywords: ["applause", "bravo"], supportsSkinTone: true },
  { char: "🙌", name: "Raising Hands", category: "gestures", keywords: ["celebrate", "praise"], supportsSkinTone: true },
  { char: "👐", name: "Open Hands", category: "gestures", keywords: ["hug"], supportsSkinTone: true },
  { char: "🤝", name: "Handshake", category: "gestures", keywords: ["agreement", "deal", "meeting"] },
  { char: "🙏", name: "Folded Hands", category: "gestures", keywords: ["please", "thank you", "pray"], supportsSkinTone: true },
  { char: "💪", name: "Flexed Biceps", category: "gestures", keywords: ["strong", "workout", "muscle"], supportsSkinTone: true },
  { char: "👋", name: "Waving Hand", category: "gestures", keywords: ["wave", "hello", "goodbye"], supportsSkinTone: true },
  { char: "✋", name: "Raised Hand", category: "gestures", keywords: ["high five", "stop"], supportsSkinTone: true },
  { char: "👊", name: "Fist Bump", category: "gestures", keywords: ["punch", "fist"], supportsSkinTone: true },

  // Hearts
  { char: "❤️", name: "Red Heart", category: "hearts", keywords: ["love", "romance"] },
  { char: "🧡", name: "Orange Heart", category: "hearts", keywords: ["orange", "warmth"] },
  { char: "💛", name: "Yellow Heart", category: "hearts", keywords: ["friendship", "gold"] },
  { char: "💚", name: "Green Heart", category: "hearts", keywords: ["nature", "envy"] },
  { char: "💙", name: "Blue Heart", category: "hearts", keywords: ["loyalty", "cold"] },
  { char: "💜", name: "Purple Heart", category: "hearts", keywords: ["royalty", "compassion"] },
  { char: "🖤", name: "Black Heart", category: "hearts", keywords: ["dark", "grief"] },
  { char: "🤍", name: "White Heart", category: "hearts", keywords: ["pure", "peace"] },
  { char: "🤎", name: "Brown Heart", category: "hearts", keywords: ["earth", "chocolate"] },
  { char: "💔", name: "Broken Heart", category: "hearts", keywords: ["heartbreak", "sad"] },
  { char: "💖", name: "Sparkling Heart", category: "hearts", keywords: ["sparkle", "special"] },
  { char: "✨", name: "Sparkles", category: "hearts", keywords: ["stars", "clean", "magic"] },
  { char: "🔥", name: "Fire", category: "hearts", keywords: ["lit", "hot", "trending"] },
  { char: "⭐", name: "Star", category: "hearts", keywords: ["favorite", "gold"] },

  // People
  { char: "👩‍💻", name: "Woman Technologist", category: "people", keywords: ["coder", "software", "developer", "woman"] },
  { char: "👨‍💻", name: "Man Technologist", category: "people", keywords: ["coder", "software", "developer", "man"] },
  { char: "🧑‍🚀", name: "Astronaut", category: "people", keywords: ["space", "nasa"] },
  { char: "🕵️", name: "Detective", category: "people", keywords: ["spy", "investigate"] },
  { char: "🧑‍🏫", name: "Teacher", category: "people", keywords: ["school", "education"] },
  { char: "🧑‍⚕️", name: "Health Worker", category: "people", keywords: ["doctor", "nurse"] },

  // Food
  { char: "🍕", name: "Pizza", category: "food", keywords: ["cheese", "slice", "italian"] },
  { char: "🍔", name: "Hamburger", category: "food", keywords: ["burger", "fast food"] },
  { char: "🍟", name: "French Fries", category: "food", keywords: ["chips", "potato"] },
  { char: "🌮", name: "Taco", category: "food", keywords: ["mexican", "wrap"] },
  { char: "🍣", name: "Sushi", category: "food", keywords: ["japanese", "fish"] },
  { char: "☕", name: "Coffee", category: "food", keywords: ["caffeine", "tea", "espresso"] },
  { char: "🍺", name: "Beer Mug", category: "food", keywords: ["drink", "alcohol"] },
  { char: "🍩", name: "Doughnut", category: "food", keywords: ["donut", "sweet"] },

  // Animals
  { char: "🐶", name: "Dog Face", category: "animals", keywords: ["puppy", "pet"] },
  { char: "🐱", name: "Cat Face", category: "animals", keywords: ["kitten", "pet"] },
  { char: "🦊", name: "Fox Face", category: "animals", keywords: ["clever", "nature"] },
  { char: "🐻", name: "Bear Face", category: "animals", keywords: ["grizzly", "wild"] },
  { char: "🐼", name: "Panda Face", category: "animals", keywords: ["bamboo", "china"] },
  { char: "🦁", name: "Lion Face", category: "animals", keywords: ["king", "safari"] },
  { char: "🐯", name: "Tiger Face", category: "animals", keywords: ["wild", "cat"] },
  { char: "🦄", name: "Unicorn", category: "animals", keywords: ["fantasy", "magic"] },

  // Travel
  { char: "🚀", name: "Rocket", category: "travel", keywords: ["space", "launch", "fast"] },
  { char: "✈️", name: "Airplane", category: "travel", keywords: ["flight", "vacation"] },
  { char: "🚗", name: "Automobile", category: "travel", keywords: ["car", "drive"] },
  { char: "🚆", name: "Train", category: "travel", keywords: ["railway", "commute"] },
  { char: "🚢", name: "Ship", category: "travel", keywords: ["cruise", "boat"] },
  { char: "🏖️", name: "Beach with Umbrella", category: "travel", keywords: ["summer", "vacation"] },
  { char: "🗽", name: "Statue of Liberty", category: "travel", keywords: ["new york", "usa"] },

  // Objects
  { char: "💻", name: "Laptop Computer", category: "objects", keywords: ["pc", "mac", "work"] },
  { char: "📱", name: "Mobile Phone", category: "objects", keywords: ["iphone", "android"] },
  { char: "⌨️", name: "Keyboard", category: "objects", keywords: ["type", "input"] },
  { char: "🖱️", name: "Computer Mouse", category: "objects", keywords: ["click"] },
  { char: "🕹️", name: "Joystick", category: "objects", keywords: ["game", "arcade"] },
  { char: "🎧", name: "Headphones", category: "objects", keywords: ["music", "audio"] },
  { char: "🔒", name: "Locked", category: "objects", keywords: ["security", "password", "safe"] },
  { char: "🔑", name: "Key", category: "objects", keywords: ["unlock", "access"] },
];


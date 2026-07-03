export const todayKey = () => new Date().toISOString().slice(0, 10);

export const categories = [
  { id: "morning", label: "Morning Routine", icon: "Sunrise", tone: "gold" },
  { id: "brain", label: "Brain Missions", icon: "Brain", tone: "cyan" },
  { id: "home", label: "Home Missions", icon: "Home", tone: "green" },
  { id: "life", label: "Life Missions", icon: "HeartHandshake", tone: "pink" },
  { id: "outside", label: "Outside Time", icon: "Trees", tone: "lime" }
];

export const rewards = [
  { id: "starbucks", name: "Starbucks card", price: 220, icon: "Coffee", flavor: "Treat run" },
  { id: "playstation", name: "PlayStation card", price: 680, icon: "Gamepad2", flavor: "Power-up fund", favoriteFor: "alex" },
  { id: "apple", name: "Apple card", price: 760, icon: "BadgeDollarSign", flavor: "Tech stash" },
  { id: "music", name: "Pick music in the car", price: 80, icon: "Music2", flavor: "Aux commander" },
  { id: "takeout", name: "Pick takeout", price: 450, icon: "Pizza", flavor: "Dinner boss" },
  { id: "mom-date", name: "Restaurant with mom", price: 520, icon: "Utensils", flavor: "VIP table" },
  { id: "dad-date", name: "Restaurant with dad", price: 520, icon: "UtensilsCrossed", flavor: "Champion meal" },
  { id: "doordash", name: "DoorDash", price: 620, icon: "Bike", flavor: "Delivery unlocked" },
  { id: "device-day", name: "Device day", price: 900, icon: "TabletSmartphone", flavor: "Legendary reward" },
  { id: "chocolate", name: "Chocolate", price: 120, icon: "Candy", flavor: "Sweet loot" },
  { id: "climbing", name: "Rock climbing", price: 720, icon: "Mountain", flavor: "Adventure token" },
  { id: "movie", name: "Movie night", price: 360, icon: "Clapperboard", flavor: "Family premiere" },
  { id: "bubble-tea", name: "Bubble tea", price: 240, icon: "CupSoda", flavor: "Mystery sip", favoriteFor: "katya" },
  { id: "roblox", name: "Roblox reward", price: 540, icon: "Gem", flavor: "Avatar upgrade", favoriteFor: "katya" },
  { id: "shopping", name: "Shopping reward", price: 820, icon: "ShoppingBag", flavor: "Style quest", favoriteFor: "katya" },
  { id: "sephora", name: "Sephora reward", price: 880, icon: "Sparkles", flavor: "Glow loot", favoriteFor: "katya" }
];

const missionSets = {
  alex: {
    morning: [["Brush teeth", "Clean start bonus"], ["Get dressed", "Ready gear equipped"], ["Make bed", "Room base restored"], ["Eat breakfast", "Energy bar full"], ["Prepare bag", "No-forgotten-items shield"], ["Be ready on time", "Speed round"]],
    brain: [["Math practice", "Beat the number boss"], ["Reading", "15-minute focus quest"], ["Typing", "Accuracy streak"], ["Learning activity", "Skill upgrade"], ["Creative challenge", "Design a level idea"]],
    home: [["Clean room", "Reset the arena"], ["Put laundry away", "Inventory sorted"], ["Help with dishes", "Team assist"], ["Tidy desk", "Battle station clear"], ["Organize toys/items", "Loot sorted"]],
    life: [["Kindness task", "Positive XP only"], ["Responsibility task", "Captain move"], ["Help sibling", "Team boost"], ["No arguing challenge", "Calm combo"], ["Try something difficult", "Bravery round"]],
    outside: [["Walk", "Fresh air checkpoint"], ["Bike/scooter", "Speed lap"], ["Playground", "Movement quest"], ["Sports", "Power training"], ["Fresh air challenge", "Outside XP"]]
  },
  katya: {
    morning: [["Brush teeth", "Minty clue found"], ["Get dressed", "Outfit case solved"], ["Make bed", "Cozy scene restored"], ["Eat breakfast", "Detective fuel"], ["Prepare bag", "Secret supplies packed"], ["Be ready on time", "Clock mystery cracked"]],
    brain: [["Math practice", "Number clues"], ["Reading", "Story portal"], ["Typing", "Secret code practice"], ["Learning activity", "New clue unlocked"], ["Creative challenge", "Draw a tiny mystery"]],
    home: [["Clean room", "Evidence organized"], ["Put laundry away", "Closet case"], ["Help with dishes", "Kitchen clue"], ["Tidy desk", "Case board clear"], ["Organize toys/items", "Tiny shop restock"]],
    life: [["Kindness task", "Sparkle kindness"], ["Responsibility task", "Trust token"], ["Help sibling", "Team clue"], ["No arguing challenge", "Peace spell"], ["Try something difficult", "Bravery badge charge"]],
    outside: [["Walk", "Moon path walk"], ["Bike/scooter", "Mystery ride"], ["Playground", "Fresh air sparkle"], ["Sports", "Energy charm"], ["Fresh air challenge", "Outdoor clue"]]
  }
};

const makeMissions = (childId) =>
  Object.entries(missionSets[childId]).flatMap(([category, missions]) =>
    missions.map(([title, subtitle], index) => ({
      id: `${childId}-${category}-${index}`,
      category,
      title,
      subtitle,
      xp: 35 + index * 8 + (category === "life" ? 10 : 0),
      coins: 15 + index * 5 + (category === "outside" ? 5 : 0)
    }))
  );

export const seedChildren = {
  alex: {
    id: "alex",
    name: "Alex",
    age: 12,
    theme: "alex",
    title: "XP Battle Captain",
    avatar: "AX",
    coins: 340,
    xp: 1280,
    level: 7,
    dailyStreak: 5,
    weeklyStreak: 2,
    perfectWeeks: 1,
    weeklyChallenge: "Win 24 missions before Sunday to unlock the Boss Week badge.",
    badges: [
      { id: "combo", name: "Combo Runner", icon: "Zap", unlocked: true },
      { id: "boss", name: "Boss Week", icon: "Trophy", unlocked: true },
      { id: "focus", name: "Focus Mode", icon: "Target", unlocked: false },
      { id: "legend", name: "Legend Streak", icon: "Flame", unlocked: false }
    ],
    missions: makeMissions("alex")
  },
  katya: {
    id: "katya",
    name: "Katya",
    age: 10,
    theme: "katya",
    title: "Mystery Mission Detective",
    avatar: "KY",
    coins: 410,
    xp: 960,
    level: 6,
    dailyStreak: 4,
    weeklyStreak: 2,
    perfectWeeks: 0,
    weeklyChallenge: "Solve 20 clue cards this week to open the Moonlight Bonus chest.",
    badges: [
      { id: "clue", name: "Clue Collector", icon: "Search", unlocked: true },
      { id: "spark", name: "Sparkle Sprint", icon: "Sparkles", unlocked: true },
      { id: "moon", name: "Moonlight Bonus", icon: "MoonStar", unlocked: false },
      { id: "shop", name: "Reward Finder", icon: "Gem", unlocked: false }
    ],
    missions: makeMissions("katya")
  }
};

export const createInitialState = () => ({
  activeDate: todayKey(),
  mode: "weekday",
  reducedMotion: false,
  soundEnabled: false,
  children: seedChildren,
  completed: {},
  claimedRewards: [],
  rewardRequests: []
});

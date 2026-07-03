import { createInitialState, todayKey } from "../data/seedData";

export const xpForNextLevel = (level) => 500 + level * 180;

export function completedForChild(state, childId, date = state.activeDate) {
  return state.completed?.[date]?.[childId] || [];
}

export function childStats(state, childId) {
  const child = state.children[childId];
  const completedIds = completedForChild(state, childId);
  const completedMissions = child.missions.filter((mission) => completedIds.includes(mission.id));
  const possibleCoins = child.missions.reduce((sum, mission) => sum + mission.coins, 0);
  const earnedToday = completedMissions.reduce((sum, mission) => sum + mission.coins, 0);
  const completion = Math.round((completedIds.length / child.missions.length) * 100);
  const nextLevelXp = xpForNextLevel(child.level);

  return {
    completedIds,
    completedMissions,
    completion,
    earnedToday,
    possibleCoins,
    nextLevelXp,
    xpProgress: Math.min(100, Math.round((child.xp / nextLevelXp) * 100))
  };
}

export function completeMission(state, childId, missionId) {
  const date = state.activeDate || todayKey();
  const child = state.children[childId];
  const mission = child.missions.find((item) => item.id === missionId);
  const completedIds = completedForChild(state, childId, date);
  if (!mission || completedIds.includes(missionId)) return { state, milestone: null };

  const nextCompleted = [...completedIds, missionId];
  const nextXp = child.xp + mission.xp;
  const threshold = xpForNextLevel(child.level);
  const leveledUp = nextXp >= threshold;
  const categoryComplete = child.missions
    .filter((item) => item.category === mission.category)
    .every((item) => nextCompleted.includes(item.id));
  const perfectDay = nextCompleted.length === child.missions.length;

  const nextState = {
    ...state,
    completed: {
      ...state.completed,
      [date]: {
        ...(state.completed?.[date] || {}),
        [childId]: nextCompleted
      }
    },
    children: {
      ...state.children,
      [childId]: {
        ...child,
        coins: child.coins + mission.coins,
        xp: leveledUp ? nextXp - threshold : nextXp,
        level: leveledUp ? child.level + 1 : child.level,
        dailyStreak: perfectDay ? child.dailyStreak + 1 : child.dailyStreak,
        perfectWeeks: perfectDay && child.dailyStreak > 0 && (child.dailyStreak + 1) % 7 === 0 ? child.perfectWeeks + 1 : child.perfectWeeks,
        badges: child.badges.map((badge) => {
          if (badge.id === "focus" && childId === "alex" && categoryComplete) return { ...badge, unlocked: true };
          if (badge.id === "moon" && childId === "katya" && categoryComplete) return { ...badge, unlocked: true };
          if (badge.id === "legend" && childId === "alex" && perfectDay) return { ...badge, unlocked: true };
          if (badge.id === "shop" && childId === "katya" && perfectDay) return { ...badge, unlocked: true };
          return badge;
        })
      }
    }
  };

  let milestone = "mission";
  if (perfectDay) milestone = "perfect-day";
  else if (leveledUp) milestone = "level";
  else if (categoryComplete) milestone = "category";

  return { state: nextState, milestone };
}

export function claimReward(state, childId, reward) {
  const child = state.children[childId];
  if (!child || child.coins < reward.price) return { state, claimed: false };

  return {
    claimed: true,
    state: {
      ...state,
      children: {
        ...state.children,
        [childId]: {
          ...child,
          coins: child.coins - reward.price
        }
      },
      claimedRewards: [
        {
          id: `${reward.id}-${Date.now()}`,
          childId,
          rewardId: reward.id,
          name: reward.name,
          price: reward.price,
          date: new Date().toLocaleString()
        },
        ...state.claimedRewards
      ],
      rewardRequests: [
        {
          id: `request-${reward.id}-${Date.now()}`,
          childId,
          text: `${child.name} claimed ${reward.name}`,
          status: "new",
          date: new Date().toLocaleString()
        },
        ...state.rewardRequests
      ]
    }
  };
}

export function resetToday(state) {
  const date = state.activeDate || todayKey();
  const nextCompleted = { ...(state.completed || {}) };
  delete nextCompleted[date];
  return { ...state, completed: nextCompleted };
}

export function resetAll() {
  return createInitialState();
}

export function addDemoMission(state) {
  const id = `demo-${Date.now()}`;
  const mission = {
    id,
    category: "life",
    title: "Bonus family mission",
    subtitle: "Parent-added challenge",
    xp: 90,
    coins: 55
  };

  return {
    ...state,
    children: Object.fromEntries(
      Object.entries(state.children).map(([childId, child]) => [
        childId,
        {
          ...child,
          missions: [...child.missions, { ...mission, id: `${id}-${childId}` }]
        }
      ])
    )
  };
}

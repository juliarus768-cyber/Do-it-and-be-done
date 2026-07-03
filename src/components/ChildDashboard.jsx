import { CalendarDays, Coins, Flame, Gift, KeyRound, ShieldCheck, Sparkles, Swords, Trophy } from "lucide-react";
import { childStats } from "../utils/gameLogic";
import BadgeShelf from "./BadgeShelf";
import MissionCard from "./MissionCard";
import ProgressRing from "./ProgressRing";
import { Icon } from "./iconMap.jsx";

const themeConfig = {
  alex: {
    pet: "cat",
    room: "neon-rpg-room",
    sceneTitle: "Neon RPG Command Center",
    sceneCopy: "Byte Cat is guarding the quest path. Charge the XP core, claim gear slots, and keep the streak reactor alive.",
    featureTitle: "Gear slots",
    featureIcon: Swords,
    features: ["Pulse Blade", "Shield Core", "XP Boots", "Boss Token"],
    unlockTitle: "Arena unlock",
    unlockCopy: "Claim 5 quests to light up the next battle gate."
  },
  katya: {
    pet: "dog",
    room: "cozy-mystery-room",
    sceneTitle: "Cozy Mystery Room",
    sceneCopy: "Mochi Dog found a clue under the moon rug. Claim quests to fill the sticker book and open tiny mystery boxes.",
    featureTitle: "Sticker book",
    featureIcon: KeyRound,
    features: ["Moon Sticker", "Bubble Key", "Mini-game Star", "Mystery Box"],
    unlockTitle: "Magic box unlock",
    unlockCopy: "Claim 5 quests to reveal the next surprise card."
  }
};

function PetScene({ type }) {
  return (
    <div className={`room-pet ${type}`} aria-hidden="true">
      <span className="pet-ear left" />
      <span className="pet-ear right" />
      <span className="pet-face"><i /><i /><b /></span>
      <span className="pet-tail" />
    </div>
  );
}

export default function ChildDashboard({ child, state, categories, rewards, handlers }) {
  const stats = childStats(state, child.id);
  const config = themeConfig[child.id];
  const FeatureIcon = config.featureIcon;
  const previewRewards = rewards
    .filter((reward) => !reward.favoriteFor || reward.favoriteFor === child.id)
    .sort((a, b) => Math.abs(child.coins - a.price) - Math.abs(child.coins - b.price))
    .slice(0, 3);
  const questPath = child.missions.slice(0, 10);

  return (
    <div className={`game-room-shell ${config.room}`}>
      <section className="room-hero">
        <div className="room-hero-copy">
          <span className="profile-kicker">{child.title}</span>
          <h1>{child.name}'s Adventure Hub</h1>
          <p>{config.sceneCopy}</p>
          <div className="room-stat-row">
            <span><Coins size={18} /> {child.coins} coins</span>
            <span><Flame size={18} /> {child.dailyStreak} day streak</span>
            <span><Trophy size={18} /> Level {child.level}</span>
          </div>
        </div>

        <div className="room-illustration">
          <div className="room-window" />
          <div className="hero-stand">{child.avatar}</div>
          <PetScene type={config.pet} />
          <span className="floor-shadow" />
        </div>
      </section>

      <section className="quest-command-strip">
        <ProgressRing value={stats.completion} label="today" size={118} />
        <div className="xp-console">
          <div className="section-heading"><span>XP charge</span><small>{child.xp}/{stats.nextLevelXp} XP</small></div>
          <div className="xp-bar"><span style={{ width: `${stats.xpProgress}%` }} /></div>
          <p>{stats.completedIds.length} quests claimed today. Keep the path glowing.</p>
        </div>
        <div className="streak-console">
          <Flame size={30} />
          <strong>{child.dailyStreak}</strong>
          <span>day streak</span>
        </div>
      </section>

      <section className="event-banner">
        <Sparkles size={24} />
        <div><strong>Seasonal Event: Summer Quest Board</strong><span>{config.unlockCopy}</span></div>
        <button className="ghost-button" type="button">View gates</button>
      </section>

      <section className="daily-quest-map">
        <div className="quest-map-header">
          <div><span className="profile-kicker">Daily Quest Path</span><h2>Follow the glowing route</h2></div>
          <span>{stats.completedIds.length}/{child.missions.length} claimed</span>
        </div>
        <div className="quest-path-line" aria-hidden="true" />
        <div className="quest-node-list">
          {questPath.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              step={index + 1}
              completed={stats.completedIds.includes(mission.id)}
              onComplete={() => handlers.completeMission(child.id, mission.id)}
            />
          ))}
        </div>
      </section>

      <aside className="game-side-panels">
        <section className="side-game-card feature-slots">
          <div className="section-heading"><span>{config.featureTitle}</span><small><FeatureIcon size={14} /> loadout</small></div>
          <div className="slot-grid">{config.features.map((item, index) => <span key={item} className={index < 2 ? "unlocked" : "locked"}>{item}</span>)}</div>
        </section>

        <section className="side-game-card unlock-card">
          <div className="mystery-chest"><ShieldCheck size={34} /></div>
          <div><strong>{config.unlockTitle}</strong><p>{config.unlockCopy}</p></div>
        </section>

        <section className="side-game-card treasure-preview">
          <div className="section-heading"><span>Treasure preview</span><small><Gift size={14} /> store</small></div>
          {previewRewards.map((reward) => (
            <div className="preview-reward" key={reward.id}><Icon name={reward.icon} /><div><strong>{reward.name}</strong><span>{reward.price} coins</span></div></div>
          ))}
        </section>

        <BadgeShelf badges={child.badges} />

        <section className="side-game-card daily-card">
          <CalendarDays size={24} />
          <strong>Perfect Week Bonus</strong>
          <p>Claim every quest for seven full days to earn the rare Perfect Week badge.</p>
        </section>
      </aside>

      <section className="quest-zone-dock">
        {categories.map((category) => {
          const group = child.missions.filter((mission) => mission.category === category.id);
          const completeCount = group.filter((mission) => stats.completedIds.includes(mission.id)).length;
          return (
            <div className="zone-chip" key={category.id}>
              <Icon name={category.icon} />
              <span>{category.label.replace("Missions", "Quests").replace("Routine", "Launch")}</span>
              <strong>{completeCount}/{group.length}</strong>
            </div>
          );
        })}
      </section>
    </div>
  );
}

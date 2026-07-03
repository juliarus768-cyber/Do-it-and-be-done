import { CalendarDays, Coins, Flame, Gamepad2, Gift, ShieldCheck, Sparkles, Swords, Trophy } from "lucide-react";
import { childStats } from "../utils/gameLogic";
import BadgeShelf from "./BadgeShelf";
import MissionCard from "./MissionCard";
import ProgressRing from "./ProgressRing";
import { Icon } from "./iconMap.jsx";

const companionByChild = {
  alex: { type: "cat", name: "Byte Cat", card: "Gear / weapons preview", items: ["Pulse Blade", "Shield Pack", "XP Boots"] },
  katya: { type: "dog", name: "Mochi Dog", card: "Mystery box preview", items: ["Sticker Drop", "Mini-game Key", "Moon Box"] }
};

export default function ChildDashboard({ child, state, categories, rewards, handlers }) {
  const stats = childStats(state, child.id);
  const companion = companionByChild[child.id];
  const previewRewards = rewards.filter((reward) => !reward.favoriteFor || reward.favoriteFor === child.id).sort((a, b) => Math.abs(child.coins - a.price) - Math.abs(child.coins - b.price)).slice(0, 3);

  return (
    <div className="dashboard-grid adventure-hub">
      <section className="child-hero game-hero"><div className="hero-id"><div className={`companion-scene ${companion.type}-scene`}><div className="large-avatar">{child.avatar}</div><div className="companion-blob">{companion.type.toUpperCase()}</div></div><div><span className="profile-kicker">{child.title}</span><h1>{child.name}'s Adventure Hub</h1><p>{child.weeklyChallenge}</p></div></div><div className="hero-metrics premium-metrics"><ProgressRing value={stats.completion} label="today" /><div className="stat-stack"><span><Coins size={18} /> {child.coins} coins</span><span><Flame size={18} /> {child.dailyStreak} streak</span><span><Trophy size={18} /> Level {child.level}</span></div></div></section>
      <section className="season-banner"><div><Sparkles size={22} /><strong>Seasonal Event</strong><span>Clear 12 quests this week to open the bonus chest.</span></div><button className="ghost-button" type="button">Preview pass</button></section>
      <section className="panel xp-panel"><div className="section-heading"><span>XP charge</span><small>{child.xp}/{stats.nextLevelXp} XP</small></div><div className="xp-bar"><span style={{ width: `${stats.xpProgress}%` }} /></div><div className="challenge-strip"><ShieldCheck size={20} /><strong>Quest combo</strong><span>{stats.completedIds.length} quests claimed today</span></div></section>
      <section className="missions-board">{categories.map((category) => { const group = child.missions.filter((mission) => mission.category === category.id); const completeCount = group.filter((mission) => stats.completedIds.includes(mission.id)).length; return <div className={`mission-group tone-${category.tone}`} key={category.id}><div className="mission-group-head"><div><Icon name={category.icon} /><h3>{category.label.replace("Missions", "Quests").replace("Routine", "Launch")}</h3></div><span>{completeCount}/{group.length} claimed</span></div><div className="mission-list">{group.map((mission) => <MissionCard key={mission.id} mission={mission} completed={stats.completedIds.includes(mission.id)} onComplete={() => handlers.completeMission(child.id, mission.id)} />)}</div></div>; })}</section>
      <aside className="side-rail"><section className="panel companion-card"><div className="section-heading"><span>{companion.name}</span><small>companion</small></div><div className={`companion-large ${companion.type}-scene`}>{companion.type.toUpperCase()}</div><p>{child.id === "alex" ? "Boosts streak battles and keeps the neon command deck warm." : "Finds clue cards, cozy stickers, and tiny treasure hints."}</p></section><section className="panel gear-card"><div className="section-heading"><span>{companion.card}</span><small><Swords size={14} /> loadout</small></div><div className="gear-list">{companion.items.map((item) => <span key={item}>{item}</span>)}</div></section><section className="panel reward-preview"><div className="section-heading"><span>Treasure preview</span><small><Gift size={14} /> store</small></div>{previewRewards.map((reward) => <div className="preview-reward" key={reward.id}><Icon name={reward.icon} /><div><strong>{reward.name}</strong><span>{reward.price} coins</span></div></div>)}</section><BadgeShelf badges={child.badges} /><section className="panel daily-card"><CalendarDays size={24} /><strong>Perfect Week Bonus</strong><p>Claim every quest for seven full days to earn the rare Perfect Week badge.</p></section></aside>
    </div>
  );
}

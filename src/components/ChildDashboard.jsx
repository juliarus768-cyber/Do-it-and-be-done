import { CalendarDays, Coins, Flame, Gift, ShieldCheck, Trophy } from "lucide-react";
import { childStats } from "../utils/gameLogic";
import BadgeShelf from "./BadgeShelf";
import MissionCard from "./MissionCard";
import ProgressRing from "./ProgressRing";
import { Icon } from "./iconMap.jsx";

export default function ChildDashboard({ child, state, categories, rewards, handlers }) {
  const stats = childStats(state, child.id);
  const previewRewards = rewards.filter((reward) => !reward.favoriteFor || reward.favoriteFor === child.id).sort((a, b) => Math.abs(child.coins - a.price) - Math.abs(child.coins - b.price)).slice(0, 3);

  return (
    <div className="dashboard-grid">
      <section className="child-hero"><div className="hero-id"><div className="large-avatar">{child.avatar}</div><div><span className="profile-kicker">{child.title}</span><h1>Hey {child.name}, ready to clear today?</h1><p>{child.weeklyChallenge}</p></div></div><div className="hero-metrics"><ProgressRing value={stats.completion} label="today" /><div className="stat-stack"><span><Coins size={18} /> {child.coins} coins</span><span><Flame size={18} /> {child.dailyStreak} day streak</span><span><Trophy size={18} /> Level {child.level}</span></div></div></section>
      <section className="panel xp-panel"><div className="section-heading"><span>Level progress</span><small>{child.xp}/{stats.nextLevelXp} XP</small></div><div className="xp-bar"><span style={{ width: `${stats.xpProgress}%` }} /></div><div className="challenge-strip"><ShieldCheck size={20} /><strong>Weekly Challenge</strong><span>{stats.completedIds.length} missions cleared today</span></div></section>
      <section className="missions-board">{categories.map((category) => { const group = child.missions.filter((mission) => mission.category === category.id); const completeCount = group.filter((mission) => stats.completedIds.includes(mission.id)).length; return <div className={`mission-group tone-${category.tone}`} key={category.id}><div className="mission-group-head"><div><Icon name={category.icon} /><h3>{category.label}</h3></div><span>{completeCount}/{group.length}</span></div><div className="mission-list">{group.map((mission) => <MissionCard key={mission.id} mission={mission} completed={stats.completedIds.includes(mission.id)} onComplete={() => handlers.completeMission(child.id, mission.id)} />)}</div></div>; })}</section>
      <aside className="side-rail"><section className="panel reward-preview"><div className="section-heading"><span>Reward preview</span><small><Gift size={14} /> store</small></div>{previewRewards.map((reward) => <div className="preview-reward" key={reward.id}><Icon name={reward.icon} /><div><strong>{reward.name}</strong><span>{reward.price} coins</span></div></div>)}</section><BadgeShelf badges={child.badges} /><section className="panel daily-card"><CalendarDays size={24} /><strong>Perfect Week Bonus</strong><p>Finish every mission on seven full days to earn a bonus badge and extra bragging rights.</p></section></aside>
    </div>
  );
}

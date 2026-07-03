import { Sparkles, UserRoundCog } from "lucide-react";
import { childStats } from "../utils/gameLogic";

export default function ProfileSelect({ state, onSelect }) {
  const alexStats = childStats(state, "alex");
  const katyaStats = childStats(state, "katya");

  return (
    <main className="profile-stage">
      <section className="hero-panel">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={18} /> Family command center</div>
          <h1>Do It and Be Done</h1>
          <p>Finish missions. Earn rewards. Build freedom.</p>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span className="orbit-card">XP</span><span className="orbit-card">Coins</span><span className="orbit-card">Streak</span></div>
      </section>

      <section className="profile-grid" aria-label="Choose a profile">
        <button className="profile-card alex-card" onClick={() => onSelect("alex")} type="button">
          <div className="avatar-burst">AX</div><div><span className="profile-kicker">Age 12</span><h2>Alex</h2><p>Gaming dashboard, battles, XP bars, and winning streaks.</p></div><div className="mini-stats"><span>{state.children.alex.coins} coins</span><span>{alexStats.completion}% today</span></div>
        </button>
        <button className="profile-card katya-card" onClick={() => onSelect("katya")} type="button">
          <div className="avatar-burst">KY</div><div><span className="profile-kicker">Age 10</span><h2>Katya</h2><p>Mystery missions, cute spooky clues, sparkles, and reward finds.</p></div><div className="mini-stats"><span>{state.children.katya.coins} coins</span><span>{katyaStats.completion}% today</span></div>
        </button>
        <button className="profile-card parent-card" onClick={() => onSelect("parent")} type="button">
          <div className="avatar-burst"><UserRoundCog size={34} /></div><div><span className="profile-kicker">Parent</span><h2>Command Deck</h2><p>Track progress, rewards, missed missions, and weekly momentum.</p></div><div className="mini-stats"><span>2 kids</span><span>{state.rewardRequests.length} requests</span></div>
        </button>
      </section>
    </main>
  );
}

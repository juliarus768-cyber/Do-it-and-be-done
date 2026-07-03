import { Crown, Gamepad2, Radar, Sparkles, UserRoundCog } from "lucide-react";
import { childStats } from "../utils/gameLogic";
import ProgressRing from "./ProgressRing";

function PetFigure({ type }) {
  return (
    <div className={`pet-figure ${type}`} aria-hidden="true">
      <span className="pet-ear left" />
      <span className="pet-ear right" />
      <span className="pet-face"><i /><i /><b /></span>
      <span className="pet-tail" />
    </div>
  );
}

export default function ProfileSelect({ state, onSelect }) {
  const alexStats = childStats(state, "alex");
  const katyaStats = childStats(state, "katya");

  return (
    <main className="game-title-screen">
      <section className="title-world">
        <div className="sky-layer" aria-hidden="true"><span className="star-spark s1" /><span className="star-spark s2" /><span className="star-spark s3" /><span className="floating-island i1" /><span className="floating-island i2" /></div>
        <div className="title-copy"><span className="eyebrow"><Sparkles size={18} /> Family adventure pass</span><h1>Do It and Be Done</h1><p>Pick a hero. Follow the quest path. Claim coins, streaks, badges, and real-life treasure.</p><div className="season-ticket"><strong>Season One</strong><span>Summer Quest Board is live</span></div></div>
        <div className="game-device" aria-hidden="true"><span className="device-button left" /><div className="device-screen"><div className="mini-map-path"><span /><span /><span /><span /></div><strong>Daily Quest Path</strong><small>3 heroes ready</small></div><span className="device-button right" /></div>
      </section>

      <section className="hero-select-grid" aria-label="Choose a profile">
        <button className="hero-select-card alex-select" onClick={() => onSelect("alex")} type="button"><div className="hero-card-art"><div className="hero-avatar">AX</div><PetFigure type="cat" /><span className="power-ring" /></div><div className="hero-card-copy"><span className="profile-kicker"><Gamepad2 size={16} /> Neon RPG command</span><h2>Alex</h2><p>Cat companion, XP battles, gear slots, streak power, and boss-style quest energy.</p></div><div className="hero-card-stats"><ProgressRing value={alexStats.completion} label="today" size={88} /><div><strong>{state.children.alex.coins}</strong><span>coins</span></div><div><strong>{state.children.alex.dailyStreak}</strong><span>streak</span></div></div></button>
        <button className="hero-select-card katya-select" onClick={() => onSelect("katya")} type="button"><div className="hero-card-art"><div className="hero-avatar">KY</div><PetFigure type="dog" /><span className="moon-window" /></div><div className="hero-card-copy"><span className="profile-kicker"><Sparkles size={16} /> Cozy mystery room</span><h2>Katya</h2><p>Dog companion, sticker book, mystery boxes, mini-game keys, and magical clue quests.</p></div><div className="hero-card-stats"><ProgressRing value={katyaStats.completion} label="today" size={88} /><div><strong>{state.children.katya.coins}</strong><span>coins</span></div><div><strong>{state.children.katya.dailyStreak}</strong><span>streak</span></div></div></button>
        <button className="hero-select-card parent-select" onClick={() => onSelect("parent")} type="button"><div className="hero-card-art control-art"><div className="hero-avatar"><UserRoundCog size={38} /></div><span className="control-radar"><Radar size={38} /></span><span className="control-grid" /></div><div className="hero-card-copy"><span className="profile-kicker"><Crown size={16} /> Parent Mission Control</span><h2>Mission Control</h2><p>Premium parent panel for quest progress, treasure requests, and daily readiness.</p></div><div className="hero-card-stats parent-stats"><div><strong>2</strong><span>heroes</span></div><div><strong>{state.rewardRequests.length}</strong><span>requests</span></div></div></button>
      </section>
    </main>
  );
}

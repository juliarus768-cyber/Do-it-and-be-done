import { Crown, Gamepad2, Sparkles, UserRoundCog } from "lucide-react";
import { childStats } from "../utils/gameLogic";
import ProgressRing from "./ProgressRing";

export default function ProfileSelect({ state, onSelect }) {
  const alexStats = childStats(state, "alex");
  const katyaStats = childStats(state, "katya");

  return (
    <main className="profile-stage">
      <section className="hero-panel premium-hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={18} /> Daily adventure launcher</div>
          <h1>Do It and Be Done</h1>
          <p>Choose your hero, clear quests, hatch streaks, and unlock treasure.</p>
          <div className="hero-actions"><span>Season One: Summer Quest Pass</span><span>Local demo mode</span></div>
        </div>
        <div className="console-preview" aria-hidden="true"><div className="switch-screen"><span className="console-dot" /><strong>Adventure Hub</strong><div className="console-slots"><span /><span /><span /></div></div></div>
      </section>

      <section className="profile-grid" aria-label="Choose a profile">
        <button className="profile-card alex-card premium-profile" onClick={() => onSelect("alex")} type="button"><div className="profile-card-top"><div className="avatar-burst">AX</div><div className="companion-token cat-companion">CAT</div></div><div><span className="profile-kicker"><Gamepad2 size={16} /> Futuristic gamer</span><h2>Alex</h2><p>Neon quests, XP boosts, streak battles, gear previews, and a cat companion.</p></div><div className="profile-footer"><ProgressRing value={alexStats.completion} label="today" size={88} /><div className="mini-stats"><span>{state.children.alex.coins} coins</span><span>Level {state.children.alex.level}</span></div></div></button>
        <button className="profile-card katya-card premium-profile" onClick={() => onSelect("katya")} type="button"><div className="profile-card-top"><div className="avatar-burst">KY</div><div className="companion-token dog-companion">DOG</div></div><div><span className="profile-kicker"><Sparkles size={16} /> Cozy mystery</span><h2>Katya</h2><p>Magical clue cards, stickers, mini-games, mystery boxes, and a dog companion.</p></div><div className="profile-footer"><ProgressRing value={katyaStats.completion} label="today" size={88} /><div className="mini-stats"><span>{state.children.katya.coins} coins</span><span>Level {state.children.katya.level}</span></div></div></button>
        <button className="profile-card parent-card premium-profile" onClick={() => onSelect("parent")} type="button"><div className="profile-card-top"><div className="avatar-burst"><UserRoundCog size={34} /></div><div className="companion-token control-companion"><Crown size={22} /></div></div><div><span className="profile-kicker">Parent Mission Control</span><h2>Mission Control</h2><p>Calm command view for quests, treasure requests, streaks, and daily momentum.</p></div><div className="profile-footer parent-summary"><span>{state.rewardRequests.length} treasure requests</span><span>2 hero profiles</span></div></button>
      </section>
    </main>
  );
}

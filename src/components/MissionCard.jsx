import { Check, Coins, Sparkle } from "lucide-react";

export default function MissionCard({ mission, completed, onComplete, step = 1 }) {
  return (
    <article className={`quest-node-card ${completed ? "claimed" : ""}`}>
      <div className="quest-node-orb">
        {completed ? <Check size={24} /> : <span>{step}</span>}
      </div>
      <div className="quest-node-copy">
        <span className="quest-type"><Sparkle size={14} /> Daily quest</span>
        <h4>{mission.title}</h4>
        <p>{mission.subtitle}</p>
        <span className="quest-payout"><Coins size={15} /> {mission.coins} coins - {mission.xp} XP</span>
      </div>
      <button className="mission-button" onClick={onComplete} disabled={completed} type="button">
        {completed ? "Claimed" : "Claim quest"}
      </button>
    </article>
  );
}

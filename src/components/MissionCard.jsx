import { Check, Coins } from "lucide-react";

export default function MissionCard({ mission, completed, onComplete }) {
  return (
    <article className={`mission-card ${completed ? "complete" : ""}`}>
      <div className="mission-status">{completed ? <Check size={22} /> : mission.xp}</div>
      <div className="mission-copy">
        <h4>{mission.title}</h4>
        <p>{mission.subtitle}</p>
        <span><Coins size={15} /> {mission.coins} coins</span>
      </div>
      <button className="mission-button" onClick={onComplete} disabled={completed} type="button">
        {completed ? "Done" : "Complete"}
      </button>
    </article>
  );
}

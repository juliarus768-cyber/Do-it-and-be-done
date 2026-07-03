import { PartyPopper, Sparkles, Trophy, X } from "lucide-react";

const copy = { mission: ["Mission complete", "Coins and XP dropped into the stash."], category: ["Category cleared", "That whole mission zone is handled."], level: ["Level up", "New level unlocked. That was a clean run."], "perfect-day": ["Perfect day", "Every mission is done. Huge streak energy."], reward: ["Reward claimed", "A parent reward request has been added."] };

export default function CelebrationModal({ celebration, onClose }) {
  if (!celebration) return null;
  const [title, body] = copy[celebration.milestone] || copy.mission;
  return (
    <div className="celebration-backdrop" role="dialog" aria-modal="true" aria-labelledby="celebration-title">
      <div className="spark-field" aria-hidden="true">{Array.from({ length: 18 }).map((_, index) => <span key={index} />)}</div>
      <section className={`celebration-modal theme-${celebration.child.theme}`}>
        <button className="close-button" onClick={onClose} type="button" aria-label="Close celebration"><X size={20} /></button>
        <div className="celebration-icon">{celebration.milestone === "reward" ? <PartyPopper size={42} /> : <Trophy size={42} />}</div>
        <span><Sparkles size={16} /> {celebration.child.name}</span><h2 id="celebration-title">{title}</h2><p>{body}</p><button className="primary-button" onClick={onClose} type="button">Nice</button>
      </section>
    </div>
  );
}

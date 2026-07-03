import { LockKeyhole, PartyPopper, Sparkles } from "lucide-react";
import { Icon } from "./iconMap.jsx";

export default function RewardCard({ reward, child, onClaim }) {
  const canClaim = child.coins >= reward.price;
  const gap = reward.price - child.coins;
  return (
    <article className={`collectible-card ${canClaim ? "unlocked" : "locked"}`}>
      <div className="collectible-glow" aria-hidden="true" />
      <div className="collectible-icon"><Icon name={reward.icon} size={30} /></div>
      <div className="collectible-copy">
        <span><Sparkles size={14} /> {reward.flavor}</span>
        <h3>{reward.name}</h3>
        <p>{reward.price} coins</p>
      </div>
      <button className="reward-button" onClick={() => onClaim(child.id, reward)} disabled={!canClaim} type="button">
        {canClaim ? <><PartyPopper size={17} /> Claim treasure</> : <><LockKeyhole size={17} /> Need {gap}</>}
      </button>
    </article>
  );
}

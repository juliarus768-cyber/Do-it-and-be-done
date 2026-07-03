import { Gift, LockKeyhole, Sparkles } from "lucide-react";
import RewardCard from "./RewardCard";

export default function RewardStore({ child, state, rewards, onClaim }) {
  const history = state.claimedRewards.filter((item) => item.childId === child.id);
  return (
    <div className="treasure-room">
      <section className="treasure-hero">
        <div>
          <span className="profile-kicker"><Gift size={16} /> Treasure Store</span>
          <h1>{child.name}'s collectible vault</h1>
          <p>Cards glow when unlocked. Claim treasure with quest coins and send it to Mission Control.</p>
        </div>
        <div className="coin-vault"><strong>{child.coins}</strong><span>coins ready</span></div>
      </section>

      <section className="vault-feature">
        <div className="vault-box"><Sparkles size={38} /><span className="vault-lock"><LockKeyhole size={18} /></span></div>
        <div><span className="profile-kicker">Mystery Box</span><h2>Seasonal surprise card</h2><p>Keep claiming quests to reveal a limited treasure card for this week.</p></div>
        <button className="ghost-button" type="button">Preview locked</button>
      </section>

      <section className="collectible-grid">{rewards.map((reward) => <RewardCard key={reward.id} reward={reward} child={child} onClaim={onClaim} />)}</section>

      <section className="vault-history">
        <div className="section-heading"><span>Claimed treasure shelf</span><small>{history.length} total</small></div>
        {history.length === 0 ? (
          <p className="empty-note">No treasure claimed yet. The first claim will land here as a shiny shelf card.</p>
        ) : (
          <div className="history-list">{history.slice(0, 6).map((item) => <div key={item.id}><strong>{item.name}</strong><span>{item.price} coins - {item.date}</span></div>)}</div>
        )}
      </section>
    </div>
  );
}

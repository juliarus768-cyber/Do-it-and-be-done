import { Gift, Sparkles } from "lucide-react";
import RewardCard from "./RewardCard";

export default function RewardStore({ child, state, rewards, onClaim }) {
  const history = state.claimedRewards.filter((item) => item.childId === child.id);
  return (
    <div className="store-page treasure-store">
      <section className="store-hero"><div><span className="profile-kicker"><Gift size={16} /> Treasure Store</span><h1>{child.name}'s treasure shelf</h1><p>Spend quest coins on family treasure. Claimable cards glow when the stash is ready.</p></div><div className="store-wallet"><strong>{child.coins}</strong><span>coins ready</span></div></section>
      <section className="mystery-box-card"><div className="mystery-box-visual"><Sparkles size={34} /></div><div><span className="profile-kicker">Mystery Box</span><h2>Next surprise unlock</h2><p>Keep claiming quests to reveal a seasonal bonus card.</p></div><button className="ghost-button" type="button">Locked preview</button></section>
      <section className="reward-grid">{rewards.map((reward) => <RewardCard key={reward.id} reward={reward} child={child} onClaim={onClaim} />)}</section>
      <section className="panel history-panel"><div className="section-heading"><span>Claimed treasure</span><small>{history.length} total</small></div>{history.length === 0 ? <p className="empty-note">No treasure claimed yet. The first claim will sparkle into this shelf.</p> : <div className="history-list">{history.slice(0, 6).map((item) => <div key={item.id}><strong>{item.name}</strong><span>{item.price} coins - {item.date}</span></div>)}</div>}</section>
    </div>
  );
}

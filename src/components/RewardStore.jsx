import { Gift } from "lucide-react";
import RewardCard from "./RewardCard";

export default function RewardStore({ child, state, rewards, onClaim }) {
  const history = state.claimedRewards.filter((item) => item.childId === child.id);
  return (
    <div className="store-page">
      <section className="store-hero"><div><span className="profile-kicker"><Gift size={16} /> Reward Store</span><h1>{child.name}'s loot shelf</h1><p>Spend coins on real family rewards. Bigger rewards unlock when the coin stash grows.</p></div><div className="store-wallet"><strong>{child.coins}</strong><span>coins ready</span></div></section>
      <section className="reward-grid">{rewards.map((reward) => <RewardCard key={reward.id} reward={reward} child={child} onClaim={onClaim} />)}</section>
      <section className="panel history-panel"><div className="section-heading"><span>Claimed rewards</span><small>{history.length} total</small></div>{history.length === 0 ? <p className="empty-note">No rewards claimed yet. The first one is going to feel excellent.</p> : <div className="history-list">{history.slice(0, 6).map((item) => <div key={item.id}><strong>{item.name}</strong><span>{item.price} coins - {item.date}</span></div>)}</div>}</section>
    </div>
  );
}

import { Icon } from "./iconMap.jsx";

export default function BadgeShelf({ badges }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <span>Badge shelf</span>
        <small>{badges.filter((badge) => badge.unlocked).length}/{badges.length} unlocked</small>
      </div>
      <div className="badge-shelf">
        {badges.map((badge) => (
          <div className={`badge-token ${badge.unlocked ? "unlocked" : "locked"}`} key={badge.id}>
            <Icon name={badge.icon} size={24} />
            <span>{badge.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

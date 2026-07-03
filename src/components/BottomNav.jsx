import { Gift, Home, Settings, UserRound, UsersRound } from "lucide-react";

export default function BottomNav({ profile, view, onView, onProfiles }) {
  const isChild = profile === "alex" || profile === "katya";

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <button className={view === "home" ? "active" : ""} onClick={() => onView("home")} type="button"><Home size={21} /><span>Hub</span></button>
      {isChild && <button className={view === "rewards" ? "active" : ""} onClick={() => onView("rewards")} type="button"><Gift size={21} /><span>Treasure</span></button>}
      <button onClick={onProfiles} type="button">{profile === "parent" ? <UsersRound size={21} /> : <UserRound size={21} />}<span>Profiles</span></button>
      <button className={view === "settings" ? "active" : ""} onClick={() => onView("settings")} type="button"><Settings size={21} /><span>Settings</span></button>
    </nav>
  );
}

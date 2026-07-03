import { useEffect, useMemo, useState } from "react";
import { categories, rewards } from "./data/seedData";
import { clearState, loadState, saveState } from "./utils/storage";
import { addDemoMission, claimReward, completeMission, resetAll, resetToday } from "./utils/gameLogic";
import ProfileSelect from "./components/ProfileSelect";
import ChildDashboard from "./components/ChildDashboard";
import ParentDashboard from "./components/ParentDashboard";
import RewardStore from "./components/RewardStore";
import SettingsPanel from "./components/SettingsPanel";
import BottomNav from "./components/BottomNav";
import CelebrationModal from "./components/CelebrationModal";

const initialView = () => new URLSearchParams(window.location.search).get("view") || "home";

export default function App() {
  const [state, setState] = useState(loadState);
  const [profile, setProfile] = useState("select");
  const [view, setView] = useState(initialView);
  const [celebration, setCelebration] = useState(null);

  useEffect(() => {
    saveState(state);
    document.documentElement.dataset.motion = state.reducedMotion ? "reduced" : "full";
  }, [state]);

  const activeChild = profile === "alex" || profile === "katya" ? state.children[profile] : null;

  const handlers = useMemo(
    () => ({
      completeMission(childId, missionId) {
        setState((current) => {
          const result = completeMission(current, childId, missionId);
          if (result.milestone) {
            const child = result.state.children[childId];
            setCelebration({
              child,
              milestone: result.milestone,
              mission: child.missions.find((item) => item.id === missionId)
            });
          }
          return result.state;
        });
      },
      claimReward(childId, reward) {
        setState((current) => {
          const result = claimReward(current, childId, reward);
          if (result.claimed) {
            setCelebration({ child: result.state.children[childId], milestone: "reward", reward });
          }
          return result.state;
        });
      },
      resetToday() {
        setState((current) => resetToday(current));
      },
      resetAll() {
        clearState();
        setState(resetAll());
        setProfile("select");
        setView("home");
      },
      addDemoMission() {
        setState((current) => addDemoMission(current));
      },
      updateSettings(patch) {
        setState((current) => ({ ...current, ...patch }));
      }
    }),
    []
  );

  if (profile === "select") {
    return <ProfileSelect state={state} onSelect={(nextProfile) => setProfile(nextProfile)} />;
  }

  const shellClass = `app-shell ${activeChild ? `theme-${activeChild.theme}` : "theme-parent"}`;

  return (
    <div className={shellClass}>
      <header className="topbar">
        <button className="brand-chip" onClick={() => setProfile("select")} type="button">
          <span className="brand-mark">D</span>
          <span>Do It and Be Done</span>
        </button>
        <div className="topbar-actions">
          {activeChild && <span className="coin-pill">{activeChild.coins} coins</span>}
          <button className="ghost-button" onClick={() => setView("settings")} type="button">
            Settings
          </button>
        </div>
      </header>

      <main className="app-main">
        {profile === "parent" && view !== "settings" && (
          <ParentDashboard state={state} categories={categories} onSelectChild={setProfile} handlers={handlers} />
        )}

        {activeChild && view !== "rewards" && view !== "settings" && (
          <ChildDashboard child={activeChild} state={state} categories={categories} rewards={rewards} handlers={handlers} />
        )}

        {activeChild && view === "rewards" && (
          <RewardStore child={activeChild} state={state} rewards={rewards} onClaim={handlers.claimReward} />
        )}

        {view === "settings" && <SettingsPanel state={state} handlers={handlers} onBack={() => setView("home")} />}
      </main>

      <BottomNav profile={profile} view={view} onView={setView} onProfiles={() => setProfile("select")} />
      <CelebrationModal celebration={celebration} onClose={() => setCelebration(null)} />
    </div>
  );
}

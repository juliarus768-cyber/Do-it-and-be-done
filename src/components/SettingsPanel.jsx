import { Moon, RotateCcw, ShieldAlert, Volume2 } from "lucide-react";

export default function SettingsPanel({ state, handlers, onBack }) {
  return (
    <div className="settings-page">
      <section className="settings-hero"><div><span className="profile-kicker">Settings</span><h1>Demo controls</h1><p>Reset local progress, switch modes, and preview how the app behaves on shared tablets.</p></div><button className="ghost-button" onClick={onBack} type="button">Back</button></section>
      <section className="settings-grid">
        <div className="panel setting-card"><Moon size={24} /><div><strong>Weekday / weekend mode</strong><p>Weekend mode can later load lighter missions and different bonus rewards.</p></div><button className="segmented-button" onClick={() => handlers.updateSettings({ mode: state.mode === "weekday" ? "weekend" : "weekday" })} type="button">{state.mode}</button></div>
        <div className="panel setting-card"><ShieldAlert size={24} /><div><strong>Reduced motion</strong><p>Softens transitions and celebration movement.</p></div><label className="toggle"><input type="checkbox" checked={state.reducedMotion} onChange={(event) => handlers.updateSettings({ reducedMotion: event.target.checked })} /><span /></label></div>
        <div className="panel setting-card"><Volume2 size={24} /><div><strong>Sound placeholder</strong><p>Prepared for future taps, claims, and level-up sounds.</p></div><label className="toggle"><input type="checkbox" checked={state.soundEnabled} onChange={(event) => handlers.updateSettings({ soundEnabled: event.target.checked })} /><span /></label></div>
        <div className="panel setting-card danger-zone"><RotateCcw size={24} /><div><strong>Reset today</strong><p>Clears only today's completed mission marks. Coins and XP stay for the demo.</p></div><button className="ghost-button" onClick={handlers.resetToday} type="button">Reset today</button></div>
        <div className="panel setting-card danger-zone"><RotateCcw size={24} /><div><strong>Reset all local data</strong><p>Restores the original Alex and Katya demo seed data.</p></div><button className="danger-button" onClick={handlers.resetAll} type="button">Reset all</button></div>
      </section>
      <section className="theme-preview"><div className="preview-swatch alex-swatch">Alex gamer XP</div><div className="preview-swatch katya-swatch">Katya mystery magic</div><div className="preview-swatch parent-swatch">Parent calm overview</div></section>
    </div>
  );
}

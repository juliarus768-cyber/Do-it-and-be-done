import { createInitialState, todayKey } from "../data/seedData";

const STORAGE_KEY = "do-it-and-be-done-state-v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    return {
      ...createInitialState(),
      ...parsed,
      children: {
        ...createInitialState().children,
        ...(parsed.children || {})
      },
      activeDate: parsed.activeDate || todayKey()
    };
  } catch {
    return createInitialState();
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

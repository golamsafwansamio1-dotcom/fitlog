
export type WorkoutItem = {
  id: number | string;
  name: string;
  muscleGroups?: string[] | string;
  equipment?: string[] | string;
  duration?: number;
  calories?: number;
  description?: string;
  instructions?: string[] | string;
};

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

function readItems(key: string): WorkoutItem[] {
  if (typeof window === "undefined") return [];

  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function getPlan() {
  return readItems(PLAN_KEY);
}

export function getSaved() {
  return readItems(SAVED_KEY);
}

export function addToPlan(workout: WorkoutItem): boolean {
  const plan = getPlan();

  if (plan.some((item) => String(item.id) === String(workout.id))) {
    return false;
  }

  if (plan.length >= 5) return false;

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify([...plan, workout])
  );

  return true;
}

export function saveWorkout(workout: WorkoutItem): boolean {
  const saved = getSaved();

  if (saved.some((item) => String(item.id) === String(workout.id))) {
    return false;
  }

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify([...saved, workout])
  );

  return true;
}

export function removeFromPlan(id: number | string): void {
  const updated = getPlan().filter(
    (item) => String(item.id) !== String(id)
  );

  localStorage.setItem(PLAN_KEY, JSON.stringify(updated));
}

export function removeSaved(id: number | string): void {
  const updated = getSaved().filter(
    (item) => String(item.id) !== String(id)
  );

  localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
}

export function notifyStorageChanged() {
  window.dispatchEvent(new Event("fitlog-storage-change"));
}

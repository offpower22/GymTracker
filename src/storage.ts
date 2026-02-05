import type { Workout, Exercise, WorkoutSet, ExerciseLog, Gym, DayType } from './types';

const STORAGE_KEY = 'gym-tracker-workouts';
const DRAFT_KEY = 'gym-tracker-draft';

export interface WorkoutDraft {
  gym: Gym;
  dayType: DayType;
  exercises: ExerciseLog[];
  startedAt: string;
}

export const saveWorkouts = (workouts: Workout[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
};

export const loadWorkouts = (): Workout[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const getLastExerciseLog = (
  exercise: Exercise,
  workouts: Workout[]
): WorkoutSet[] | null => {
  // Sort by date descending to get most recent first
  const sortedWorkouts = [...workouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const workout of sortedWorkouts) {
    const exerciseLog = workout.exercises.find((e) => e.exercise === exercise);
    if (exerciseLog && exerciseLog.sets.length > 0) {
      return exerciseLog.sets;
    }
  }

  return null;
};

export const getWorkoutsForWeek = (
  startDate: Date,
  workouts: Workout[]
): Map<number, boolean> => {
  const weekMap = new Map<number, boolean>();

  // Initialize all days as false (0 = Monday, 6 = Sunday)
  for (let i = 0; i < 7; i++) {
    weekMap.set(i, false);
  }

  workouts.forEach((workout) => {
    const workoutDate = new Date(workout.date);
    const daysDiff = Math.floor(
      (workoutDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff >= 0 && daysDiff < 7) {
      weekMap.set(daysDiff, true);
    }
  });

  return weekMap;
};

export const getMondayOfCurrentWeek = (): Date => {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day; // Adjust when day is Sunday
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday;
};

export const saveDraft = (draft: WorkoutDraft | null): void => {
  if (draft) {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } else {
    localStorage.removeItem(DRAFT_KEY);
  }
};

export const loadDraft = (): WorkoutDraft | null => {
  const data = localStorage.getItem(DRAFT_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

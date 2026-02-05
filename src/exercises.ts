import type { DayType, KnownExercise } from './types';

export const EXERCISE_MAP: Record<DayType, KnownExercise[]> = {
  Push: [
    'Bench Press',
    'Dumbbell Press',
    'Chest Press',
    'Pec Fly',
    'Tricep Pulldowns',
  ],
  Pull: [
    'Pull-ups',
    'Lat Pulldown',
    'Seated Row',
    'Spider Curl (front)',
    'Spider Curl (reverse)',
    'Bayesian Curl',
    'Regular Curl',
  ],
  Legs: ['Squats'],
};

export const EXERCISE_ICONS: Record<string, string> = {
  'Bench Press': '🏋️',
  'Dumbbell Press': '💪',
  'Chest Press': '🦾',
  'Pec Fly': '🦅',
  'Tricep Pulldowns': '⬇️',
  'Pull-ups': '⬆️',
  'Lat Pulldown': '🏋️',
  'Seated Row': '🚣',
  'Spider Curl (front)': '🕸️',
  'Spider Curl (reverse)': '🕸️',
  'Bayesian Curl': '💪',
  'Regular Curl': '💪',
  'Squats': '🦵',
};

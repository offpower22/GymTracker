import { useState } from 'react';
import type { DayType, Exercise, ExerciseLog, KnownExercise } from '../types';
import { EXERCISE_MAP, EXERCISE_ICONS } from '../exercises';

interface Props {
  dayType: DayType;
  onSelectExercise: (exercise: Exercise) => void;
  onEndWorkout: () => void;
  onBack: () => void;
  completedExercises: ExerciseLog[];
}

export default function ExerciseList({
  dayType,
  onSelectExercise,
  onEndWorkout,
  onBack,
  completedExercises,
}: Props) {
  const exercises = EXERCISE_MAP[dayType];
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customExerciseName, setCustomExerciseName] = useState('');

  const isCompleted = (exercise: Exercise) => {
    return completedExercises.some((e) => e.exercise === exercise);
  };

  const completedCustomExercises = completedExercises.filter(
    (e) => !exercises.includes(e.exercise as KnownExercise)
  );

  const handleCustomSubmit = () => {
    const name = customExerciseName.trim();
    if (!name) return;
    onSelectExercise(name);
    setShowCustomInput(false);
    setCustomExerciseName('');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pb-10">
      <div className="sticky top-0 z-10 bg-gray-900 -mx-6 px-6 pt-0 pb-2">
        <button
          onClick={onBack}
          className="text-blue-400 hover:text-blue-300 text-lg py-2 pr-4 -ml-2 touch-manipulation min-h-[44px] flex items-center"
        >
          ← Back
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-2 text-center">{dayType} Day</h1>
      <p className="text-gray-400 text-center mb-8">Select an exercise</p>

      <div className="flex flex-col gap-3 max-w-md mx-auto mb-6">
        {exercises.map((exercise) => (
          <button
            key={exercise}
            onClick={() => onSelectExercise(exercise)}
            className={`${
              isCompleted(exercise)
                ? 'bg-gray-700 border-2 border-green-500'
                : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'
            } text-white font-semibold py-5 px-6 rounded-xl text-xl transition-colors touch-manipulation text-left relative`}
          >
            <span className="mr-3">{EXERCISE_ICONS[exercise] || '🏋️'}</span>
            {exercise}
            {isCompleted(exercise) && (
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-green-400 text-2xl">
                ✓
              </span>
            )}
          </button>
        ))}

        {completedCustomExercises.map((log) => (
          <div
            key={log.exercise}
            className="bg-gray-700 border-2 border-green-500 text-white font-semibold py-5 px-6 rounded-xl text-xl text-left relative"
          >
            <span className="mr-3">🏋️</span>
            {log.exercise}
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-green-400 text-2xl">
              ✓
            </span>
          </div>
        ))}

        {showCustomInput ? (
          <div className="bg-gray-800 rounded-xl p-4 space-y-3">
            <input
              type="text"
              autoFocus
              value={customExerciseName}
              onChange={(e) => setCustomExerciseName(e.target.value)}
              placeholder="Exercise name"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCustomSubmit();
              }}
            />
            <div className="flex gap-3">
              <button
                onClick={handleCustomSubmit}
                disabled={!customExerciseName.trim()}
                className="flex-1 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-3 px-4 rounded-lg text-lg transition-colors touch-manipulation"
              >
                Start
              </button>
              <button
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomExerciseName('');
                }}
                className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-semibold py-3 px-4 rounded-lg text-lg transition-colors touch-manipulation"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowCustomInput(true)}
            className="bg-gray-600 hover:bg-gray-500 active:bg-gray-400 text-white font-semibold py-5 px-6 rounded-xl text-xl transition-colors touch-manipulation text-left border-2 border-dashed border-gray-500"
          >
            <span className="mr-3">➕</span>
            Other Exercise
          </button>
        )}
      </div>

      {completedExercises.length > 0 && (
        <div className="max-w-md mx-auto mt-8">
          <button
            onClick={onEndWorkout}
            className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold py-5 px-6 rounded-xl text-xl transition-colors touch-manipulation"
          >
            End Workout
          </button>
        </div>
      )}
    </div>
  );
}

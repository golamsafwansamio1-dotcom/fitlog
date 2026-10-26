
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../component/Navbar";
import {
  getSaved,
  removeSaved,
  notifyStorageChanged,
  type WorkoutItem,
} from "../../component/lib/storage";
import { Trash2, Dumbbell } from "lucide-react";

export default function SavedPage() {
  const [workouts, setWorkouts] = useState<WorkoutItem[]>([]);

  useEffect(() => {
    setWorkouts(getSaved());
  }, []);

  function handleRemove(id: number | string) {
    removeSaved(id);
    setWorkouts(getSaved());
    notifyStorageChanged();
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold tracking-widest text-[#ccff00]">
            YOUR COLLECTION
          </p>

          <h1 className="text-4xl font-black">
            Saved Workouts
          </h1>

          <p className="mt-3 text-gray-400">
            Your favorite workouts, saved for later.
          </p>
        </div>

        {workouts.length === 0 ? (
          <div className="rounded-2xl border border-[#292d34] p-10 text-center">
            <Dumbbell
              size={44}
              className="mx-auto mb-4 text-[#ccff00]"
            />

            <h2 className="text-xl font-bold">
              No saved workouts yet
            </h2>

            <p className="mt-2 text-gray-400">
              Save a workout to see it here.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="rounded-2xl border border-[#292d34] bg-[#15181d] p-6"
              >
                <h2 className="text-xl font-bold">
                  {workout.name}
                </h2>

                <p className="mt-3 text-sm text-gray-400">
                  Muscle:{" "}
                  {Array.isArray(workout.muscleGroups)
                    ? workout.muscleGroups.join(", ")
                    : workout.muscleGroups || "Not specified"}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="rounded-full bg-[#ccff00] px-4 py-2 font-bold text-black"
                  >
                    View Workout
                  </Link>

                  <button
                    onClick={() => handleRemove(workout.id)}
                    className="flex items-center gap-2 rounded-full border border-red-500 px-4 py-2 text-red-400 hover:bg-red-950"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

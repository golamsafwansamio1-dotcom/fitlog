
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/component/Navbar";
import {
  getPlan,
  getSaved,
  removeFromPlan,
  removeSaved,
  notifyStorageChanged,
  type WorkoutItem,
} from "@/component/lib/storage";
import { Clock, Flame, Dumbbell, Trash2 } from "lucide-react";

export default function MyPlan() {
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [plan, setPlan] = useState<WorkoutItem[]>([]);
  const [saved, setSaved] = useState<WorkoutItem[]>([]);

  useEffect(() => {
    setPlan(getPlan());
    setSaved(getSaved());
  }, []);

  function refreshWorkouts() {
    setPlan(getPlan());
    setSaved(getSaved());
    notifyStorageChanged();
  }

  function handleRemovePlan(id: number | string) {
    removeFromPlan(id);
    refreshWorkouts();
  }

  function handleRemoveSaved(id: number | string) {
    removeSaved(id);
    refreshWorkouts();
  }

  const totalMinutes = plan.reduce(
    (total, workout) => total + (Number(workout.duration) || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + (Number(workout.calories) || 0),
    0
  );

  const workouts = activeTab === "plan" ? plan : saved;

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <Navbar />

      <section className="mx-auto max-w-7xl px-5 py-12">
        <p className="text-sm font-bold tracking-[0.25em] text-[#ccff00]">
          YOUR WORKOUTS
        </p>

        <h1 className="mt-3 text-4xl font-black sm:text-5xl">
          MY PLAN
        </h1>

        <p className="mt-3 text-gray-400">
          Track your workouts, time and calories.
        </p>

        
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#343943] bg-[#15181d] p-6">
            <Dumbbell className="text-[#ccff00]" size={28} />
            <p className="mt-5 text-4xl font-black">{plan.length}</p>
            <p className="mt-2 text-sm tracking-widest text-gray-400">
              EXERCISES
            </p>
          </div>

          <div className="rounded-2xl border border-[#343943] bg-[#15181d] p-6">
            <Clock className="text-[#ccff00]" size={28} />
            <p className="mt-5 text-4xl font-black">{totalMinutes}</p>
            <p className="mt-2 text-sm tracking-widest text-gray-400">
              MINUTES
            </p>
          </div>

          <div className="rounded-2xl border border-[#343943] bg-[#15181d] p-6">
            <Flame className="text-[#ccff00]" size={28} />
            <p className="mt-5 text-4xl font-black">{totalCalories}</p>
            <p className="mt-2 text-sm tracking-widest text-gray-400">
              CALORIES
            </p>
          </div>
        </div>

        
        <div className="mt-10 flex flex-wrap gap-3 border-b border-[#292d34] pb-4">
          <button
            onClick={() => setActiveTab("plan")}
            className={`rounded-full px-6 py-3 font-bold ${
              activeTab === "plan"
                ? "bg-[#ccff00] text-black"
                : "border border-gray-700 text-gray-300"
            }`}
          >
            Today&apos;s Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-full px-6 py-3 font-bold ${
              activeTab === "saved"
                ? "bg-[#ccff00] text-black"
                : "border border-gray-700 text-gray-300"
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

       
        {workouts.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-[#292d34] p-10 text-center">
            <Dumbbell
              size={42}
              className="mx-auto mb-4 text-[#ccff00]"
            />

            <h2 className="text-xl font-bold">
              {activeTab === "plan"
                ? "NOTHING HERE YET"
                : "NO SAVED WORKOUTS"}
            </h2>

            <p className="mt-3 text-gray-400">
              {activeTab === "plan"
                ? "Add workouts to your plan to see your progress here."
                : "Save your favorite workouts to find them here."}
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black"
            >
              Browse Workouts
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <div
                key={workout.id}
                className="overflow-hidden rounded-2xl border border-[#292d34] bg-[#15181d] transition hover:-translate-y-1 hover:border-[#ccff00]/50"
              >
                
                <div className="relative h-44 w-full overflow-hidden bg-[#101114]">
                  <Image
                    src="/samio.png"
                    alt={workout.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold">
                    {workout.name}
                  </h2>

                  <p className="mt-3 text-sm text-gray-400">
                    Muscle:{" "}
                    {Array.isArray(workout.muscleGroups)
                      ? workout.muscleGroups.join(", ")
                      : workout.muscleGroups || "Not specified"}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                      <Clock size={16} className="text-[#ccff00]" />
                      {Number(workout.duration) || 0} min
                    </span>

                    <span className="flex items-center gap-2">
                      <Flame size={16} className="text-[#ccff00]" />
                      {Number(workout.calories) || 0} kcal
                    </span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/workout/${workout.id}`}
                      className="rounded-full bg-[#ccff00] px-4 py-2 font-bold text-black"
                    >
                      View Workout
                    </Link>

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? handleRemovePlan(workout.id)
                          : handleRemoveSaved(workout.id)
                      }
                      className="flex items-center gap-2 rounded-full border border-red-500 px-4 py-2 text-red-400 hover:bg-red-950"
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}





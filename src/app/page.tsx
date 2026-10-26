



import Navbar from "@/component/Navbar";
export const instant = false
import { Dumbbell } from "lucide-react";  

import { getAllProducts } from "@/component/lib/api";
import WorkoutCard from "@/component/WorkoutCard";
import Banner from "@/component/Banner";

type Workout = {
  id: number | string;
  name: string;
  muscleGroups?: string[];
  equipment?: string[];
  duration?: number;
  calories?: number;
  image?: string;
};

export default async function Home() {
  let workouts: Workout[] = [];
  let error = false;

  try {
    const data = await getAllProducts();

  
    workouts = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
        ? data.data
        : [];
  } catch {
    error = true;
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <Navbar />

      <Banner />

      <section
        id="library"
        className="mx-auto max-w-7xl scroll-mt-8 px-5 pb-20"
      >
        <div className="mb-8">
          <p className="text-sm font-bold tracking-widest text-[#ccff00]">
            FIND YOUR NEXT LIFT
          </p>
          <h2 className="mt-2 text-3xl font-black">
            THE LIBRARY.
          </h2>
          <p className="mt-2 text-gray-400">
            {workouts.length} exercises available
          </p>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-900 p-5 text-red-300">
            
          </p>
        ) : workouts.length === 0 ? (
          <p className="rounded-xl border border-[#292d34] p-5 text-gray-400">
            
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}



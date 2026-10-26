export const instant = false




import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Flame } from "lucide-react";
import { getAllProducts } from "@/component/lib/api";
import Navbar from "@/component/Navbar";
import WorkoutActions from "@/component/WorkoutActions";

type Workout = {
  id: number | string;
  name: string;
  muscleGroups?: string[] | string;
  equipment?: string[] | string;
  duration?: number;
  calories?: number;
  description?: string;
  instructions?: string[] | string;
};

export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getAllProducts();

  const workouts: Workout[] = Array.isArray(result)
    ? result
    : Array.isArray(result.data)
      ? result.data
      : [];

  const workout = workouts.find(
    (item) => String(item.id) === id
  );

  if (!workout) {
    return (
      <main className="min-h-screen bg-[#0d0f12] p-8 text-white">
        <h1 className="text-3xl font-bold">Workout not found</h1>
        <Link
          href="/"
          className="mt-5 inline-block text-[#ccff00]"
        >
          <ArrowLeft className="mr-2 inline" size={18} />
          Back to Workouts
        </Link>
      </main>
    );
  }

  const equipment = Array.isArray(workout.equipment)
    ? workout.equipment.join(", ")
    : workout.equipment ?? "Not specified";

  const muscles = Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups.join(", ")
    : workout.muscleGroups ?? "General";

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : typeof workout.instructions === "string"
      ? [workout.instructions]
      : ["Follow proper form and use a suitable weight."];

  return (
    <main className="min-h-screen bg-[#0d0f12] px-5 py-10 text-white">
      <Navbar />

      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-8 mt-6 inline-flex items-center gap-2 text-gray-400 hover:text-[#ccff00]"
        >
          <ArrowLeft size={18} />
          Back to Workouts
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Workout Image */}
          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-[#292d34] bg-[#101114]">
            <Image
              src="/samio.png"
              alt={workout.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          
          <div>
            <p className="text-sm font-bold tracking-widest text-[#ccff00]">
              WORKOUT DETAILS
            </p>

            <h1 className="mt-3 text-4xl font-black">
              {workout.name}
            </h1>

            <p className="mt-4 leading-7 text-gray-400">
              {workout.description ??
                `Train your ${muscles.toLowerCase()} with this exercise. Focus on controlled movement and good technique.`}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-[#252d19] px-4 py-2 text-[#ccff00]">
                {muscles}
              </span>

              <span className="rounded-full border border-[#343943] px-4 py-2 text-gray-300">
                {equipment}
              </span>
            </div>

            <div className="mt-6 flex gap-6 border-y border-[#292d34] py-5 text-gray-300">
              <span className="flex items-center gap-2">
                <Clock size={18} />
                {workout.duration ?? 30} min
              </span>

              <span className="flex items-center gap-2">
                <Flame size={18} />
                {workout.calories ?? 150} kcal
              </span>
            </div>
          </div>

          <WorkoutActions workout={workout} />
        </div>

        
        <section className="mt-12">
          <h2 className="text-2xl font-black">
            HOW TO PERFORM
          </h2>

          <ol className="mt-5 list-inside list-decimal space-y-3 text-gray-400">
            {instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}


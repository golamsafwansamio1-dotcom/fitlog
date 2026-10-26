
import { Clock, Dumbbell, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Workout = {
  id: number | string;
  name: string;
  muscleGroups?: string[];
  equipment?: string[] | string;
  duration?: number;
  calories?: number;
  image?: string;
};

type Props = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: Props) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#292d34] bg-[#14171b] transition hover:-translate-y-1 hover:border-[#ccff00]/50">
      
      <div className="relative h-44 w-full overflow-hidden bg-[#101114]">
        <Image
          src="/samio.png"
          alt={workout.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {(workout.muscleGroups ?? ["Workout"]).map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#252d19] px-3 py-1 text-xs text-[#ccff00]"
            >
              {muscle}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold">{workout.name}</h3>

        <p className="mt-2 text-sm text-gray-400">
          Equipment:{" "}
          {Array.isArray(workout.equipment)
            ? workout.equipment.join(", ")
            : workout.equipment ?? "Not specified"}
        </p>

        <Link
          href={`/workout/${workout.id}`}
          className="mt-5 block rounded-full border border-[#343943] py-3 text-center text-sm font-bold hover:border-[#ccff00] hover:text-[#ccff00]"
        >
          VIEW DETAILS →
        </Link>

        <div className="mt-5 flex items-center justify-between border-t border-[#292d34] pt-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={15} />
            {workout.duration ?? 30} min
          </span>

          <span className="flex items-center gap-1">
            <Flame size={15} />
            {workout.calories ?? 150} kcal
          </span>
        </div>
      </div>
    </article>
  );
}



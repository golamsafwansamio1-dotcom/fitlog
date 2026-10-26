import Image from "next/image";

export default function Banner() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-16 md:grid-cols-2">
      <div>
        <p className="mb-4 text-sm font-bold tracking-widest text-[#ccff00]">
          WORKOUT LIBRARY
        </p>

        <h1 className="text-4xl font-black sm:text-6xl">
          TRAIN WITH INTENT.
          <br />
          <span className="text-[#ccff00]">
            LOG EVERY SET.
          </span>
        </h1>

        <p className="mt-5 max-w-xl leading-7 text-gray-400">
          Explore exercises, build your daily workout plan,
          and keep track of your training.
        </p>

        <a
          href="#library"
          className="mt-7 inline-block rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black hover:bg-lime-300"
        >
          BROWSE WORKOUTS ↓
        </a>
      </div>

      <div className="relative w-full overflow-hidden rounded-2xl">
        <Image
          src="/banner.png"
          alt="Workout banner"
          width={800}
          height={600}
          priority
          className="h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Dumbbell } from "lucide-react";
import {
  getPlan,
  getSaved,
  notifyStorageChanged,
} from "./lib/storage";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function updateCounts() {
      setPlanCount(getPlan().length);
      setSavedCount(getSaved().length);
    }

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("focus", updateCounts);
    window.addEventListener("fitlog-storage-change", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("focus", updateCounts);
      window.removeEventListener("fitlog-storage-change", updateCounts);
    };
  }, []);

  return (
    <nav className="border-b border-[#22262d]">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell size={22} color="#ccff00" />
          <span className="text-xl font-black tracking-wide">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="/"
            className="rounded-full bg-[#202b0d] px-4 py-2 text-sm text-[#ccff00]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-3 py-2 text-sm text-gray-300 hover:text-[#ccff00]"
          >
            My Plan
          </Link>
 
        </div>

        <div className="hidden items-center gap-4 sm:flex">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm"
          >
            Plan
            <span className="rounded-full bg-[#ccff00] px-2 py-1 font-bold text-black">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm"
          >
            Saved
            <span className="rounded-full border border-[#343943] px-2 py-1">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}



"use client";

import { useState } from "react";
import {
  addToPlan,
  saveWorkout,
  notifyStorageChanged,
  type WorkoutItem,
} from "./lib/storage";

export default function WorkoutActions({
  workout,
}: {
  workout: WorkoutItem;
}) {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  function handleAddToPlan() {
    const added = addToPlan(workout);

    if (added) {
      notifyStorageChanged();
      setMessageType("success");
      setMessage("Workout added to your plan!");
    } else {
      setMessageType("error");
      setMessage(
        "Already added, or your plan has reached 5 workouts."
      );
    }
  }

  function handleSave() {
    const saved = saveWorkout(workout);

    if (saved) {
      notifyStorageChanged();
      setMessageType("success");
      setMessage("Workout saved successfully!");
    } else {
      setMessageType("error");
      setMessage("This workout is already saved!");
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleAddToPlan}
          className="rounded-full bg-[#ccff00] px-6 py-3 font-bold text-black transition hover:bg-lime-300"
        >
          + Add to Plan
        </button>

        <button
          onClick={handleSave}
          className="rounded-full border border-gray-600 px-6 py-3 text-white transition hover:border-[#ccff00]"
        >
          Save for Later
        </button>
      </div>

      {message && (
        <div
          role="status"
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            messageType === "success"
              ? "border-[#ccff00] bg-[#202b0d] text-[#ccff00]"
              : "border-red-500 bg-[#2b1515] text-red-300"
          }`}
        >
          {messageType === "success" ? "✓ " : "! "}
          {message}
        </div>
      )}
    </div>
  );
}


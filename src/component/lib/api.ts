
export async function getAllProducts() {
  const response = await fetch(
    "https://api.abcz.workers.dev/api/fitlog",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Workout data load failed");
  }

  return response.json();
}


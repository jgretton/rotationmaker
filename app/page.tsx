"use client";

import VolleyballCourt from "@/components/volleyball-court";
import { useRotation } from "@/hooks/use-rotation";

export default function Home() {
  const { rotate, players, updatePlayers, reset } = useRotation();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans touch-none">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32  sm:items-start touch-none">
        <h1>Rotation Maker</h1>
        <button className="p-4 border rounded-md" onClick={() => rotate()}>
          Rotate
        </button>

        <button className="p-4 border rounded-md" onClick={() => reset()}>
          Reset
        </button>

        <div className="max-w-2xl mx-auto w-full  mt-20 touch-none overflow-hidden">
          <VolleyballCourt players={players} updatePlayers={updatePlayers} />
        </div>
      </main>
    </div>
  );
}

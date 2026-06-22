"use client";

import CoordinateOutput from "@/components/coordinate-output";
import Toolbar from "@/components/toolbar";
import VolleyballCourt from "@/components/volleyball-court";
import { useRotation } from "@/hooks/use-rotation";

export default function Home() {
  const {
    rotate,
    players,
    updatePlayers,
    reset,
    pastePlayerCoordinates,
    coordinateSnapshot,
  } = useRotation();

  return (
    <div className="flex flex-col flex-1 min-h-screen font-sans bg-zinc-50">
      <header className="max-w-7xl mx-auto p-4">
        <h1 className="text-xl font-medium">Rotation Maker</h1>
      </header>
      <main className="flex flex-1 w-full max-w-7xl  flex-col mx-auto px-4">
        <div className="w-full flex flex-col lg:flex-row mt-5 mx-auto gap-5">
          <div className=" w-full flex-1 h-max  mt-5 touch-none  bg-[#0971a3] p-4 rounded-lg">
            <VolleyballCourt players={players} updatePlayers={updatePlayers} />
          </div>
          <div className="mt-4 flex flex-col gap-4 ">
            <h2 className="font-semibold text-lg">Actions</h2>

            <Toolbar rotate={rotate} reset={reset} pastePlayerCoordinates={pastePlayerCoordinates} />
            {coordinateSnapshot && (
              <CoordinateOutput coordinateSnapshot={coordinateSnapshot} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

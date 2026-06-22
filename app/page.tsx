"use client";

import Toolbar from "@/components/toolbar";
import VolleyballCourt from "@/components/volleyball-court";
import { useRotation } from "@/hooks/use-rotation";

export default function Home() {
	const {
		rotate,
		players,
		updatePlayers,
		reset,
		pasteCoords,
		coordinateSnapshot,
	} = useRotation();

	return (
		<div className="flex flex-col flex-1  bg-zinc-50 font-sans touch-none py-10">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center  sm:items-start touch-none">
				<h1 className="text-xl font-medium">Rotation Maker</h1>

				<div className="max-w-2xl mx-auto w-full  mt-5 touch-none overflow-hidden">
					<VolleyballCourt players={players} updatePlayers={updatePlayers} />
				</div>
				<div className="mt-4 mx-auto">
					<Toolbar rotate={rotate} reset={reset} pasteCoords={pasteCoords} />
				</div>
				<div className="mt-10">
					{coordinateSnapshot && (
						<pre>{JSON.stringify(coordinateSnapshot, null, 3)}</pre>
					)}
				</div>
			</main>
		</div>
	);
}

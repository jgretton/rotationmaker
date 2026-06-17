"use client";

import { useState } from "react";

export type PositionCoordinate = {
	position: number;
	x: number;
	y: number;
};
export type PlayerPosition = {
	positionName: string;
	position: number;
};

export default function Home() {
	/* 
    2 array approach
    1 array with base x and y positions for each position, 1-6
    another array with player postion string and their # position on court. then we can compare and add the X Y position based on their playing position.

    When we rotate the players, we just change the player position number.
*/

	const positionCoordinates: PositionCoordinate[] = [
		{ position: 3, x: 45, y: 20 },
		{ position: 2, x: 75, y: 20 },
		{ position: 1, x: 75, y: 70 },
		{ position: 5, x: 15, y: 70 },
		{ position: 4, x: 15, y: 20 },
		{ position: 6, x: 45, y: 70 },
	];

	const initialPlayerPositions: PlayerPosition[] = [
		{ positionName: "S", position: 2 },
		{ positionName: "L", position: 1 },
		{ positionName: "OH2", position: 6 },
		{ positionName: "OP", position: 5 },
		{ positionName: "MB", position: 4 },
		{ positionName: "OH1", position: 3 },
	];

	const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>(
		initialPlayerPositions,
	);

	/*
        This function needs to change...
        we need to check if a MB goes backcourt, then it becomes L, if L goes front court then it becomes MB

        take position name and location
        if MB and 1 then L if L and 4 then MB
    */

	const rotatePositions = () => {
		setPlayerPositions((prev) => {
			const newArray = prev.map((player) => {
				const newPosition = player.position === 1 ? 6 : player.position - 1;
				let newPositionName = player.positionName;

				// Change mb to lib when moving backcourt.
				// change lib to mb when moving front court.
				if (player.positionName === "L" && newPosition === 4) {
					newPositionName = "MB";
				} else if (player.positionName === "MB" && newPosition === 1) {
					newPositionName = "L";
				}

				return {
					positionName: newPositionName,
					position: newPosition,
				};
			});

			return newArray;
		});
	};

	const PlayerIcon = ({ pos, x, y }: { pos: string; x: number; y: number }) => {
		return (
			<div
				className={`size-10 absolute rounded-full bg-gray-600 border-2 border-white flex items-center text-white justify-center`}
				style={{ top: `${y}%`, left: `${x}%` }}
			>
				<span>{pos}</span>
			</div>
		);
	};

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32  sm:items-start">
				<h1>Rotation Maker</h1>
				<button onClick={rotatePositions}>Rotate</button>
				<div className="max-w-2xl mx-auto w-full  mt-20">
					{/* outer */}
					<div className="aspect-square bg-teal-700/30 relative">
						{/* net */}
						<div className="top-0 w-full h-7 bg-mauve-800 z-50 -inset-x-10 absolute right-0 left-0 rounded-lg" />
						{/* 3m extended */}
						{/* court */}
						<div className="inset-x-[7%] aspect-square inset-y-0 bg-orange-500  absolute z-10 rounded-b-md border-3 border-white">
							{/* 3m Line */}
							<div className=" absolute top-[33%] w-full h-1 bg-white" />
							{/* 3m extended */}
							<div className="absolute inset-[-7%] top-[33%] h-1 bg-[repeating-linear-gradient(to_right,white_0_5px,transparent_5px_10px)]" />

							<div className="size-full grid grid-cols-3 grid-rows-2 mt-6 relative">
								{playerPositions.map((player) => {
									const { x, y } = positionCoordinates.find(
										(ps) => ps.position === player.position,
									) ?? { x: 0, y: 0 };
									return (
										<div
											key={player.position}
											className="size-full border border-dashed border-white/50 hover:bg-orange-800/30"
										>
											<PlayerIcon pos={player.positionName} x={x} y={y} />
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

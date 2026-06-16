export default function Home() {
	const positions = [1, 2, 3, 4, 5, 6];

	const playerBasePosition = [
		{ position: "MB", x: 45, y: 20 },
		{ position: "O1", x: 75, y: 20 },
		{ position: "S", x: 75, y: 70 },
		{ position: "O2", x: 15, y: 70 },
		{ position: "OP", x: 15, y: 20 },
		{ position: "L", x: 45, y: 70 },
	];

	/* 
    2 array approach
    1 array with base x and y positions for each position, 1-6
    another array with player postion string and their # position on court. then we can compare and add the X Y position based on their playing position.

    When we rotate the players, we just change the player position number.
*/

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

				<div className="max-w-2xl mx-auto w-full  mt-20">
					{/* outer */}
					<div className="aspect-square bg-teal-700/30 relative">
						{/* net */}
						<div className="top-0 w-full h-7 bg-amber-600 z-50 -inset-x-10 absolute right-0 left-0 rounded-lg" />
						{/* 3m extended */}
						{/* court */}
						<div className="inset-x-[7%] aspect-square inset-y-0 bg-orange-500  absolute z-10 rounded-b-md border-3 border-white">
							{/* 3m Line */}
							<div className=" absolute top-[33%] w-full h-1 bg-white" />
							{/* 3m extended */}
							<div className="absolute inset-[-7%] top-[33%] h-1 bg-[repeating-linear-gradient(to_right,white_0_5px,transparent_5px_10px)]" />

							<div className="size-full grid grid-cols-3 grid-rows-2 mt-6 relative">
								{playerBasePosition.map((player) => (
									<div
										key={player.position}
										className="size-full border border-dashed border-white/50 hover:bg-orange-800/30"
									>
										<PlayerIcon
											pos={player.position}
											x={player.x}
											y={player.y}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

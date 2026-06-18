'use client';
import { useRef, useState } from 'react';

export type PositionCoordinate = {
	position: number;
	x: number;
	y: number;
};
export type PlayerPosition = {
	id: number;
	positionName: string;
	position: number;
	x?: number;
	y?: number;
};

function PlayerIcon({
	player,
	court,
	setPlayerPositions,
}: {
	player: PlayerPosition;
	court: React.RefObject<HTMLDivElement> | null;
	setPlayerPositions: (state: PlayerPosition[]) => void;
}) {
	const { id, positionName: pos, x, y } = player;

	const offsetRef = useRef({ x: 0, y: 0 });

	const clampedRef = useRef({ x: 0, y: 0 });

	const [isDragging, setIsDragging] = useState(false);

	const clamp = (value: number, max: number, min: number) => {
		return Math.min(Math.max(value, min), max);
	};

	return (
		<div
			className={`size-10 absolute rounded-full bg-gray-600 border-2 border-white flex items-center text-white justify-center touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
			style={{ top: `${y}%`, left: `${x}%` }}
			onPointerDown={(event) => {
				offsetRef.current.x =
					event.clientX - event.currentTarget.getBoundingClientRect().left;

				offsetRef.current.y =
					event.clientY - event.currentTarget.getBoundingClientRect().top;

				event.currentTarget.setPointerCapture(event.pointerId);

				setIsDragging(true);
			}}
			onPointerMove={(event) => {
				if (!isDragging) return;
				const courtDimensions = court.current.getBoundingClientRect();
				const positionX =
					((event.clientX - courtDimensions.left - offsetRef.current.x) /
						courtDimensions.width) *
					100;
				const positionY =
					((event.clientY - courtDimensions.top - offsetRef.current.y) /
						courtDimensions.height) *
					100;

				const maxX =
					((courtDimensions.width -
						event.currentTarget.getBoundingClientRect().width) /
						courtDimensions.width) *
					100;

				const maxY =
					((courtDimensions.height -
						event.currentTarget.getBoundingClientRect().height) /
						courtDimensions.height) *
					100;

				const clampedX = clamp(positionX, maxX, 0);
				const clampedY = clamp(positionY, maxY, 0);

				clampedRef.current = {
					x: clampedX,
					y: clampedY,
				};

				event.currentTarget.style.left = `${clampedX}%`;
				event.currentTarget.style.top = `${clampedY}%`;
			}}
			onPointerUp={() => {
				setIsDragging(false);
				setPlayerPositions((prev) => {
					const newArray = prev.map((player) => {
						if (id === player.id) {
							return {
								...player,
								x: clampedRef.current.x,
								y: clampedRef.current.y,
							};
						}
						return player;
					});

					return newArray;
				});
			}}
		>
			<span className="pointer-events-none">{pos}</span>
		</div>
	);
}

export default function Home() {
	const courtRef = useRef<HTMLDivElement>(null);

	const basePositionCoordinates: PositionCoordinate[] = [
		{ position: 3, x: 45, y: 20 },
		{ position: 2, x: 75, y: 20 },
		{ position: 1, x: 75, y: 70 },
		{ position: 5, x: 15, y: 70 },
		{ position: 4, x: 15, y: 20 },
		{ position: 6, x: 45, y: 70 },
	];

	const initialPlayerPositions: PlayerPosition[] = [
		{ id: 1, positionName: 'S', position: 2 },
		{ id: 2, positionName: 'L', position: 1 },
		{ id: 3, positionName: 'OH2', position: 6 },
		{ id: 4, positionName: 'OP', position: 5 },
		{ id: 5, positionName: 'MB', position: 4 },
		{ id: 6, positionName: 'OH1', position: 3 },
	];

	const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>(
		() => {
			return initialPlayerPositions.map((player) => {
				const { x, y } = basePositionCoordinates.find(
					(ps) => ps.position === player.position
				) ?? { x: 0, y: 0 };

				return { ...player, x, y };
			});
		}
	);

	const rotatePositions = () => {
		setPlayerPositions((prev) => {
			const newArray = prev.map((player) => {
				const newPosition = player.position === 1 ? 6 : player.position - 1;
				let newPositionName = player.positionName;

				// Change mb to lib when moving backcourt.
				// change lib to mb when moving front court.
				if (player.positionName === 'L' && newPosition === 4) {
					newPositionName = 'MB';
				} else if (player.positionName === 'MB' && newPosition === 1) {
					newPositionName = 'L';
				}

				const { x, y } = basePositionCoordinates.find(
					(ps) => ps.position === newPosition
				) ?? { x: 0, y: 0 };

				return {
					...player,
					positionName: newPositionName,
					position: newPosition,
					x,
					y,
				};
			});

			return newArray;
		});
	};

	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
			<main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32  sm:items-start">
				<h1>Rotation Maker</h1>
				<button className="p-4 border rounded-md" onClick={rotatePositions}>
					Rotate
				</button>

				<div className="max-w-2xl mx-auto w-full  mt-20">
					{/* outer */}
					<div className="aspect-square bg-teal-700/30 relative">
						{/* net */}
						<div className="top-0 w-full h-7 bg-mauve-800 z-50 -inset-x-10 absolute right-0 left-0 rounded-lg" />
						{/* 3m extended */}
						{/* court */}
						<div
							className="inset-x-[7%] aspect-square inset-y-0 bg-orange-500  absolute z-10 rounded-b-md border-3 border-white mt-7 border-t-0"
							ref={courtRef}
						>
							{/* 3m Line */}
							<div className=" absolute top-[33%] w-full h-1 bg-white" />
							{/* 3m extended */}
							<div className="absolute inset-[-7%] top-[33%] h-1 bg-[repeating-linear-gradient(to_right,white_0_5px,transparent_5px_10px)]" />

							<div className="size-full grid grid-cols-3 grid-rows-2  relative">
								{playerPositions.map((player) => {
									return (
										<PlayerIcon
											player={player}
											key={player.id}
											court={courtRef}
											setPlayerPositions={setPlayerPositions}
										/>
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

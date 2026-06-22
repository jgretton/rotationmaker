export default function Toolbar({
	rotate,
	reset,
	pasteCoords,
}: {
	rotate: () => void;
	reset: () => void;
	pasteCoords: () => void;
}) {
	return (
		<div className="flex flex-row gap-5 flex-wrap w-full ">
			<button className="p-4 border rounded-md" onClick={() => rotate()}>
				Rotate
			</button>
			<button className="p-4 border rounded-md" onClick={() => reset()}>
				Reset
			</button>
			<button className="p-4 border rounded-md" onClick={() => pasteCoords()}>
				Paste Coordinates
			</button>
		</div>
	);
}

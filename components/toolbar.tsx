import { ClipboardPlusIcon, RefreshCwIcon, RotateCcwIcon } from "lucide-react";

export default function Toolbar({
  rotate,
  reset,
  pastePlayerCoordinates,
}: {
  rotate: () => void;
  reset: () => void;
  pastePlayerCoordinates: () => void;
}) {
  return (
    <div className="flex flex-row justify-between gap-2 sm:justify-center flex-wrap w-full ">
      <button
        className="gap-2 py-2 text-sm font-medium px-4 relative inline-flex items-center justify-center rounded-md border border-neutral-300 bg-transparent transition-colors hover:bg-neutral-200 hover:cursor-pointer"
        onClick={() => rotate()}
      >
        <RefreshCwIcon size={16} />
        Rotate
      </button>

      <button
        className="gap-2 py-2 text-sm font-medium px-4 relative inline-flex items-center justify-center rounded-md border border-neutral-300 bg-transparent transition-colors hover:bg-neutral-200 hover:cursor-pointer"
        onClick={() => reset()}
      >
        <RotateCcwIcon size={16} />
        Reset
      </button>
      <button
        className="gap-2 py-2 text-sm font-medium px-4 relative inline-flex items-center justify-center rounded-md border border-neutral-300 bg-transparent transition-colors hover:bg-neutral-200 hover:cursor-pointer"
        onClick={() => pastePlayerCoordinates()}
      >
        <ClipboardPlusIcon size={16} />
        Paste Coordinates
      </button>
    </div>
  );
}

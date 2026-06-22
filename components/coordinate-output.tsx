"use client";

import type { Player } from "@/lib/types";
import { ClipboardCheck, ClipboardIcon } from "lucide-react";
import { useRef, useState } from "react";

export default function CoordinateOutput({
  coordinateSnapshot,
}: {
  coordinateSnapshot: Player[];
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyBoxRef = useRef<HTMLTextAreaElement | null>(null);

  const copyToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else return document.execCommand("copy", true, text);
  };

  const handleCopy = async () => {
    if (copyBoxRef.current === null) return;

    copyToClipboard(copyBoxRef.current.value)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className=" bg-gray-200 border border-gray-300 p-2 relative flex flex-col min-h-0 flex-1">
      <button
        onClick={() => handleCopy()}
        className="gap-2 py-2 text-sm font-medium px-4 inline-flex items-center justify-center rounded-md border border-neutral-300 bg-transparent transition-colors hover:bg-neutral-200 hover:cursor-pointer absolute top-2 right-8"
      >
        {isCopied ? (
          <ClipboardCheck size={16} className="text-green-700" />
        ) : (
          <ClipboardIcon size={16} />
        )}
      </button>
      <textarea
        className="h-100 lg:size-full bg-transparent font-mono text-xs text-gray-700 pr-12 p-2 resize-none outline-none border-none leading-relaxed"
        ref={copyBoxRef}
        value={JSON.stringify(coordinateSnapshot, null, 3)}
        readOnly
      />
    </div>
  );
}

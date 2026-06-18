"use client";

import type { Player } from "@/lib/types";
import { clamp } from "@/lib/utils";
import { useRef, useState } from "react";

export default function PlayerIcon({
  player,
  court,
  updatePlayers,
}: {
  player: Player;
  court: React.RefObject<HTMLDivElement | null>;
  updatePlayers: (id: number, x: number, y: number) => void;
}) {
  const { id, positionName: pos, x, y } = player;

  const offsetRef = useRef({ x: 0, y: 0 });

  const clampedRef = useRef({ x: 0, y: 0 });

  const [isDragging, setIsDragging] = useState(false);

  const hasMoved = useRef(false);

  return (
    <div
      className={`size-10 absolute rounded-full bg-gray-600 border-2 border-white flex items-center text-white justify-center touch-none transition-[scale] ${isDragging ? "cursor-grabbing scale-120 shadow-lg" : "cursor-grab scale"}`}
      style={{ top: `${y}%`, left: `${x}%` }}
      onPointerDown={(event) => {
        hasMoved.current = false;
        offsetRef.current.x =
          event.clientX - event.currentTarget.getBoundingClientRect().left;

        offsetRef.current.y =
          event.clientY - event.currentTarget.getBoundingClientRect().top;

        event.currentTarget.setPointerCapture(event.pointerId);

        setIsDragging(true);
      }}
      onPointerMove={(event) => {
        if (!isDragging) return;
        if (!court.current) return;

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

        hasMoved.current = true;
      }}
      onPointerUp={() => {
        if (!hasMoved.current) {
          setIsDragging(false);
          return;
        }
        updatePlayers(id, clampedRef.current.x, clampedRef.current.y);
        setIsDragging(false);
        hasMoved.current = false;
      }}
    >
      <span className="pointer-events-none">{pos}</span>
    </div>
  );
}

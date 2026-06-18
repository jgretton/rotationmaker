"use client";

import { PlayerPosition } from "@/lib/types";
import { useRef } from "react";
import PlayerIcon from "./player-icon";

export default function VolleyballCourt({
  players,
  updatePlayers,
}: {
  players: PlayerPosition[];
  updatePlayers: (id: number, x: number, y: number) => void;
}) {
  const courtRef = useRef<HTMLDivElement>(null);

  return (
    <div className="aspect-square bg-teal-700/30 relative overflow-hidden">
      {/* net */}
      <div className="top-0 w-full h-7 bg-mauve-800 z-50 -inset-x-10 absolute right-0 left-0 rounded-lg" />
      {/* court */}
      <div
        className="inset-x-[7%] aspect-square inset-y-0 bg-orange-500  absolute z-10 rounded-b-md border-3 border-white mt-7 border-t-0"
        ref={courtRef}
      >
        {/* 3m Line */}
        <div className=" absolute top-[33%] w-full h-1 bg-white" />
        {/* 3m extended */}
        <div className="absolute inset-[-7%] top-[33%] h-1 bg-[repeating-linear-gradient(to_right,white_0_5px,transparent_5px_10px)]" />
        {players.map((player) => {
          return (
            <PlayerIcon
              player={player}
              updatePlayers={updatePlayers}
              key={player.id}
              court={courtRef}
            />
          );
        })}
      </div>
    </div>
  );
}

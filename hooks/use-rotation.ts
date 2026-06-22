import type {
  CourtPosition,
  Player,
  PlayerPosition,
  PositionCoordinate,
} from "@/lib/types";
import { findBaseCoordinate, swapLiberoIfNeeded } from "@/lib/utils";
import { useState } from "react";

const basePositionCoordinates: PositionCoordinate[] = [
  { position: 3, x: 45, y: 20 },
  { position: 2, x: 75, y: 20 },
  { position: 1, x: 75, y: 70 },
  { position: 5, x: 15, y: 70 },
  { position: 4, x: 15, y: 20 },
  { position: 6, x: 45, y: 70 },
];

const initialPlayerPositions: PlayerPosition[] = [
  { id: 1, positionName: "S", position: 2 },
  { id: 2, positionName: "L", position: 1 },
  { id: 3, positionName: "OH2", position: 6 },
  { id: 4, positionName: "OP", position: 5 },
  { id: 5, positionName: "MB", position: 4 },
  { id: 6, positionName: "OH1", position: 3 },
];

export function useRotation() {
  const createInitialPlayers = () => {
    return initialPlayerPositions.map((player) => {
      const { x, y } = findBaseCoordinate(player.position, basePositionCoordinates);

      return { ...player, x, y };
    });
  };

  const [players, setPlayers] = useState<Player[]>(createInitialPlayers);
  const [coordinateSnapshot, setCoordinateSnapshot] = useState<Player[] | null>(
    null,
  );

  const reset = () => {
    setCoordinateSnapshot(null);
    setPlayers((prev) => {
      const newArray = prev.map((player) => {
        const { x, y } = findBaseCoordinate(player.position, basePositionCoordinates);

        return {
          ...player,
          x,
          y,
        };
      });

      return newArray;
    });
  };

  const rotate = () => {
    setCoordinateSnapshot(null);

    setPlayers((prev) => {
      const newArray = prev.map((player) => {
        const newPosition = (
          player.position === 1 ? 6 : player.position - 1
        ) as CourtPosition;
        const newPositionName = swapLiberoIfNeeded(
          player.positionName,
          newPosition,
        );

        const { x, y } = findBaseCoordinate(newPosition, basePositionCoordinates);

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

  const updatePlayers = (id: number, x: number, y: number) => {
    setCoordinateSnapshot(null);

    setPlayers((prev) => {
      const newArray = prev.map((player) => {
        if (id === player.id) {
          return {
            ...player,
            x,
            y,
          };
        }
        return player;
      });

      return newArray;
    });
  };

  const pastePlayerCoordinates = () => {
    setCoordinateSnapshot(players);
  };

  return {
    rotate,
    updatePlayers,
    players,
    reset,
    pastePlayerCoordinates,
    coordinateSnapshot,
  };
}

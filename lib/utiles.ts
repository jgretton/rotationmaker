import type { PositionCoordinate } from "./types";

export const clamp = (value: number, max: number, min: number) => {
  return Math.min(Math.max(value, min), max);
};

export const baseCoorFind = (
  pos: number,
  basePositionCoordinates: PositionCoordinate[],
) => {
  return (
    basePositionCoordinates.find((ps) => ps.position === pos) ?? { x: 0, y: 0 }
  );
};

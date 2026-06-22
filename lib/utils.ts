import type { CourtPosition, PositionCoordinate, RoleName } from "./types";

export const clamp = (value: number, max: number, min: number) => {
  return Math.min(Math.max(value, min), max);
};

export const findBaseCoordinate = (
  pos: CourtPosition,
  basePositionCoordinates: PositionCoordinate[],
) => {
  return (
    basePositionCoordinates.find((ps) => ps.position === pos) ?? { x: 0, y: 0 }
  );
};

export const swapLiberoIfNeeded = (
  positionName: RoleName,
  position: CourtPosition,
) => {
  let newPositionName = positionName;

  if (positionName === "L" && position === 4) {
    newPositionName = "MB";
  } else if (positionName === "MB" && position === 1) {
    newPositionName = "L";
  }

  return newPositionName;
};

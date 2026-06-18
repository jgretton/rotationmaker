export type Coordinates = {
  x: number;
  y: number;
};
export type PositionCoordinate = {
  position: number;
} & Coordinates;

export type CourtPosition = 1 | 2 | 3 | 4 | 5 | 6;
export type RoleName = "S" | "L" | "OH1" | "OH2" | "OP" | "MB";

export type PlayerPosition = {
  id: number;
  positionName: RoleName;
  position: CourtPosition;
};

export type Player = PlayerPosition & Coordinates;

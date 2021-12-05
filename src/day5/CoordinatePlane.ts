export interface CartesianPoint {
  x: number;
  y: number;
}

export interface DataPoint {
  coordinate: CartesianPoint;
  count: number;
}

export interface Line {
  start: CartesianPoint;
  end: CartesianPoint;
  isHorizontal: boolean;
  isVertical: boolean;
}

export type CoordinatePlane = Array<Array<DataPoint>>

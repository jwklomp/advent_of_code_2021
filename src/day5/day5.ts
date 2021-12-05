import { range } from '../lib/utils';

import { CartesianPoint, CoordinatePlane, DataPoint, Line } from './CoordinatePlane';

export const hydrothermalVentsCalculator = (lines: Array<Line>): number => {
  // determine min and max
  const xMin = Math.min(...lines.map((line: Line) => line.start.x), ...lines.map((line: Line) => line.end.x));
  const yMin = Math.min(...lines.map((line: Line) => line.start.y), ...lines.map((line: Line) => line.end.y));
  const xMax = Math.max(...lines.map((line: Line) => line.start.x), ...lines.map((line: Line) => line.end.x));
  const yMax = Math.max(...lines.map((line: Line) => line.start.y), ...lines.map((line: Line) => line.end.y));

  // generate CoordinatePlane
  const rangeX = range(xMin, xMax);
  const rangeY = range(yMin, yMax);
  const coordinatePlane: CoordinatePlane = rangeX.map((x: number) => {
    return rangeY.map((y: number) => {
      return {
        coordinate: {
          x,
          y
        },
        count: 0
      };
    });
  });

  // generate all Cartesian points
  const cartesianPoints: Array<CartesianPoint> = lines.flatMap((line: Line) => {
    if (line.isHorizontal) { // horizontal = same y
      return range(line.start.x, line.end.x).map((x: number) => {
        return {
          x,
          y: line.start.y
        };
      });
    } else if (line.isVertical) { // vertical = same x
      return range(line.start.y, line.end.y).map((y: number) => {
        return {
          x: line.start.x,
          y
        };
      });
    } else { // diagonal, slightly more involved. An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
      return range(line.start.x, line.end.x).map((x: number) => { // result like 9,8,7  or 1,2,3
        // determine correlation of y on x. should be 1 or -1
        const correlation = Math.round((line.start.x - line.end.x) / (line.start.y - line.end.y));
        return {
          x,
          y: line.start.y + (correlation * (x - line.start.x))
        };
      });
    }
  });

  //update the CartesianPlane with the Cartesian points.
  coordinatePlane.forEach((col: Array<DataPoint>) => { // x same for all entries
    const currentX = col[0].coordinate.x;

    // For performance filter Cartesian points so that only points with matching x remain
    const pointsFilteredOnX = cartesianPoints.filter((point: CartesianPoint) => point.x === currentX);

    col.forEach((point: DataPoint) => {
      point.count = pointsFilteredOnX.filter((_point: CartesianPoint) => _point.y === point.coordinate.y).length;
    });

  });

  // loop over all points in Coordinate plane and filter count >  1
  return coordinatePlane.flatMap(((col: Array<DataPoint>) =>
      col.filter((point: DataPoint) => point.count > 1)
  )).length;
};

export const rawLineToLine = ((rawLine: string): Line => {
  const [startRaw, endRaw] = rawLine.split(' -> ');
  const [startXRaw, startYRaw] = startRaw.split(',');
  const [endXRaw, endYRaw] = endRaw.split(',');
  const start: CartesianPoint = { x: parseInt(startXRaw), y: parseInt(startYRaw) };
  const end: CartesianPoint = { x: parseInt(endXRaw), y: parseInt(endYRaw) };
  const isHorizontal = start.y === end.y;
  const isVertical = start.x === end.x;

  // if horizontal (same y ) make sure that x start point less or equal than end
  if (isHorizontal) {
    if (start.x > end.x) {
      const oldStart = start.x;
      start.x = end.x;
      end.x = oldStart;
    }
  }
  // if vertical (same x) make sure that y start less or equal than end
  if (isVertical) {
    if (start.y > end.y) {
      const oldStart = start.y;
      start.y = end.y;
      end.y = oldStart;
    }
  }
  return {
    start,
    end,
    isHorizontal,
    isVertical
  };
});

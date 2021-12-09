import { transpose } from '../lib/utils';

import { Point } from './Point';

/**
 * Part one of the challenge
 * @param heightMap
 */
export const lowPointsCalculator = (heightMap: Array<Array<Point>>): number => {
  const rowLength: number = heightMap[0].length;
  const colLength: number = heightMap.length;

  const updatedHeightMap = markLowestPoints(heightMap, colLength, rowLength)

  // filter out all with lowestCol and lowestRow true and count
  return updatedHeightMap
    .flatMap((row: Array<Point>) =>
      row.map((point: Point) =>
        point.lowestRow && point.lowestCol ? point.height + 1 : 0
      )
    )
    .reduce((partial, a) => partial + a, 0);
};

function markLowestPoints(heightMap: Array<Array<Point>>, colLength: number, rowLength: number) {
  // mark all lowest in row
  heightMap.forEach((row: Array<Point>) => {
    row.forEach((point: Point, index: number) => {
      // now processing cols in row!
      if (index === 0) {
        // first
        point.lowestRow = point.height < row[1].height;
      } else if (index === colLength - 1) {
        // last
        point.lowestRow = point.height < row[index - 1].height;
      } else {
        // in between
        point.lowestRow =
          point.height < row[index - 1].height &&
          point.height < row[index + 1].height;
      }
    });
  });

  // transpose the array, so colls become rows etc
  const transposedHeightMap = transpose(heightMap);

  // repeat with transposed, this marks the lowestCol
  transposedHeightMap.forEach((row: Array<Point>) => {
    row.forEach((point: Point, index: number) => {
      if (index === 0) {
        // first
        point.lowestCol = point.height < row[1].height;
      } else if (index === rowLength - 1) {
        // last
        point.lowestCol = point.height < row[index - 1].height;
      } else {
        // in between
        point.lowestCol =
          point.height < row[index - 1].height &&
          point.height < row[index + 1].height;
      }
    });
  });
  return transposedHeightMap;
}

/**
 * Part two of the challenge
 * @param heightMap
 */
export const basinSizeCalculator = (heightMap: Array<Array<Point>>): number => {
  const rowLength: number = heightMap.length;
  const colLength: number = heightMap[0].length;
  const updatedHeightMap = transpose(markLowestPoints(heightMap, colLength, rowLength));

  const determineHigherAdjacentPointsForPoint = (
    point: Point,
    totalCollectedPoints: Array<Point>
  ): Array<Point> => {
    const collectedPoints: Array<Point> = [];

    // process rows <- and ->
    if (point.rowIndex > 0) {  // will subtract 1 so needs to be > 0
      const previousRowPoint: Point = updatedHeightMap[point.rowIndex - 1][point.colIndex];
      if (!previousRowPoint.processed && previousRowPoint.height !== 9 && previousRowPoint.height > point.height) {
        previousRowPoint.processed = true;
        collectedPoints.push(previousRowPoint);
      }
    }

    if (point.rowIndex < rowLength - 1) {  // will add 1 so needs to be > 0
      const nextRowPoint: Point = updatedHeightMap[point.rowIndex + 1][point.colIndex];
      if (!nextRowPoint.processed && nextRowPoint.height !== 9 && nextRowPoint.height > point.height) {
        nextRowPoint.processed = true;
        collectedPoints.push(nextRowPoint);
      }
    }

    // process column up and down
    const currentRow = updatedHeightMap.filter((_row, rowIndex) => rowIndex === point.rowIndex)[0];
    if (point.colIndex > 0) {  // will subtract 1 so needs to be > 0
      const previousColPoint: Point = currentRow[point.colIndex - 1];
      if (!previousColPoint.processed && previousColPoint.height !== 9 && previousColPoint.height > point.height) {
        previousColPoint.processed = true;
        collectedPoints.push(previousColPoint);
      }
    }

    if (point.colIndex < colLength - 1) {  // will add 1 so needs to be > 0
      const nextColPoint: Point = currentRow[point.colIndex + 1];
      if (!nextColPoint.processed && nextColPoint.height !== 9 && nextColPoint.height > point.height) {
        nextColPoint.processed = true;
        collectedPoints.push(nextColPoint);
      }
    }

    if (collectedPoints.length === 0) {
      return totalCollectedPoints;
    } else {
      return collectedPoints.flatMap((_point: Point) => {
        return determineHigherAdjacentPointsForPoint(
          _point,
          [...new Set([...totalCollectedPoints, ...collectedPoints])]
        );
      });
    }
  };

  const basinSizes: Array<number> = updatedHeightMap.flatMap(
    (row: Array<Point>): Array<number> =>
      row.map((point: Point) => {
          if (point.lowestRow && point.lowestCol) {
            const result = determineHigherAdjacentPointsForPoint(point, []);
            const unique = [...new Set(result)]
            return unique.length + 1
          } else {
            return 0;
          }
        }
      )
  );

  const sortedDescending  = basinSizes.sort(function(a,b){return a - b}).reverse()

  return sortedDescending[0] * sortedDescending[1] * sortedDescending[2];
};

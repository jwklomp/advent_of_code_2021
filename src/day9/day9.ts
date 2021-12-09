import { transpose } from '../lib/utils';

import { Point } from './Point';

export const lowPointsCalculator = (heightMap: Array<Array<Point>>): number => {
  const rowLength: number = heightMap[0].length;
  const colLength: number = heightMap.length;

  // mark all lowest in row
  heightMap.forEach((row: Array<Point>) => {
    row.forEach((point: Point, index: number) => {
      if (index === 0) {
        // first
        point.lowestRow = point.height < row[1].height;
      } else if (index === rowLength - 1) {
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
      } else if (index === colLength - 1) {
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

  // filter out all with lowestCol and lowestRow true and count
  return transposedHeightMap
    .flatMap((row: Array<Point>) =>
      row.map((point: Point) =>
        point.lowestRow && point.lowestCol ? point.height + 1 : 0
      )
    )
    .reduce((partial, a) => partial + a, 0);
};

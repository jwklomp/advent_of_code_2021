import { range } from '../lib/utils';

export const crabSubmarineFuelCalculatorLinearConsumption = (
  horizontalPositions: Array<number>
): number => {
  const xMax = Math.max(...horizontalPositions);

  const positions = range(0, xMax); // important! start with 0!
  const summedDistance: Array<number> = positions.map((currentX: number) =>
    horizontalPositions
      .map((x: number) => Math.abs(x - currentX))
      .reduce((partial, a) => partial + a, 0)
  );

  return Math.min(...summedDistance);
};

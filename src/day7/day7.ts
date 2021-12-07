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

export const crabSubmarineFuelCalculatorExponentialConsumption = (
  horizontalPositions: Array<number>
): number => {
  const xMax = Math.max(...horizontalPositions);

  const positions = range(0, xMax); // important! start with 0!
  const summedFuelConsumption: Array<number> = positions.map((currentX: number) => {
    // array with distances per submarine
    const distances: Array<number> = horizontalPositions.map((x: number) =>
      Math.abs(x - currentX)
    );
    // array with fuel consumption per submarine
    const fuelConsumption: Array<number> = distances.map((x: number) => x * (x + 1) / 2);

    // total fuel
    return fuelConsumption.reduce((partial, a) => partial + a, 0);
  });

  return Math.min(...summedFuelConsumption);
};

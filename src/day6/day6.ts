import { GrowthState } from './GrowthState';

export const growthRateCalculator = (initialState: Array<number>, numberOfDays: number): number => {
  const initialDays = 8;
  const nonInitialDays = 6;

  const growthCycle = (currentState: Array<number>, remainingDays: number): number => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newEntries = currentState.filter((nr: number) => nr === 0).map(_ => initialDays);
    const entriesDecreased = currentState.map((nr: number) => nr === 0 ? nonInitialDays : nr - 1);
    const newState = [...entriesDecreased, ...newEntries];
    if (remainingDays === 1) {
      return newState.length;
    } else {
      return growthCycle(newState, remainingDays - 1);
    }
  };

  // start the calculation
  return growthCycle(initialState, numberOfDays);

};

/**
 * First version is not able to process large number of days as the array gets too long.
 * Remodel the array so that only the number off occurrences are stored.
 * @param initialState
 * @param numberOfDays
 */
export const growthRateCalculatorRemodelled = (initialState: Array<number>, numberOfDays: number): number => {
  const growthCycle = (currentState: GrowthState, remainingDays: number): number => {
    const newNrOfEights = currentState.nrOfZeros;

    const newState: GrowthState = {
      nrOfZeros: currentState.nrOfOnes,
      nrOfOnes: currentState.nrOfTwos,
      nrOfTwos: currentState.nrOfThrees,
      nrOfThrees: currentState.nrOfFours,
      nrOfFours: currentState.nrOfFives,
      nrOfFives: currentState.nrOfSixes,
      nrOfSixes: currentState.nrOfSevens + currentState.nrOfZeros,
      nrOfSevens: currentState.nrOfEights,
      nrOfEights: newNrOfEights
    };

    if (remainingDays === 1) {
      return newState.nrOfZeros
        + newState.nrOfOnes
        + newState.nrOfTwos
        + newState.nrOfThrees
        + newState.nrOfFours
        + newState.nrOfFives
        + newState.nrOfSixes
        + newState.nrOfSevens
        + newState.nrOfEights;
    } else {
      return growthCycle(newState, remainingDays - 1);
    }
  };

  const nrOf = (nr: number) => initialState.filter(it => it === nr).length;

  // start the calculation
  const initialGrowthState: GrowthState = {
    nrOfZeros: nrOf(0),
    nrOfOnes:  nrOf(1),
    nrOfTwos:  nrOf(2),
    nrOfThrees: nrOf(3),
    nrOfFours:  nrOf(4),
    nrOfFives:  nrOf(5),
    nrOfSixes:  nrOf(6),
    nrOfSevens:  nrOf(7),
    nrOfEights:  nrOf(8),
  };

  return growthCycle(initialGrowthState, numberOfDays);

};

/**
 * Part one of the challenge
 * @param lines
 */
import { Cell, Grid2D } from '../lib/Grid2D';

export const octopusFlashCounter = (grid: Grid2D<number>, steps: number): number => {
  let totalFlashes = 0;
  let prevFlashes = 0;
  let flashedInStep: Array<Cell<number>> = [];

  const doFlashRound = (cells: Array<Cell<number>>, initial = false) => {
    const collectedSurroundingFlashRound: Array<Cell<number>> = [];

    cells.forEach((cell: Cell<number>) => {
      if (cell.value > 0 || initial) {
        // Increase all energy levels by 1
        const value = cell.value;
        cell.value = value + 1;

        // determine if > 9, if so determine surrounding and flash
        if (cell.value > 9) {
          flashedInStep.push(cell);
          totalFlashes = totalFlashes + 1;
          cell.value = 0;
          // get surrounding cells
          const surroundingCells = grid.surrounding(cell);
          if (surroundingCells.length > 0) {
            collectedSurroundingFlashRound.push(...surroundingCells);
          }
        }
      }
    });

    // note contains duplicates if cell should be flashed more than once. This is a legitimate situation.
    const collectedNonFlashed = collectedSurroundingFlashRound.filter(it => !flashedInStep.includes(it));
    if (collectedNonFlashed.length > 0) {
      doFlashRound(collectedNonFlashed, false);
    }
  };

  const doStep = (remainingSteps: number): void => {
    flashedInStep = []; // reset flashed cells per round
    const cells = grid.getCells();
    // initial run in a step is with all cells
    doFlashRound(cells, true);
    if ((totalFlashes - prevFlashes) === 100) {
      console.log("all flashed in step ", steps - remainingSteps + 1);
    }
    prevFlashes = totalFlashes;
    if (remainingSteps > 1) {
      return doStep(remainingSteps - 1);
    }
  };

  doStep(steps);
  return totalFlashes;
};

import { Cell, Grid2D } from '../lib/Grid2D';

export const octopusFlashCounter = (grid: Grid2D<number>, steps: number): number => {
  let totalFlashes = 0; // alas, not pure
  let prevFlashes = 0;

  const doFlashRound = (cells: Array<Cell<number>>, initial = false) => {
    const collectedSurrounding: Array<Cell<number>> = [];
    cells.forEach((cell: Cell<number>) => {
      if (cell.value > 0 || initial) {
        cell.value = cell.value + 1; // Increase all energy levels by 1

        if (cell.value > 9) {
          totalFlashes = totalFlashes + 1;
          cell.value = 0;
          const surroundingCells = grid.surrounding(cell);
          if (surroundingCells.length > 0) {
            collectedSurrounding.push(...surroundingCells);
          }
        }
      }
    });

    if (collectedSurrounding.length > 0) {
      doFlashRound(collectedSurrounding, false);
    }
  };

  const doStep = (remainingSteps: number): void => {
    doFlashRound(grid.getCells(), true);
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

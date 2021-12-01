export const numberOfIncreases = (inputData: Array<number>): number =>
  inputData.filter((element: number, index: number) =>
    index > 0 && element > inputData[index - 1]
  ).length;

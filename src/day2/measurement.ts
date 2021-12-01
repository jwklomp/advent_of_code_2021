export const numberOfIncreases = (inputData: Array<number>): number =>
  inputData.filter((element: number, index: number) =>
    index > 0 && element > inputData[index - 1]
  ).length;

export const numberOfIncreasesSlidingWindow = (inputData: Array<number>): number =>
  inputData.filter((element: number, index: number) =>
      index > 2 && (element + inputData[index - 1] + inputData[index - 2]) > (inputData[index - 1] + inputData[index - 2] + inputData[index - 3])
  ).length;

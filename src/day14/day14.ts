const performInsertions = (
  startSequence: Array<string>,
  insertionOperations: Array<[sequence: string, insertChar: string]>,
  nrOfSteps: number
): Array<string> => {
  const insertions = insertionOperations.map((opp: [sequence: string, insertChar: string]) => {
    // create sorted array of insertions
    return startSequence.map((char: string, i: number) => {
      if (i < startSequence.length - 1) { // not last element
        if (opp[0] === char.concat(startSequence[i + 1])) {
          return [i, opp[1]];
        }
      }
    }).filter(it => it !== undefined);
  }).filter(it => it.length > 0);

  // do insertions, keeping track of the correct index to insert
  const newSequence = insertions
    .flatMap(it => it)
    .sort(function(a, b) {
      return a[0] - b[0];
    }).reduce((acc: Array<string>, ins: [number, string], index: number) => {
      const insertAt = ins[0] + index + 1;
      return [...acc.slice(0, insertAt), ins[1], ...acc.slice(insertAt)] as Array<string>;
    }, startSequence);

  if (nrOfSteps > 1) {
    return performInsertions(newSequence as Array<string>, insertionOperations, nrOfSteps - 1);
  } else {
    return newSequence as Array<string>;
  }
};

export const polymerCreator = (
  insertionOperations: Array<[sequence: string, insertChar: string]>
): number => {
  const startString = 'ONHOOSCKBSVHBNKFKSBK';
  const nrOfSteps = 10;
  const resultArray: Array<string> = performInsertions(startString.split(''), insertionOperations, nrOfSteps);
  const counts = [...new Set(resultArray)]
    .map(it => resultArray.filter(_it => it === _it).length)
    .sort(function(a, b) {
      return a - b;
    });

  return counts[counts.length - 1] - counts[0];
};

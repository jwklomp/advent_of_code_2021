interface Transaction {
  sequenceAmounts: Array<[string, number]>,
  insertedChar: [string, number],
}

const performInsertions = (
  charCounter: Map<string, number>,
  combinationCounter: Map<string, number>,
  insertionOperations: Array<[sequence: string, insertChar: string]>,
  nrOfSteps: number
): Map<string, number> => {
  // collect all mutations that should be done to the maps. Sort of like "transactions"
  const transactions: Array<Transaction> = insertionOperations.map(insertOperation => {
    const [seq, char] = insertOperation;
    const nrOfSeq = combinationCounter.get(seq) ?? 0; // find number of times the sequence PQ occurs = X
    if (nrOfSeq > 0) {
      const [seq1, seq2] = seq.split('');
      const sequenceAmount1 = [`${seq1}${char}`, nrOfSeq]; // increase number of PC sequence with X
      const sequenceAmount2 = [`${char}${seq2}`, nrOfSeq]; // increase number of CQ sequence with X
      const sequenceAmount3 = [seq, -nrOfSeq]; // decrease number of NN to 0
      const sequenceAmounts = [sequenceAmount1, sequenceAmount2, sequenceAmount3];
      const insertedChar = [char, nrOfSeq]; // increase number of Cs with X
      return { sequenceAmounts, insertedChar };
    }
  });
  // now update the maps all in one go.
  transactions
    .filter(it => it !== undefined)
    .forEach(transaction => {
      const [char, amount] = transaction.insertedChar;
      const current = charCounter.get(char) ?? 0;
      charCounter.set(char, current + amount);

      transaction.sequenceAmounts.forEach(sa => {
        const [seq, amount] = sa;
        const current = combinationCounter.get(seq) ?? 0;
        combinationCounter.set(seq, current + amount);
      });
    });
  if (nrOfSteps > 1) {
    return performInsertions(charCounter, combinationCounter, insertionOperations, nrOfSteps - 1);
  } else {
    return charCounter;
  }
};

export const polymerCreator = (
  insertionOperations: Array<[sequence: string, insertChar: string]>
): number => {
  const startArray  = 'ONHOOSCKBSVHBNKFKSBK'.split('');
  const nrOfSteps = 40;
  const chars = ['B', 'C', 'F', 'H', 'K', 'N', 'O', 'P', 'S', 'V'];

  const charCounter = new Map<string, number>(chars.map(i => [i, 0])); // map with number of times a character occurs
  startArray.forEach(it => {
    const current = charCounter.get(it) ?? 0;
    charCounter.set(it, current + 1);
  });

  const combinations = chars.flatMap(first => chars.map(second => first + second));
  const combinationCounter = new Map<string, number>(combinations.map(i => [i, 0])); // map with number of times a combination occurs
  startArray.forEach((first, index) => {
    if (index < startArray.length - 1) { // not last character
      const second = startArray[index + 1];
      const key = first + second;
      const current = charCounter.get(key) ?? 0;
      combinationCounter.set(key, current + 1);
    }
  });

  const resultMap: Map<string, number> = performInsertions(charCounter, combinationCounter, insertionOperations, nrOfSteps);

  const counts = Array.from(resultMap.values())
    .filter(it => it > 0)
    .sort(function(a, b) {
      return a - b;
    });

  return counts[counts.length - 1] - counts[0];
};

export const diagnosticsCalculatorGammaEpsilon = (diagnosticsData: Array<Array<string>>): number => {
  const dataLength = diagnosticsData[0].length;

  const gammaBinary = Array.from(Array(dataLength).keys()).map((it: number) => {
    const elementsAtPosition: Array<string> = diagnosticsData.map((line: Array<string>) => line[it]);
    return elementsAtPosition.filter(i => i === '1').length > elementsAtPosition.filter(j => j === '0').length ? '1' : '0';
  });

  const epsilonBinary = Array.from(Array(dataLength).keys()).map((it: number) => {
    const elementsAtPosition: Array<string> = diagnosticsData.map((line: Array<string>) => line[it]);
    return elementsAtPosition.filter(i => i === '1').length > elementsAtPosition.filter(j => j === '0').length ? '0' : '1';
  });

  return parseInt(gammaBinary.join(''), 2) * parseInt(epsilonBinary.join(''), 2);
};

export const diagnosticsCalculatorLifeSupport = (diagnosticsData: Array<Array<string>>): number => {

  const mostCommonFilter = (el: Array<string> ) => el.filter(i => i === '1').length >= el.filter(j => j === '0').length ? '1' : '0';

  const leastCommonFilter = (el: Array<string> ) => el.filter(i => i === '1').length >= el.filter(j => j === '0').length ? '0' : '1';

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const filterBy = (remainder: Array<Array<string>>, currentIndex: number, filterFn: function): Array<Array<string>> | Array<string> => {
    const elementsAtPosition: Array<string> = remainder.map((line: Array<string>) => line[currentIndex]);
    const filterElement = filterFn(elementsAtPosition);
    const newRemainder = remainder.filter((line: Array<string>) => line[currentIndex] === filterElement);

    if (newRemainder.length <= 1) {
      return newRemainder[0];
    } else {
      return filterBy(newRemainder, currentIndex + 1, filterFn);
    }

  };

  const oxygenGeneratorRating = filterBy(diagnosticsData, 0, mostCommonFilter);

  const co2ScrubberRating = filterBy(diagnosticsData, 0, leastCommonFilter);

  return parseInt(oxygenGeneratorRating.join(''), 2) * parseInt(co2ScrubberRating.join(''), 2);
};

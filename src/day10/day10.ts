const openingCharTypes = ['{', '(', '[', '<'];
const closingCharTypes = ['}', ')', ']', '>'];

/**
 * Find all illegal closing characters in a line and return the first one.
 * Returns undefined if no illegal closing chars.
 * @param line
 */
const findIllegalCharInLine = (line: string): string | undefined => {
  const closingCharArray: Array<string> = [];
  const inputCharArray = line.split('');
  return inputCharArray.filter((currentChar: string) => {
    if (openingCharTypes.includes(currentChar)) { // is an opening char
      closingCharArray.push(closingCharTypes[openingCharTypes.indexOf(currentChar)]);
      return false;
    } else { // is a closing char
      if (closingCharArray.length > 0 && closingCharArray[closingCharArray.length - 1] === currentChar) {
        closingCharArray.pop();
        return false;
      } else {
        return true;
      }
    }
  })[0];
};

/**
 * Part one of the challenge
 * @param lines
 */
export const syntaxCheckerCorrupted = (lines: Array<string>): number => {
  const firstIllegalCharacters: Array<string | undefined> = lines.map((line: string) => {
    return findIllegalCharInLine(line);
  });

  const scores: Array<number> = firstIllegalCharacters.map((char: string | undefined) => {
    if (char === '}') {
      return 1197;
    } else if (char === ')') {
      return 3;
    } else if (char === ']') {
      return 57;
    } else if (char === '>') {
      return 25137;
    } else {
      return 0;
    }
  });

  return scores.reduce((partial, a) => partial + a, 0);
};

/**
 * Part two of the challenge
 */
const findMissingClosingChars = (line: string): Array<string> => {
  // TODO using reduce would be cleaner
  const closingCharArray: Array<string> = [];
  const inputCharArray = line.split('');

  inputCharArray.forEach((currentChar: string) => {
    if (openingCharTypes.includes(currentChar)) { // is an opening char
      closingCharArray.push(closingCharTypes[openingCharTypes.indexOf(currentChar)]);
    } else if (closingCharArray.length > 0 && closingCharArray[closingCharArray.length - 1] === currentChar) {
      closingCharArray.pop();
    }
  });
  return closingCharArray;
};

// Note chars need to be processed in reverse order.
const calculateLineScore = (missingChars: Array<string>): number => {
  const processEntry = (remainingChars: Array<string>, totalScore: number): number => {
    let newScore: number = totalScore * 5;
    const currentChar = remainingChars.pop();

    if (currentChar === '}') {
      newScore = newScore + 3;
    } else if (currentChar === ')') {
      newScore = newScore + 1;
    } else if (currentChar === ']') {
      newScore = newScore + 2;
    } else if (currentChar === '>') {
      newScore = newScore + 4;
    }

    if (remainingChars.length > 0) {
      return processEntry(remainingChars, newScore);
    } else {
      return newScore;
    }
  };
  return processEntry(missingChars, 0);
};

export const syntaxCheckerIncomplete = (lines: Array<string>): number => {
  const incompleteLines = lines.filter((line: string) => typeof findIllegalCharInLine(line) === 'undefined');
  const missingClosingCharsPerLine: Array<Array<string>> = incompleteLines.map((line: string) => findMissingClosingChars(line));
  const scorePerLine: Array<number> = missingClosingCharsPerLine.map((missingChars: Array<string>) => calculateLineScore(missingChars))
    .sort(function(a, b) {
      return a - b;
    });
  return scorePerLine[Math.floor(scorePerLine.length / 2)];
};

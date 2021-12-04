import fs from 'fs';

import test from 'ava';
// import { Board } from './Board';

import { bingoGameRunnerToLose, bingoGameRunnerToWin, boardArrayToBoard } from './day4';

test('bingoGameRunnerToWin', (t) => {
  const fileName = './src/day4/boards.txt';

  //const callSequence: Array<number> = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];
  //const callSequence: Array<number> = [15, 18, 8, 11, 21];
  const callSequence = [87, 7, 82, 21, 47, 88, 12, 71, 24, 35, 10, 90, 4, 97, 30, 55, 36, 74, 19, 50, 23, 46, 13, 44, 69, 27, 2, 0, 37, 33, 99, 49, 77, 15, 89, 98, 31, 51, 22, 96, 73, 94, 95, 18, 52, 78, 32, 83, 85, 54, 75, 84, 59, 25, 76, 45, 20, 48, 9, 28, 39, 70, 63, 56, 5, 68, 61, 26, 58, 92, 67, 53, 43, 62, 17, 81, 80, 66, 91, 93, 41, 64, 14, 8, 57, 38, 34, 16, 42, 11, 86, 72, 40, 65, 79, 6, 3, 29, 60, 1];

  // const board1Input = [[22, 13, 17, 11, 0],
  //   [8, 2, 23, 4, 24],
  //   [21, 9, 14, 16, 7],
  //   [6, 10, 3, 18, 5],
  //   [1, 12, 20, 15, 19]];
  //
  // const board2Input = [[3, 15, 0, 2, 22],
  //   [9, 18, 13, 17, 5],
  //   [19, 8, 7, 25, 23],
  //   [20, 11, 10, 24, 4],
  //   [14, 21, 16, 12, 6]];
  //
  // const board3Input = [[14, 21, 17, 24, 4],
  //   [10, 16, 15, 9, 19],
  //   [18, 8, 23, 26, 20],
  //   [22, 11, 13, 6, 5],
  //   [2, 0, 12, 3, 7]];
  //
  // const boards: Array<Board> = [boardArrayToBoard(board1Input), boardArrayToBoard(board2Input), boardArrayToBoard(board3Input)];
  //
  // const result = bingoGameRunner(callSequence, boards);
  // t.is(result, 4512);

  const rawData = fs.readFileSync(fileName, 'utf8');

  // split into boards based on there being a blank line in between boards
  const rawBoardsAsLines: Array<string> = rawData.split('\r\n\r\n');

  // create raw boards
  const rawBoards: Array<Array<string>> = rawBoardsAsLines.map(rawBoardAsLines => rawBoardAsLines.split('\r\n'));

  // create raw board arrays. This is a 3d array with numbers
  const rawBoardArrays: Array<Array<Array<number>>> = rawBoards.map(rawBoard => {
      const board = rawBoard.map(line => {
          const lineArray: Array<string> = line.split(' ');
          // filter out empties because single digits have an extra space
          const filteredLine: Array<string> = lineArray.filter(it => it.length > 0);
          return filteredLine.map(it => parseInt(it));
        }
      );
      // filter out empty arrays that can occur due to extra empty lines in file
      return board.filter(it => it.length > 0);
    }
  );

  // convert to the actual boards that can be used.
  const boards = rawBoardArrays.map(board => boardArrayToBoard(board));

  const result = bingoGameRunnerToWin(callSequence, boards);
  t.is(result, 89001);

});


test('bingoGameRunnerToLose', (t) => {
  const fileName = './src/day4/boards.txt';

  //const callSequence: Array<number> = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18, 20, 8, 19, 3, 26, 1];
  //const callSequence: Array<number> = [15, 18, 8, 11, 21];
  const callSequence = [87, 7, 82, 21, 47, 88, 12, 71, 24, 35, 10, 90, 4, 97, 30, 55, 36, 74, 19, 50, 23, 46, 13, 44, 69, 27, 2, 0, 37, 33, 99, 49, 77, 15, 89, 98, 31, 51, 22, 96, 73, 94, 95, 18, 52, 78, 32, 83, 85, 54, 75, 84, 59, 25, 76, 45, 20, 48, 9, 28, 39, 70, 63, 56, 5, 68, 61, 26, 58, 92, 67, 53, 43, 62, 17, 81, 80, 66, 91, 93, 41, 64, 14, 8, 57, 38, 34, 16, 42, 11, 86, 72, 40, 65, 79, 6, 3, 29, 60, 1];

  // const board1Input = [[22, 13, 17, 11, 0],
  //   [8, 2, 23, 4, 24],
  //   [21, 9, 14, 16, 7],
  //   [6, 10, 3, 18, 5],
  //   [1, 12, 20, 15, 19]];
  //
  // const board2Input = [[3, 15, 0, 2, 22],
  //   [9, 18, 13, 17, 5],
  //   [19, 8, 7, 25, 23],
  //   [20, 11, 10, 24, 4],
  //   [14, 21, 16, 12, 6]];
  //
  // const board3Input = [[14, 21, 17, 24, 4],
  //   [10, 16, 15, 9, 19],
  //   [18, 8, 23, 26, 20],
  //   [22, 11, 13, 6, 5],
  //   [2, 0, 12, 3, 7]];
  //
  // const boards: Array<Board> = [boardArrayToBoard(board1Input), boardArrayToBoard(board2Input), boardArrayToBoard(board3Input)];
  //
  // const result = bingoGameRunnerToLose(callSequence, boards);
  // t.is(result, 1924);

  const rawData = fs.readFileSync(fileName, 'utf8');

  // split into boards based on there being a blank line in between boards
  const rawBoardsAsLines: Array<string> = rawData.split('\r\n\r\n');

  // create raw boards
  const rawBoards: Array<Array<string>> = rawBoardsAsLines.map(rawBoardAsLines => rawBoardAsLines.split('\r\n'));

  // create raw board arrays. This is a 3d array with numbers
  const rawBoardArrays: Array<Array<Array<number>>> = rawBoards.map(rawBoard => {
      const board = rawBoard.map(line => {
          const lineArray: Array<string> = line.split(' ');
          // filter out empties because single digits have an extra space
          const filteredLine: Array<string> = lineArray.filter(it => it.length > 0);
          return filteredLine.map(it => parseInt(it));
        }
      );
      // filter out empty arrays that can occur due to extra empty lines in file
      return board.filter(it => it.length > 0);
    }
  );

  // convert to the actual boards that can be used.
  const boards = rawBoardArrays.map(board => boardArrayToBoard(board));

  const result = bingoGameRunnerToLose(callSequence, boards);
  t.is(result, 7296);

});



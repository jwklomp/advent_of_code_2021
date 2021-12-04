import { Board, BoardGridItem } from './Board';

/**
 * Determine the score of the winning board
 * @param callSequence
 * @param boards
 */
export const bingoGameRunnerToWin = (callSequence: Array<number>, boards: Array<Board>): number => {

  const markNumberOnBoards = (number: number) => {
    boards.forEach((board: Board) => {
      board.forEach((row: Array<BoardGridItem>) => {
        row.forEach((item: BoardGridItem) => {
          if (item.nr === number) {
            item.marked = true;
          }
        });
      });
    });
  };

  // assumption: only one board wins per round.
  const determineWinningBoard = (): Board | null => {
    const gridLength = boards[0].length;
    let wonBoard = null;

    boards.forEach((board: Board) => {
      const hasRowWon: boolean = board.some((row: Array<BoardGridItem>): boolean =>
        row.every((item: BoardGridItem) => item.marked)
      );

      const hasColWon: boolean =
        Array.from(Array(gridLength).keys()).some((it: number) => {
          const elementsAtPosition: Array<BoardGridItem> = board.map((line: Array<BoardGridItem>) => line[it]);
          return elementsAtPosition.every((item: BoardGridItem) => item.marked);
        });

      if (hasRowWon || hasColWon) {
        wonBoard = board;
      }

    });
    return wonBoard;
  };

  const calculateWinningScore = (winningBoard: Board, winningNumber: number) => {
    const sumUnmarked = winningBoard.flatMap((row: Array<BoardGridItem>) => row.map(it => it.marked ? 0 : it.nr))
      .reduce((partial, a) => partial + a, 0);

    return sumUnmarked * winningNumber;
  };

  const playNewRound = (numberIndex: number): number => {
    const number = callSequence[numberIndex];
    markNumberOnBoards(number);
    const winningBoard = determineWinningBoard();
    if (winningBoard === null) {
      return playNewRound(numberIndex + 1);
    } else {
      return calculateWinningScore(winningBoard, number);
    }
  };

  // Start playing the game.
  return playNewRound(0);
};

/**
 * Determine the score of the losing board
 * @param callSequence
 * @param boards
 */
export const bingoGameRunnerToLose = (callSequence: Array<number>, boards: Array<Board>): number => {
  let winningBoard: Board | null = null;
  let winningScore = 0;

  const markNumberOnBoards = (number: number) => {
    boards.forEach((board: Board) => {
      board.forEach((row: Array<BoardGridItem>) => {
        row.forEach((item: BoardGridItem) => {
          if (item.nr === number) {
            item.marked = true;
          }
        });
      });
    });
  };

  // assumption: there will always be at least 1 board that has not won.
  const determineBoardsNotWon = (): Array<Board> => {
    const gridLength = boards[0].length;

    return boards.filter((board: Board) => {
      const noRowsWon = !board.some((row: Array<BoardGridItem>): boolean =>
        row.every((item: BoardGridItem) => item.marked)
      );

      const noColsWon =
        !Array.from(Array(gridLength).keys()).some((it: number) => {
          const elementsAtPosition: Array<BoardGridItem> = board.map((line: Array<BoardGridItem>) => line[it]);
          return elementsAtPosition.every((item: BoardGridItem) => item.marked);
        });

      // only return the board if not won.
      return noRowsWon && noColsWon;
    });

  };

  const calculateWinningScore = (winningBoard: Board, winningNumber: number) => {
    const sumUnmarked = winningBoard.flatMap((row: Array<BoardGridItem>) => row.map(it => it.marked ? 0 : it.nr))
      .reduce((partial, a) => partial + a, 0);

    return sumUnmarked * winningNumber;
  };

  const playNewRound = (numberIndex: number): number => {

    const number = callSequence[numberIndex];
    markNumberOnBoards(number);
    // TODO could make more efficient by only processing remaining boards, but leaving it for now
    const boardNotWon = determineBoardsNotWon();

    // continue as long as there is more than 1 board left that has not won.
    // if there is one board left, this is the board.
    // continue playing until there are no boards left to get the last number.
    if (boardNotWon.length > 1) {
      playNewRound(numberIndex + 1);
    } else if (boardNotWon.length === 1) {
      winningBoard = boardNotWon[0];
      playNewRound(numberIndex + 1);
    } else {
        if (winningBoard !== null) {
          winningScore = calculateWinningScore(winningBoard, number);
        }
    }

    return winningScore;
  };

  // Start playing the game.
  return playNewRound(0);
};


export const boardArrayToBoard = ((boardArray: Array<Array<number>>): Board =>
  boardArray.map((row: Array<number>) =>
    row.map((item: number) => {
      return { nr: item, marked: false };
    })));

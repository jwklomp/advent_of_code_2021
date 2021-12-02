import { PositionCommand } from './PositionCommand';

export const positionCalculator = (positionCommands: Array<PositionCommand>): number => {
  let x = 0;
  let y = 0;
  positionCommands.forEach(cur => {
    if (cur.commandType === 'forward') {
      x += cur.amount;
    } else if (cur.commandType === 'up') {
      y -= cur.amount;
    } else if (cur.commandType === 'down') {
      y += cur.amount;
    }
  });

  return x * y;
};

export const positionCalculatorWithAim = (positionCommands: Array<PositionCommand>): number => {
  let x = 0;
  let y = 0;
  let aim = 0;
  positionCommands.forEach(cur => {
    if (cur.commandType === 'forward') {
      x += cur.amount;
      y += aim * cur.amount;
    } else if (cur.commandType === 'up') {
      aim -= cur.amount;
    } else if (cur.commandType === 'down') {
      aim += cur.amount;
    }
  });

  return x * y;
};

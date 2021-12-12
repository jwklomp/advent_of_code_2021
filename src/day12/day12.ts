import { Cave, Connection } from './Cave';

const determinePaths = (connections: Array<Connection>): Array<Array<Connection>> => {
  const foundPaths: Array<Array<Connection>> = [];

  // important: this function must be pure
  const iterate = (currentConnections: Array<Connection>, path: Array<Connection>, unallowedCodes: Array<string>) => {
    currentConnections.forEach(currConn => {
      // if to is end: add end to path add to foundPaths and stop
      if (currConn.to.isEnd) {
        foundPaths.push([...path, currConn]);
      }
      // if endpoint is not allowed, stop (=> so continue if this is not the case)
      if (!unallowedCodes.includes(currConn.to.code)) {
        const newConnections = connections.filter(it => it.from.code === currConn.to.code);
        iterate(newConnections, [...path, currConn], currConn.from.isAllowedOnce ? [...unallowedCodes, currConn.from.code] : unallowedCodes);
      }
    });
  };

  const startConnections: Array<Connection> = connections.filter(it => it.from.isStart);

  // do iteration loop
  iterate(startConnections, [], []);


  return foundPaths;
};

export const passagePathCalculator = (connectionStrings: Array<string>): number => {
  // create array of all caves based on connections
  const distinctCaveNames = [...new Set(connectionStrings.flatMap(it => it.split('-')))];

  const caves: Array<Cave> = distinctCaveNames.map(it => {
    return {
      code: it,
      isAllowedOnce: it.toLowerCase() === it,
      isStart: it === 'start',
      isEnd: it === 'end'
    };
  });

  // create array of all connections
  const connectionsWithDoubles: Array<Connection> = connectionStrings
    .reduce((previousValue: Array<Connection>, currentValue: string) => {
      const [from, to] = currentValue.split('-');
      const se: Connection = {
        from: caves.filter(it => it.code === from)[0],
        to: caves.filter(it => it.code === to)[0]
      };
      const es: Connection = {
        from: caves.filter(it => it.code === to)[0],
        to: caves.filter(it => it.code === from)[0]
      };
      return [...previousValue, se, es];
    }, [])
    .filter(it => it.to.code !== 'start')
    .filter(it => it.from.code !== 'end');

  const connectionsWithDeads: Array<Connection> = [...new Set(connectionsWithDoubles)];

  // remove connections to small caves that are only connected to a small cave. This is a dead branch.
  const deadBranchFromCodes: Array<string> = connectionsWithDeads
    .filter(it => it.from.isAllowedOnce && !it.from.isEnd) // from must be a small one
    .filter((start: Connection) => {
    const ends: Array<Cave> = connectionsWithDeads.filter(it => it.from.code === start.from.code).map(conn => conn.to);
    return ends.every(end => end.isAllowedOnce && !end.isEnd);
  }).map(it => it.from.code);

  const connections: Array<Connection> = connectionsWithDeads.filter(it => !deadBranchFromCodes.includes(it.from.code) && !deadBranchFromCodes.includes(it.to.code));

  const paths: Array<Array<Connection>> = determinePaths(connections);

  return paths.length;
};

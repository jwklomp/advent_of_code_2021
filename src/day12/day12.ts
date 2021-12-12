import { Cave, Connection } from './Cave';

const determinePaths = (connections: Array<Connection>, caves: Array<Cave>): Array<Array<Connection>> => {
  const foundPaths: Array<Array<Connection>> = [];

  // important: this function must be pure so that each recursion path has its own data and does not share state
  const iterate = (currentConnections: Array<Connection>, path: Array<Connection>, currentCaves: Array<Cave>, hasExtra: boolean) => {
    currentConnections.forEach(currConn => {
      // if to is end: add end to path add to foundPaths and stop
      if (currConn.to.isEnd) {
        foundPaths.push([...path, currConn]);
      }
      // only continue if end cave has remaining visits or if extra still true
      const caveTo = currentCaves.filter(cave => cave.code === currConn.to.code)[0];
      if (caveTo.nrRemainingVisits > 0 || hasExtra) {
        // once extra is false, it must never become true again.
        let newExtra: boolean = hasExtra;
        if (caveTo.nrRemainingVisits <= 0){
          newExtra = false;
        }

        const newCaves = [...currentCaves].filter(it => it.code !== caveTo.code);
        const newCave = {
          code: caveTo.code,
          nrRemainingVisits: caveTo.nrRemainingVisits - 1,
          isStart: caveTo.isStart,
          isEnd: caveTo.isEnd
        };
        const newConnections = connections.filter(it => it.from.code === currConn.to.code);
        iterate(newConnections, [...path, currConn], [...newCaves, newCave], newExtra);
      }
    });
  };

  const startConnections: Array<Connection> = connections.filter(it => it.from.isStart);
  // do main iteration loop
  iterate(startConnections, [], [...caves], true);

  return foundPaths;
};

export const passagePathCalculator = (connectionStrings: Array<string>): number => {
  // create array of all caves based on connections
  const distinctCaveNames = [...new Set(connectionStrings.flatMap(it => it.split('-')))];

  const caves: Array<Cave> = distinctCaveNames.map(it => {
    return {
      code: it,
      nrRemainingVisits: it.toLowerCase() === it ? 1 : 9999999,
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

  const connections: Array<Connection> = [...new Set(connectionsWithDoubles)];

  const paths: Array<Array<Connection>> = determinePaths(connections, caves);

  const pathStrings: Array<string> = paths.map(path => {
    return path.map(conn => conn.from.code).join(',') + ',' + path[path.length - 1].to.code;
  });

  return pathStrings.length;
};

export interface Cave {
  code: string;
  nrRemainingVisits: number;
  isStart: boolean;
  isEnd: boolean;
}

export interface Connection {
  from: Cave;
  to: Cave;
}

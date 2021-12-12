export interface Cave {
  code: string;
  isAllowedOnce: boolean;
  isStart: boolean;
  isEnd: boolean;
}

export interface Connection {
  from: Cave;
  to: Cave;
}

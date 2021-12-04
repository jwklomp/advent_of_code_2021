export interface BoardGridItem {
  nr: number;
  marked: boolean;
}

export type Board = Array<Array<BoardGridItem>>

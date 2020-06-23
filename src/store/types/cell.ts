import { UPDATE_CELL } from ".";



interface updateCell{
  type: typeof UPDATE_CELL;
  payload?: any;
}

export type cellActions = updateCell;

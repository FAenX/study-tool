import { cellReducer } from "../types/reducer";
import { UPDATE_CELL } from "../types";
import {updateCell} from '../actions/cellActions'
import { cellActions } from "../types/cell";

const initState: cellReducer = {
  color: "grey",
  id: 1,
  status: "inactive"
};


const cell = (state = initState, action: cellActions): cellReducer => {

  const { type, payload } = action;
  switch (type) {
    case UPDATE_CELL:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default cell;

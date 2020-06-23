export interface CellState{color: string, status: string}
export interface CellAction{type: string, state: CellState}


const initialState: CellState = {
    color: 'grey',
    status: "inactive",
}; 

//action
const TOGGLE_COLOR = 'TOGGLE_COLOR';


//action -----
export const toggleColor = (state: CellState) => ({
  type: TOGGLE_COLOR, state
});


//reducer
export default (state = initialState, action: CellAction) => {
    switch (action.type) {
      case TOGGLE_COLOR:
        return { ...state, status: action.state };
      default:
        return state;
    }
  };


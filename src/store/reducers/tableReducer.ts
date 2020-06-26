export interface CellState{ activeId?: number| null, done: Array<number>}
export interface CellAction{type: string, state: CellState}


const initialState: CellState = {
    activeId: null,
    done: [],
}; 

//action
const TOGGLE_STATE = 'TOGGLE_STATE';


//action -----
export const tableReducer = (state: CellState) => ({
  type: TOGGLE_STATE, state
});


//reducer
export default (state = initialState, action: CellAction) => {
    switch (action.type) {
      case TOGGLE_STATE:
        return {...action.state};
      default:
        return state;
    }
  };


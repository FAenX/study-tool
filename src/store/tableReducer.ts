export interface TableState{ 
  activeId: number| null, 
  done: Array<number>,
  active: boolean,
}
export interface CellAction{
  type: string, 
  state: TableState
}


const initialState: TableState = {
    activeId: null,
    done: [],
    active: false,    
}; 

//action
const TOGGLE_STATE = 'TOGGLE_STATE';


//action -----
export const tableAction = (state: TableState) => ({
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


export interface TableState{ 
  activeId: number| null, 
  done: Array<number>,
  active: boolean,
  day: string,
  id?: string
}
export interface CellAction{
  type: string, 
  state: TableState
}


const initialState: TableState = {
    activeId: null,
    done: [],
    active: false, 
    day: '',
}; 

//action
const SET_TABLE_DATA = 'SET_TABLE_DATA';


//action -----
export const setTableData = (state: TableState) => ({
  type: SET_TABLE_DATA, state
});



//reducer
export default (state = initialState, action: CellAction) => {
    switch (action.type) {
      case SET_TABLE_DATA:
        return {...action.state}
      default:
        return state;
    }
  };


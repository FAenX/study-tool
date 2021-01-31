export interface TableState{ 
  activeId: number| null, 
  done: number | null,
  active: boolean,
  day: string,
}

export interface CellAction{
  type: string, 
  state: TableState
}


const initialState: TableState = {
    activeId: null,
    done: null,
    active: false, 
    day: '',
}; 

//reducer
export default (state = initialState, action: CellAction) => {
    switch (action.type) {
      case 'SET_TABLE_DATA':
        return {...action.state}
      default:
        return state;
    }
  };


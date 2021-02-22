export interface Table{ 
  activeId: number| null, 
  done: number | null,
  active: boolean,
  day: string,
}

export interface history{
  history: number[]
}

export interface ActiveTableAction{
  type: string, 
  state: Table
}
export interface HistoryAction{
  type: string, 
  state: History
}


//reducer
export const activeTableReducer = (state = null, action: ActiveTableAction) => {
    switch (action.type) {
      case 'SET_TABLE_DATA':
        return {...action.state}
      default:
        return state;
    }
  };

export const historyReducer = (state=null, action:HistoryAction)=>{
  switch (action.type){
    case 'SET_HISTORY':
      return {...action.state}
    default:
      return state;
  }
}


export interface State{ 
   loading: boolean | null
}

export interface SetState{
    type: string, 
    state: State,
}

  
const initialState: State = {
    loading: false
}; 
  
  
//reducer
export default (state = initialState, action: SetState) => {
    switch (action.type) {
      case 'SET_LOADER':
        return {...action.state};
      default:
        return state;
    }
};
  
  
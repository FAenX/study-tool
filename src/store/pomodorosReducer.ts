export interface Pomodoros{ 
    pomodoros: string[]
}

export interface SetData{
    type: string, 
    state: Pomodoros
}

  
  const initialState: Pomodoros = {
     pomodoros: []
  }; 
  
  //action
 const SET_DATA = 'SET_DATA';
  
  
  //action -----
  export const setData = (state: Pomodoros) => ({
    type: SET_DATA, state
  });
  
  
  //reducer
  export default (state = initialState, action: SetData) => {
      switch (action.type) {
        case SET_DATA:
          return {...action.state};
        default:
          return state;
      }
    };
  
  
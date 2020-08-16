export interface User{ 
    id: string
}

export interface SetUser{
    type: string, 
    state: User
}

  
  const initialState: User = {
     id: ''
  }; 
  
  //action
 const SET_USER = 'SET_USER';
  
  
  //action -----
export const setUser= (state: User) => ({
    type: SET_USER, state
});
  
  
  //reducer
  export default (state = initialState, action: SetUser) => {
      switch (action.type) {
        case SET_USER:
          return {...action.state};
        default:
          return state;
      }
    };
  
  
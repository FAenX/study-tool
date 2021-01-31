export interface State{ 
    isloggedin: boolean | null
}

export interface Component{ 
    component: string | null
}


// 
export interface SetState{
    type: string, 
    state: State
}

export interface SetComponent{
    type: string, 
    state: Component
}
//

const initialComponent: Component ={
    component: null
}

  
const initialState: State = {
    isloggedin: null
}; 
  
  
//reducer
export function loggedInStatus (state = initialState, action: SetState)  {
    switch (action.type) {
      case 'SET_LOGGED_IN_STATUS':
        return action.state;
      default:
        return state;
    }
};

//reducer
export function logInOrSignUp (state = initialState, action: SetComponent)  {
    switch (action.type) {
      case 'SET_COMPONENT':
        return action.state;
      default:
        return state;
    }
};
  
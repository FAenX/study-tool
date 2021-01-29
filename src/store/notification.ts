export interface Component{ 
    component: string | null, 
    message: string | null,
    color: string | null, 
    loading: boolean
}

export interface SetComponent{
    type: 'SET_NOTIFICATION', 
    state: Component,
}

  
const initialState: Component = {
    component: null,
    message: null,
    color: null,
    loading: false
}; 
  
  
//reducer
export default (state = initialState, action: SetComponent) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return {...action.state};
      default:
        return state;
    }
};
  
  
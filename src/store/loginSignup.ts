import Login from '../components/login'

export interface Component{ 
    component: string | null
}

export interface SetComponent{
    type: 'SET_COMPONENT', 
    state: Component
}

  
const initialState: Component = {
    component: null
}; 
  
  
//reducer
export default (state = initialState, action: SetComponent) => {
    switch (action.type) {
      case 'SET_COMPONENT':
        return action.state;
      default:
        return state;
    }
};
  
  
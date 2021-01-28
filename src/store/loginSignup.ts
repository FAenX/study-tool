import Login from '../components/login'

export interface Component{ 
    component: JSX.Element | string
}

export interface SetComponent{
    type: string, 
    state: JSX.Element
}

  
  const initialState: Component = {
     component: ''
  }; 
  
  
  //action -----
export const SetComponent = (state: JSX.Element) => ({
    type: 'SET_COMPONENT', state
});
  
  
  //reducer
  export default (state = initialState, action: SetComponent) => {
      switch (action.type) {
        case 'SET_COMPONENT':
          return action.state;
        default:
          return state;
      }
    };
  
  
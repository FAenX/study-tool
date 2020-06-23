const initialState = {
    color: 'grey'
}; 

//action
const TOGGLE_COLOR = 'TOGGLE_COLOR';


//action -----
export const toggleColor = color => ({
  type: TOGGLE_COLOR, color
});


//reducer
export default (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_COLOR:
        return { ...state, color: action.color };
      default:
        return state;
    }
  };


export interface TimerState{ 
    startTime: string | null,
    endTime: string | null,
    active: boolean,
    progress: number,
    countDown: string
}

export interface TimerAction{
    type: string, 
    state:TimerState
}
  
  
const initialState: TimerState = {
    startTime: null,
    active: false,
    progress: 0,
    countDown: "00:00",
    endTime: null
    
}; 

//action
const TOGGLE_TIMER = 'TOGGLE_TIMER';


//action -----
export const timerAction = (state: TimerState) => ({
type: TOGGLE_TIMER, state
});


//reducer
export default (state = initialState, action: TimerAction) => {
    switch (action.type) {
    case TOGGLE_TIMER:
        return {...action.state};
    default:
        return state;
    }
};


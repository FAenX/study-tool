import { combineReducers } from 'redux';
import tableReducer from './tableReducer';
import timerReducer from './timerReducer';
import pomodorosReducer from './pomodorosReducer'
import userReducer from './userReducer'
import loginSignup from './loginSignup'
import notification from './notification'

const rootReducer = combineReducers({
        loginSignup,
        tableReducer,
        timerReducer, 
        pomodorosReducer, 
        userReducer,
        notification
    });
export default rootReducer

export type AppState = ReturnType<typeof rootReducer>;
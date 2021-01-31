import { combineReducers } from 'redux';
import tableReducer from './tableReducer';
import timerReducer from './timerReducer';
import pomodorosReducer from './pomodorosReducer'
import userReducer from './userReducer'
import {loggedInStatus, logInOrSignUp} from './logged-in-status'
import notification from './notification'
import loader from './loader'

const rootReducer = combineReducers({
        loggedInStatus,
        logInOrSignUp,
        tableReducer,
        timerReducer, 
        pomodorosReducer, 
        userReducer,
        notification,
        loader
    });
export default rootReducer

export type AppState = ReturnType<typeof rootReducer>;
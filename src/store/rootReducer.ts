import { combineReducers } from 'redux';
import tableReducer from './tableReducer';
import timerReducer from './timerReducer';
import pomodorosReducer from './pomodorosReducer'

const rootReducer = combineReducers({ tableReducer, timerReducer, pomodorosReducer });
export default rootReducer

export type AppState = ReturnType<typeof rootReducer>;
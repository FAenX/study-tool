import { combineReducers } from 'redux';
import tableReducer from './tableReducer';
import timerReducer from './timerReducer'

const rootReducer = combineReducers({ tableReducer, timerReducer });
export default rootReducer

export type AppState = ReturnType<typeof rootReducer>;
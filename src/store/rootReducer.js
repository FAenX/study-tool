import { combineReducers } from 'redux';
import tableReducer from './tableReducer';
import timerReducer from './timerReducer'

export default combineReducers({ tableReducer, timerReducer });
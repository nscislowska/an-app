import { combineReducers } from 'redux';
import { sessionReducer } from './sessionReducer';
import { chatReducer } from './chatReducer';

export default combineReducers({
    sessionReducer,
    chatReducer
})
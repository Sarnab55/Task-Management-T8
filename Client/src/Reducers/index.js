import {combineReducers} from 'redux'
import currentUserReducer from './currentUser'
import authReducer from './auth'
export default combineReducers({
    currentUserReducer,
    authReducer
    // Add reducers here
})
import { combineReducers } from 'redux';
import {
  REQUEST_LOGIN, RECEIVE_LOGIN, LOGOUT
} from '../actions';


const user = (state = {
  loggedIn: false,
  loginIncorrect: false,
  loginRequested: false
}, action) => {
  switch(action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        loginRequested: true,
        loginIncorrect: false
      };
    case RECEIVE_LOGIN:
      return {
        ...state,
        ...action.user,
        loginRequested: false
      }
    case LOGOUT: 
      return {
        ...state,
        ...action.user,
        loginIncorrect: false
      }
    default: 
      return state;
  }
}

const rootReducer = combineReducers({
  user
});

export default rootReducer;
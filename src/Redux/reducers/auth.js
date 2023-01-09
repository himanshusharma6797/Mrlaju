// register/login/logout
// Auth Reducer
// The Auth reducer will update the isLoggedIn and user state of the application.

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    FORGOT_FAIL,
    FORGOT_SUCCESS,
    LOGOUT,
  } from "../actions/types";
  
  const user = JSON.parse(localStorage.getItem('token'));
  
  const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };
  
  export default function foo(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
        case FORGOT_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case FORGOT_FAIL:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }
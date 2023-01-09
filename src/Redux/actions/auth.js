// register/login/logout actions

// Auth Actions Creator
// This is creator for actions related to authentication. We’re gonna import AuthService to make asynchronous HTTP requests with trigger one or more dispatch in the result.

// – register()

// calls the AuthService.register(username, email, password)
// dispatch REGISTER_SUCCESS and SET_MESSAGE if successful
// dispatch REGISTER_FAIL and SET_MESSAGE if failed
// – login()

// calls the AuthService.login(username, password)
// dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
// dispatch LOGIN_FAIL and SET_MESSAGE if failed
// Both action creators return a Promise for Components using them.

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGOT_FAIL,
  FORGOT_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "./../../services/auth.service";

export const register = (email, password, countryCodeId, mobileNumber, otp, name) => (dispatch) => {
  return AuthService.register(email, password, countryCodeId, mobileNumber, otp, name).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { user: response }
      });

      dispatch({
        type: SET_MESSAGE,
        // payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (userId, password, countryCodeId, mobileNumber) => (dispatch) => {
  return AuthService.login(userId, password, countryCodeId, mobileNumber).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      dispatch({
        type: SET_MESSAGE,
        // payload: response.data.message,
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const forgotPassword = (password, countryCodeId, mobileNumber, otp) => (dispatch) => {
  return AuthService.forgotPassword(password, countryCodeId, mobileNumber, otp).then(
    (response) => {
      dispatch({
        type: FORGOT_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: FORGOT_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
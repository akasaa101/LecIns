import authService from "../services/authService";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    error,
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    authService
      .login(email, password)
      .then((data) => {
        data.message !== "Auth successful"
          ? dispatch(loginError(data.message))
          : dispatch(loginSuccess(data));
      })
      .catch((err) => dispatch(loginError(err)));
  };
};

export const loginUser = (userInfo) => {
    return (dispatch) => {
        dispatch(loginSuccess(userInfo));
      };
}

export const logout = () => {
  authService.logout();
  return {
    type: LOGOUT,
  };
};

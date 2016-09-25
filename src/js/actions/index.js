export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN';
export const LOGOUT = 'LOGOUT';

export const requestLogin = (username, password) => ({
  type: REQUEST_LOGIN,
  username,
  password
});

export const receiveLogin = (user) => ({
  type: RECEIVE_LOGIN,
  user
});

// Log the user out
export const logout = () => ({
  type: LOGOUT,
  user: {loggedIn: false}
});

export const login = (username, password) => dispatch => {
  dispatch(requestLogin(username,password));
  // Create a promise that resolves after 0.5 seconds to simulate ajax call
  return new Promise(resolve => setTimeout(resolve, 500))
    .then(() => validateLogin(username, password))
    .then(user => dispatch(receiveLogin(user)));
}

// Invalid login action
export const invalidLogin = () => ({
  type: RECEIVE_LOGIN,
  user: {loggedIn: false, loginIncorrect: true}
});

const validateLogin = (username, password) => {
  const failedLogin = {loggedIn: false, loginIncorrect: true};
  // Strip non alphanumeric characters
  let nonAlphaNumeric = /[^a-zA-Z\d]/g;
  let strippedUser = username.replace(nonAlphaNumeric, "");
  let strippedPass = password.replace(nonAlphaNumeric, "");

  // Bypass check if strings are different lengths
  if (strippedPass.length !== strippedUser.length) {
    return failedLogin;
  }

  // This will not work on double byte characters
  let reversedPass = strippedPass.split('').reverse().join("");

  if (strippedUser.toLowerCase() === reversedPass.toLowerCase()) {
    return {loggedIn: true, name: username};
  } else {
    return failedLogin; 
  }
}
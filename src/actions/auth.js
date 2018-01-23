// import api from '../api'

export const USER_LOGIN = 'USER_LOGIN'

export const userLogin = credentials => ({
  type: USER_LOGIN,
  credentials
})

export const userLoginSuccess = user => ({
  type: 'USER_LOGIN_SUCCESS',
  user
})

export const userLoginFailure = error => ({
  type: 'USER_LOGIN_FAILURE',
  error
})

// export const userLoggedIn = user => ({
//   type: 'USER_LOGGED_IN',
//   user
// })

// export const userLogin = credentials => dispatch =>
//   api.user.login(credentials).then(user => dispatch(userLoggedIn(user)))

// export const userLogin = (credentials) => ({
//   type: 'USER_LOGIN',
//   credentials
// })
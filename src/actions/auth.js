import api from '../api'

// export const userLoggedIn = user => ({
//   type: 'USER_LOGGED_IN',
//   user
// })

// export const userLogin = credentials => dispatch =>
//   api.user.login(credentials).then(user => dispatch(userLoggedIn(user)))

export const userLogin = (credentials) => ({
  type: 'USER_LOGIN',
  credentials
})
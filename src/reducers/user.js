export default (state={}, action) =>  {

  switch (action.type) {

    case 'USER_LOGIN':
      return {
        ...state,
        credentials: action.credentials
      }

    case 'USER_LOGGED_IN':
      return {
        ...state,
        user: action.user
      }

    default:
      return state
  }
}
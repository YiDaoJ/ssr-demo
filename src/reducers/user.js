export default (state={}, action) =>  {

  switch (action.type) {

    case 'USER_LOGIN':
      return state

    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        user: action.user
      }

    default:
      return state
  }
}
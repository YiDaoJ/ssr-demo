export default (state={}, action) =>  {

  switch (action.type) {

    case 'USER_LOGIN':
      return {
        ...state,
        credentials: action.credentials
      }

    default:
      return state
  }
}
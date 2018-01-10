export default (state={}, action) =>  {

  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        data: action.data
      }

    case 'FETCH_SUCCEEDED':
      return {
        ...state,
        projects: action.projects
      }

    // case 'GET_ALL_PROJECTS':
    //   return {
    //     ...state,
    //     projects: action.projects
    //   }

    default:
      return state
  }
}
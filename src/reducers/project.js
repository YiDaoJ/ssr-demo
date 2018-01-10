export default (state={}, action) =>  {

  switch (action.type) {
    case 'GET_ALL_PROJECTS':
      return {
        ...state,
        projects: action.projects
      }

    default:
      return state
  }
}
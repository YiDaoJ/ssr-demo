export default (state={projects: []}, action) =>  {

  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        projects: action.projects
      }

    case 'FETCH_SUCCEEDED':
      return {
        ...state,
        projects: action.projects
      }

    case 'CREATE_PROJECT_REQUEST':
      return state

    case 'CREATE_PROJECT_SUCCEEDED':
      return {
        ...state,
        projects: [
          ...state.projects,
          action.project
        ]
      }

    case 'DELETE_PROJECT_REQUEST':
      // return {...state, project: action.project}
      return state

    case 'DELETE_PROJECT_SUCCEEDED':
      const index = state.projects.findIndex(project => project._id === action.project._id)
      // console.log(index)
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, index), ...state.projects.slice(index + 1)
        ]
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
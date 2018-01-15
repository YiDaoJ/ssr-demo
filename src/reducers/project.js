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
      console.log('reducer: ',  state.projects)
      console.log('reducer: ',  action.project)
      const index = state.projects.findIndex(action.project)
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
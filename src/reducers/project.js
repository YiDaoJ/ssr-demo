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
      console.log('test from reducer', state, action.project)
      return state

    case 'CREATE_PROJECT_SUCCEEDED':
      return {
        ...state,
        projects: [
          ...state.projects,
          action.project
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
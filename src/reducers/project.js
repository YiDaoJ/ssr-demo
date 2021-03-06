export default (state={projects: []}, action) =>  {

  let index

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
      index = state.projects.findIndex(project => project._id === action.project._id)
      // console.log(index)
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, index),
          ...state.projects.slice(index + 1)
        ]
      }

    case 'UPDATE_PROJECT_REQUEST':
      return state

    case 'UPDATE_PROJECT_SUCCEEDED':
      index = state.projects.findIndex(project => project._id === action.project._id)
      const projData = action.project.data
      const payloadData = action.payload.data
      const payloadIndex = projData.findIndex(dataItem => dataItem.language === payloadData.language && dataItem.key === payloadData.key)
      console.log('payloadIndex:  ', payloadIndex)
      projData[payloadIndex] = {  ...action.payload.data}
      const proj = {...action.project }
      console.log('test from reducer: ', proj)
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, index),
          proj,
          ...state.projects.slice(index + 1)
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
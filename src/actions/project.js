import api from '../api'

export const FETCH_DATA = 'FETCH_DATA'
export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECT_REQUEST'

// ============== fetchData =================

export const fetchData = projects => ({
  type: FETCH_DATA,
  projects
})

export const fetchSucceeded = projects => ({
  type: 'FETCH_SUCCEEDED',
  projects
})

export const fetchFailed = error => ({
  type: 'FETCH_FAILED',
  error
})

// ============== create Project =================

export const createProjectRequest = project => ({
  type: CREATE_PROJECT_REQUEST,
  project
})

export const createProjectSucceeded = project => ({
  type: 'CREATE_PROJECT_SUCCEEDED',
  project
})

export const createProjectFailed = error => ({
  type: 'CREATE_PROJECT_FAILED',
  error
})



// export const getAllProjects = (data) => dispatch =>
//   api.project.getProjects(data).then(projects => dispatch({type: 'GET_ALL_PROJECTS', projects}))

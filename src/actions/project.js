import api from '../api'

export const FETCH_DATA = 'FETCH_DATA'

export const fetchData = () => ({
  type: FETCH_DATA
})

export const fetchSucceeded = projects => ({
  type: 'FETCH_SUCCEEDED',
  projects
})

export const fetchFailed = error => ({
  type: 'FETCH_FAILED',
  error
})


// export const getAllProjects = (data) => dispatch =>
//   api.project.getProjects(data).then(projects => dispatch({type: 'GET_ALL_PROJECTS', projects}))

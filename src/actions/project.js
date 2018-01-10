import api from '../api'


export const getAllProjects = (data) => dispatch =>
  api.project.getProjects(data).then(projects => dispatch({type: 'GET_ALL_PROJECTS', projects}))

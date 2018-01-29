import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchData,
  createProjectRequest,
  deleteProjectRequest,
  updateProjectRequest
} from '../../actions/project'
import Dashboard from '../Dashboard'


class DashboardContainer extends Component {

  componentDidMount() {
    this.props.getAllProjects()
  }

  onCreateProjectClick = () => {
    const { createProject } = this.props
    const project = {_id: 'HennesProject2'}
    createProject(project)
  }

  onDeleteProjectClick = () => {
    const { deleteProject } = this.props
    const project = {_id: 'HennesProject2'}
    deleteProject(project)
  }

  onUpdateProjectClick = () => {
    const { updateProject, allProjects } = this.props
    updateProject(allProjects[0], {
      data:
        {
          "value": "test!!!",
          "key": "GLOBAL__BTN_LOGIN",
          "language": "es",
          "project": allProjects[0]._id
        }
    })
  }

  onUpdateProjectClick2 = () => {
    const { updateProject, allProjects } = this.props
    updateProject(allProjects[0], {
      data:
        {
          "value": "test",
          "key": "GLOBAL__BTN_LOGIN",
          "language": "es",
          "project": allProjects[0]._id
        }
    })
  }

  onUpdateProjectClick3 = () => {
    const { updateProject, allProjects } = this.props
    updateProject(allProjects[0], {
      data:
        {
          "value": "Hilfe",
          "key": "GLOBAL__BTN_HELP",
          "language": "de",
          "project": allProjects[0]._id
        }
    })
  }





  render() {

    return (
      <div>
        <h2>Dashborad - Test Page</h2>
        <Dashboard
          {...this.props}
          onCreateProjectClick={this.onCreateProjectClick}
          onDeleteProjectClick={this.onDeleteProjectClick}
          onUpdateProjectClick={this.onUpdateProjectClick}
          onUpdateProjectClick2={this.onUpdateProjectClick2}
          onUpdateProjectClick3={this.onUpdateProjectClick3}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allProjects: state.project.projects
})

const mapDispatchToProps = dispatch => ({
  getAllProjects: () => dispatch(fetchData()),
  createProject: project => dispatch(createProjectRequest(project)),
  deleteProject: project => dispatch(deleteProjectRequest(project)),
  updateProject: (project, payload) => dispatch(updateProjectRequest(project, payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
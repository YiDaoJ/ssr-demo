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
    updateProject(allProjects[1], {
      data:
        {
            "value": "Speichern",
            "key": "GLOBAL__BTN_SAVE",
            "language": "de",
            "project": allProjects[1]._id
        }

      // data: {
      //   datavalues: [
      //     {
      //       key: 'GLOBAL__BTN_DUPLICATE',
      //       value: 'Key exists already',
      //       language: 'en',
      //       project: allProjects[1]._id
      //     }
      //   ]
      // }

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
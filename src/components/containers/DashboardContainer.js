import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData, createProjectRequest, deleteProjectRequest } from '../../actions/project'
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

  render() {
    // const { allProjects } = this.props
    // console.log(allProjects)
    return (
      <div>
        <h2>Dashborad - Test Page</h2>
        <Dashboard
          {...this.props}
          onCreateProjectClick={this.onCreateProjectClick}
          onDeleteProjectClick={this.onDeleteProjectClick}
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
  deleteProject: project => dispatch(deleteProjectRequest(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData, createProjectRequest } from '../../actions/project'
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

  render() {
    // const { allProjects } = this.props
    // console.log(allProjects)
    return (
      <div>
        <h2>Dashborad - Test Page</h2>
        <Dashboard {...this.props} onCreateProjectClick={this.onCreateProjectClick} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allProjects: state.project.projects
})

const mapDispatchToProps = dispatch => ({
  getAllProjects: () => dispatch(fetchData()),
  createProject: project => dispatch(createProjectRequest(project))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
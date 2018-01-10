import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllProjects } from '../actions/project'


class Dashboard extends Component {

  componentDidMount() {
    // this.props.getAllProjects()
    console.log(this.props.getAllProjects())
  }


  render() {
    console.log(this.props.allProjects)
    const { allProjects } = this.props

    return (
      <div>
        <h2>Dashborad - Test Page</h2>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  allProjects: state.project.projects
})

const mapDispatchToProps = dispatch => ({
  getAllProjects: () => dispatch(getAllProjects())
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
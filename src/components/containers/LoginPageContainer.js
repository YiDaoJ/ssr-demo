import React, { Component } from 'react'
import { func, shape } from 'prop-types'
import { connect } from 'react-redux'
import LoginPage from '../LoginPage'
import LoginCardContainer from '../containers/LoginCardContainer'
import { userLogin } from '../../actions/auth'


class LoginPageContainer extends Component {

  render() {
    return <LoginPage {...this.props} />
  }
}

// const mapStateToProps = state => ({
//   hasError: state.
// })


const mapDispatchToProps = dispatch => ({
  userLogin: credentials => dispatch(userLogin(credentials))
})


LoginPageContainer.propTypes = {
  // history: shape({
  //   push: func.isRequired
  // }).isRequired,
  // login: func.isRequired
}

export default connect(null, mapDispatchToProps)(LoginPageContainer)

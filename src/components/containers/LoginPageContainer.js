import React, { Component } from 'react'
import { func, shape } from 'prop-types'
import { connect } from 'react-redux'
import LoginPage from '../LoginPage'
import { userLogin } from '../../actions/auth'


class LoginPageContainer extends Component {
  // submit = loginData => {this.props.login(loginData); console.log(loginData)}
    // this.props.login(loginData).then(() => this.props.history.push('/'))

  render() {

    return <LoginPage {...this.props}  />
  }
}

// const mapStateToProps = state => ({
//   credentials: state.user.credentials
// }) // null

const mapDispatchToProps = dispatch => ({
  userLogin: credentials => dispatch(userLogin(credentials))
  // login: credentials =>
  //   api.user.login(credentials).then(user => dispatch(userLoggedIn(user)))
})


LoginPageContainer.propTypes = {
  // history: shape({
  //   push: func.isRequired
  // }).isRequired,
  // login: func.isRequired
}

export default connect(null, mapDispatchToProps)(LoginPageContainer)

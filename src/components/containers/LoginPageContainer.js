import React, { Component } from 'react'
import { func, shape } from 'prop-types'
import { connect } from 'react-redux'
import Login from '../Login'
// import { userLoggedIn } from 'store/actions'
// import api from '../api'

class LoginPageContainer extends Component {
  // submit = loginData =>
  //   this.props.login(loginData).then(() => this.props.history.push('/'))

  render() {
    return <Login {...this.props} />
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  // login: credentials =>
  //   api.user.login(credentials).then(user => dispatch(userLoggedIn(user)))
})

LoginPageContainer.propTypes = {
  // history: shape({
  //   push: func.isRequired
  // }).isRequired,
  // login: func.isRequired
}

export default LoginPageContainer

// export default connect(mapStateToProps, mapDispatchToProps)(LoginPageContainer)

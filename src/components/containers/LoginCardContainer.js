import React, { Component } from 'react'
import { func } from 'prop-types'
import Validator from 'validator'
import bcrypt from 'bcryptjs'
import LoginCard from '../LoginCard'

// const LoginCardContainer = props => <LoginCard {...props} />

class LoginCardContainer extends Component {

  state = {
    loginData: {
      email: '',
      password: ''
    },
    loading: false,
    errors: {}
  }

  // componentWillMount() {
  //   this.generatePWHash(this.state.loginData.password)
  // }

  onChange = event => {
    this.setState({
      loginData: {
        ...this.state.loginData,
        [event.target.name]: event.target.value
      }
    })
  }

  onSubmit = () => {
    const errors = this.validate(this.state.loginData)
    const passwordHash =
      this.state.loginData.password &&
      bcrypt.hashSync(this.state.loginData.password, 10)

    this.setState(
      {
        loginData: {
          ...this.state.loginData,
          password: passwordHash
        },
        errors
      },
      () => {
        if (Object.keys(errors).length === 0) {
          this.props
            .submit(this.state.loginData)
            .catch(err => this.setState({ errors: err.response.data.errors }))
        }
      }
    )
  }

  validate = loginData => {
    const errors = {}
    if (!Validator.isEmail(loginData.email)) errors.email = 'Invalid email'
    if (!loginData.password) errors.password = "Password can't be blank"
    return errors
  }

  generatePWHash = password => {
    const passwordHash =
      password && bcrypt.hashSync(this.state.loginData.password, 10)
    console.log(passwordHash)

    this.setState({
      loginData: {
        ...this.state.loginData,
        password: passwordHash
      }
    })
  }

  render() {
    const { errors, loginData } = this.state

    return (
      <LoginCard
        {...this.props}
        onChange={this.onChange}
        onSubmit={this.onSubmit}
        loginData={loginData}
        errors={errors}
      />
    )
  }
}

LoginCardContainer.propTypes = {
  submit: func
}

export default LoginCardContainer

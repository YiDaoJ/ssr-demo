import React, { Component } from 'react'
import { func } from 'prop-types'
import Validator from 'validator'
import bcrypt from 'bcryptjs'
import LoginCard from '../LoginCard'
import { error } from 'util';

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

  componentWillReceiveProps(nextprops) {
    this.checkErrors(this.state.errors, nextprops.lang)
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
    const errors = this.validate(this.state.loginData, this.props.lang)
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

  validate = (loginData, lang) => {
    const errors = {}
    if (!Validator.isEmail(loginData.email))
      lang === 'de' ? errors.email = 'Ungültige Email': errors.email = 'Invalid email'


    if (!loginData.password)
      lang === 'de' ?
        errors.password = 'Das Passwort darf nicht leer sein':
        errors.password = "Password can't be blank";

    this.setState({errors})
    return errors
  }

  checkErrors = (errors, lang) => {
    if (errors.email)
      lang === 'de' ? errors.email = 'Ungültige Email': errors.email = 'Invalid email'

    if (errors.password)
      lang === 'de' ?
        errors.password = 'Das Passwort darf nicht leer sein':
        errors.password = "Password can't be blank";

    this.setState({errors})
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

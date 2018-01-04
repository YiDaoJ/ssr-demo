import React from 'react'
import { object, func } from 'prop-types'
import { TextField, FormHelperText } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import loginStyle from '../styles/loginStyle'

const LoginForm = ({ loginData, errors, onChange, ...props }) => {
  const { classes } = props

  return (
    <form style={{ width: '100%', margin: '0 auto' }}>
      <div style={{ height: '60px' }}>
        <TextField
          error={!!errors.email}
          label="Email"
          type="email"
          name="email"
          value={loginData.email}
          className={classes.inputField}
          margin="normal"
          InputProps={{ style: { width: '100%' } }}
          onChange={onChange}
        />
        {errors.email && (
          <FormHelperText className={classes.errorMessage}>
            {errors.email}
          </FormHelperText>
        )}
      </div>
      <TextField
        error={!!errors.password}
        label="Password"
        type="password"
        name="password"
        value={loginData.password}
        className={classes.inputField}
        margin="normal"
        InputProps={{ style: { width: '100%' } }}
        onChange={onChange}
      />
      {errors.password && (
        <FormHelperText className={classes.errorMessage}>
          {errors.password}
        </FormHelperText>
      )}
    </form>
  )
}

LoginForm.propTypes = {
  classes: object,
  loginData: object,
  errors: object,
  onChange: func
}

export default withStyles(loginStyle)(LoginForm)

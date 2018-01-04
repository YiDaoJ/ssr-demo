import React from 'react'
import { object, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import loginStyle from '../styles/loginStyle'
import LoginForm from './LoginForm'

const LoginCard = props => {
  const { classes } = props
  return (
    <Card className={classes.loginCard}>
      <CardContent className={classes.loginCardContent}>
        <div className={classes.cardTitle}>
          <Typography type="headline" style={{ textAlign: 'center', paddingTop: '100px' }}>
          Login
          </Typography>
        </div>
        <LoginForm {...props} />
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Link to="/forgot_password" className={classes.forgotPWLink}>
          Forgot Password?
        </Link>
        <Button
          color="primary"
          raised
          className={classes.loginBtn}
          onClick={props.onSubmit}>
          Login
        </Button>
      </CardActions>
    </Card>
  )
}

LoginCard.propTypes = {
  classes: object,
  onSubmit: func
}

export default withStyles(loginStyle)(LoginCard)


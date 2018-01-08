import React from 'react'
import { object, func } from 'prop-types'
import { injectIntl, FormattedMessage} from 'react-intl';
import { TextField, FormHelperText } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import loginStyle from '../styles/loginStyle'
import messages from '../messages'

const LoginForm = ({ loginData, errors, onChange, lang, ...props }) => {
  const { classes } = props
  const {formatMessage} = props.intl
  const formatLabel = formatMessage(messages[lang].label)

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
            InputLabelProps={{ style: { color: !!errors.email ? '#FF8F00' : undefined } }}
            InputProps={{ style: { width: '100%' }, className: classes.afterInput}}
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
          label={formatMessage(messages[lang].label)}
          type="password"
          name="password"
          value={loginData.password}
          className={classes.inputField}
          margin="normal"
          InputLabelProps={{ style: { color: !!errors.email ? '#FF8F00' : undefined } }}
          InputProps={{ style: { width: '100%' }, className: classes.afterInput }}
          onChange={onChange}
        />
        {errors.password && (
          <FormHelperText className={classes.errorMessage}>
            {errors.password}
          </FormHelperText>
        )}
        { errors.global && <FormHelperText className={classes.errorMessage}>{errors.global}</FormHelperText> }
      </form>

  )
}

LoginForm.propTypes = {
  classes: object,
  loginData: object,
  errors: object,
  onChange: func
}
const multiLangForm = injectIntl(LoginForm)
export default withStyles(loginStyle)(multiLangForm)

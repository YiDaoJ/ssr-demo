import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import { FormattedMessage } from 'react-intl'

const styles = {
  nav: {
    width: '100%',
    zIndex: 5
  },
  link: {
    textDecoration: 'none',
    color: '#fff'
  },
  changeLang: {
    color: '#FFF',
    position: 'absolute',
    zIndex: 8,
    right: 0,
    marginRight: 50
  },
  changeLangBtn: {
    cursor: 'pointer',
    margin: '0 8px',
    fontSize: 16,
    '&:hover': {
      color: '#EEE'
    }
  }

}

const Header = ({ changeLanguage, ...props }) => {
  const { classes } = props
  return (
    <nav className={classes.nav}>
      <AppBar color="primary">
        <Toolbar>
          <Button>
            <Link to="/" className={classes.link}>
            <FormattedMessage id="nav.home" defaultMessage="Home" />
            </Link>
          </Button>
          <Button>
            <Link to="/login" className={classes.link}>
            <FormattedMessage id="nav.login" defaultMessage="Login" />
            </Link>
          </Button>
          <Button>
            <Link to="/about" className={classes.link}>
            <FormattedMessage id="nav.about" defaultMessage="About" />
            </Link>
          </Button>
          <Button>
            <Link to="/dashboard" className={classes.link}>
            Dashboard
            {/* <FormattedMessage id="nav.dashboard" defaultMessage="Dashboard" /> */}
            </Link>
          </Button>

          <div className={classes.changeLang}>
            <a role="button" name="en" onClick={event => changeLanguage(event)} className={classes.changeLangBtn}>EN</a>
            <span> | </span>
            <a role="button" name="de" onClick={event => changeLanguage(event)} className={classes.changeLangBtn}>DE</a>
          </div>

        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default withStyles(styles)(Header);

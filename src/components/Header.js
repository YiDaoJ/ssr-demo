import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';

const styles = {
  nav: {
    width: '100%'
  },
  link: {
    textDecoration: 'none',
    color: '#fff'
  }

}

const Header = props => {
  const { classes } = props
  return (
    <nav className={classes.nav}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button><Link to="/" className={classes.link}>Home</Link></Button>
          <Button><Link to="/login" className={classes.link}>Login</Link></Button>
          <Button><Link to="/about" className={classes.link}>About</Link></Button>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default withStyles(styles)(Header);

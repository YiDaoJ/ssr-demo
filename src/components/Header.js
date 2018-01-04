import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

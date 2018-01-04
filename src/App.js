import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'

const App = ({route}) => {
  return (
    <div>
      <Helmet>
        <title>React SSR</title>
        <meta name="description" content="Meine Beschreibung"/>
      </Helmet>
      <Header />
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={About} path="/about" />
        <Route component={Login} path="/login" />
      </Switch>

    </div>
  );
};

export default App;
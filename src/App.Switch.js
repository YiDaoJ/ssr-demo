import React from 'react'
import { renderRoutes } from 'react-router-config'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
// import Header from './components/Header'

import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <Helmet>
        <title>React SSR</title>
        <meta name="description" content="Meine Beschreibung"/>
        <meta property="og:title" content="Ein etwas anderer Titel" />
      </Helmet>
      {/* <Header /> */}
      <Switch>
        <Route component={Home} path="/" />
        <Route component={About} path="/about" exact />
        <Route component={Login} path="/login" exact />
      </Switch>

    </div>
  );
};

export default App;
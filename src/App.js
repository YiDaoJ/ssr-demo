import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import LoginPageContainer from './components/containers/LoginPageContainer'

const App = ({route}) => {
  return (
    <div>
      <Helmet>
        <title>React SSR</title>
        <meta name="description" content="Meine Beschreibung"/>
        <link rel="icon" href={`http://localhost:8080/favicon.ico`} />
      </Helmet>
      <Header />
      <div
        style={{ backgroundColor: '#FAFAFA', height: '100%', width: '100%', display: 'flex', paddingTop: 60 }}
      >
        <Switch>
          <Route component={Home} path="/" exact />
          <Route component={About} path="/about" />
          <Route component={LoginPageContainer} path="/login" />
        </Switch>
      </div>


    </div>
  );
};

export default App;
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Helmet>
        <title>React SSR</title>
        <meta name="description" content="Meine Beschreibung"/>
        <meta property="og:title" content="Ein etwas anderer Titel" />
      </Helmet>
      <Home />
    </div>
  );
};

export default App;
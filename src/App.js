import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Helmet from 'react-helmet'
import { IntlProvider, addLocaleData } from 'react-intl'
import en from "react-intl/locale-data/en"
import de from "react-intl/locale-data/de"

import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import LoginPageContainer from './components/containers/LoginPageContainer'
import messages from './messages'

addLocaleData(en)
addLocaleData(de)

class App extends Component {

  state = {
    lang: 'en'
  }

  componentDidMount() {
    this.setState({lang: localStorage.i18nLang ? localStorage.i18nLang: 'en'})
  }

  changeLanguage = event => {
    localStorage.i18nLang = event.target.name
    this.setState({lang: localStorage.i18nLang})
  }

  // this.setState(
  //   { lang: event.target.name },
  //   () => {localStorage.i18nLang = this.state.lang ; console.log(localStorage.i18nLang) }
  // )

  render() {
    const { lang }  = this.state
    return (
      <IntlProvider
        locale={lang}
        messages={messages[lang]}>
        <div>
          <Helmet>
            <title>React SSR</title>
            <meta name="description" content="Meine Beschreibung"/>
            <link rel="icon" href={`http://localhost:8000/favicon.ico`} />
          </Helmet>
          <Header changeLanguage={this.changeLanguage} />
          <div
            style={{
              backgroundColor: '#FAFAFA',
              height: '100%',
              width: '100%',
              display: 'flex',
              paddingTop: 60 }}>
            <Switch>
              <Route component={Home} path="/" exact />
              <Route component={About} path="/about" />
              <Route render={ () => <LoginPageContainer lang={lang} />} path="/login" />

            </Switch>
          </div>
        </div>
      </IntlProvider>
    )
  }
}

export default App
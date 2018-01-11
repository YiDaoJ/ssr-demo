import 'babel-polyfill';
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { MuiThemeProvider } from 'material-ui/styles'
import App from './App'
import theme from './styles/theme'
import rootReducer from './reducers/rootReducer'
import sagas, { watchFetchData } from './sagas'
import api from './api'

// if(localStorage.i18nLang) {
//   console.log(localStorage.i18nLang)
// }

class Main extends Component {
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return <App {...this.props} />
  }

}

const sagaMiddleware = createSagaMiddleware()


const store = createStore(
  rootReducer,
  window.INITIAL_STATE,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
)

sagaMiddleware.run(sagas)
// console.log(sagaMiddleware.run(watchFetchData,  {api: api.project}))

const ROOT = document.getElementById('root')

// const renderMethod = !ROOT.innerHTML.trim().length ? ReactDOM.render : ReactDOM.hydrate;
// renderMethod(
  ReactDOM.hydrate(
    <MuiThemeProvider theme={theme} >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
)

// )




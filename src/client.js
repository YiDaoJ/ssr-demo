import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { MuiThemeProvider } from 'material-ui/styles'
import App from './App'
import theme from './styles/theme'
import rootReducer from './reducers/rootReducer'

// if(localStorage.i18nLang) {
//   console.log(localStorage.i18nLang)
// }

const store = createStore(
  rootReducer,
  window.INITIAL_STATE,
  composeWithDevTools(applyMiddleware(logger))
)



ReactDOM.hydrate(
  <MuiThemeProvider theme={theme} >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'))

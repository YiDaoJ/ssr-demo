import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider } from 'material-ui/styles';
import App from './App'
import theme from './styles/theme'

// if(localStorage.i18nLang) {
//   console.log(localStorage.i18nLang)
// }


ReactDOM.hydrate(
  <MuiThemeProvider theme={theme} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root'))

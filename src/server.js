import path from 'path'
import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import serialize from 'serialize-javascript'


import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import Helmet from 'react-helmet'
import App from './App'
import theme from './styles/theme'
import rootReducer from './reducers/rootReducer';

// const Html = ({ content, css }) => {

//   const helmet = Helmet.renderStatic()

//   return `
//     <html>
//       <head>
//         ${helmet.title.toString()}
//         ${helmet.meta.toString()}
//         <style>
//           ${'*, *:after, *:before { box-sizing: border-box; }'}
//           ${'html, body, main { height: 100%;position: relative;}'}
//           ${'body {margin: 0;overflow: hidden;}'}
//         </style>
//       </head>
//       <body>
//         <div id="root">${content}</div>
//         <style id="jss-server-side">${css}</style>
//         <script src="bundle.js"></script>
//       </body>
//     </html>
//   `
// }


const renderer = (req, store) => {

  const sheetsRegistry = new SheetsRegistry();
  const jss = create(preset());
  const generateClassName = createGenerateClassName();

  const context = {}
  const helmet = Helmet.renderStatic()

  const content = renderToString(

    <JssProvider registry={sheetsRegistry} jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      </MuiThemeProvider>
    </JssProvider>

  )

  const css = sheetsRegistry.toString()

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        <style>
          ${'*, *:after, *:before { box-sizing: border-box; }'}
          ${'html, body, main { height: 100%;position: relative;}'}
          ${'body {margin: 0;overflow: hidden;font-family: Roboto, sans-serif}'}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
        <style id="jss-server-side">${css}</style>
        <script>window.INITIAL_STATE = ${serialize(store.getState())}</script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}


const app = express()
app.use(bodyParser.json())

app.use(express.static('public'))

app.post('/api/auth', (req, res) => {
  res.status(400).json({ errors: { global: "Invalid credentials." } })
})

app.get('*', (req, res) => {
  const store = createStore(rootReducer, {}, applyMiddleware(thunk));
  res.send(renderer(req, store))
})

app.listen(8000, console.log('Listening on port 8000'))
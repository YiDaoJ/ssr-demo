import path from 'path'
import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import serialize from 'serialize-javascript'
import mongoose from 'mongoose'


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

import auth from './api/routes/auth'

const Html = ({ content, css, store }) => {

  const helmet = Helmet.renderStatic()
  const state = `window.__INITIAL_STATE__ = ${serialize(store.getState())}`

    return (
    <html>
      <head>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        <style>
          {'*, *:after, *:before { box-sizing: border-box; }'}
          {'html, body, main { height: 100%;position: relative;}'}
          {'body {margin: 0; overflow: hidden; font-family: Roboto, sans-serif; background-color: #FAFAFA}'}
        </style>
        <style id="jss-server-side">{css}</style>
        {helmet.link.toComponent()}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: state }} />
        <script src="bundle.js"></script>
      </body>
    </html>

  )
}


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

  // console.log(content)

  return `<!doctype html>\n${renderToString(Html({content, css, store}))}`

}


const app = express()
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/i18n_demo_user', { useMongoClient: true })

app.use(express.static('public'))

app.use('/api/auth', auth)

// app.post('/api/auth', (req, res) => {
//   res.status(400).json({ errors: { global: "Invalid credentials." } })
// })

app.get('*', (req, res) => {
  const store = createStore(rootReducer, {}, applyMiddleware(thunk));

  res.status(200)
  res.send(renderer(req, store))
})

app.listen(3000, console.log('Listening on port 3000'))
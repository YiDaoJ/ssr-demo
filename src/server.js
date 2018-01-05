import path from 'path'
import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';

import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import Helmet from 'react-helmet'
import App from './App'
import theme from './styles/theme'

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


const renderer = req => {

  const sheetsRegistry = new SheetsRegistry();
  const jss = create(preset());
  const generateClassName = createGenerateClassName();

  const context = {}
  const helmet = Helmet.renderStatic()

  const content = renderToString(

    <JssProvider registry={sheetsRegistry} jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
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
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}


const app = express()
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.send(renderer(req))
})

app.listen(8000, console.log('Listening on port 8000'))
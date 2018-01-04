import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import App from './App'

const app = express()

const renderer = req => {
  const context = {}
  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )
  const helmet = Helmet.renderStatic()

  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `
}

app.use(express.static('public'))

app.get('*', (req, res) => {
  res.send(renderer(req))
})

app.listen(8080, console.log('Listening on port 8080'))
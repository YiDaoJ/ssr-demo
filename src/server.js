import React from 'react'
import express from 'express'
import { renderToString } from 'react-dom/server'
import Home from './components/Home'

const app = express()

const renderer = () => {
  const content = renderToString(<Home />)

  return `
    <html>
      <head>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="bundle.js"></script>
      </body>
    </html>
  `


}

app.use(express.static('public'))

app.get('/', (req, res) => {
  const content = renderToString(<Home />)
  res.send(content)
})

app.listen(8080, console.log('Listening on port 8080'))
import express from 'express'
import { renderToString } from 'react-dom/server'
import Home from './components/Home'

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  const content = renderToString(<Home />)
  res.send(content)
})

app.listen(8080, console.log('Listening on port 8080'))
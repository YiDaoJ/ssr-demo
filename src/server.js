import 'babel-polyfill';
import path from 'path'
import express from 'express'
import React from 'react'
import bodyParser from 'body-parser'
import Promise from 'bluebird'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import serialize from 'serialize-javascript'
import mongoose from 'mongoose'
import Helmet from 'react-helmet'

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createGenerateClassName } from 'material-ui/styles';


import App from './App'
import theme from './styles/theme'
import rootReducer from './reducers/rootReducer';
import { helloSaga } from './sagas'

import auth from './api/routes/auth'
import apiRouter from './api/apiRouter'
import projects from './api/routes/projects';
import languages from './api/routes/languages';
import dataKeys from './api/routes/datakeys';
import dataValues from './api/routes/datavalues';

// import dataKeyModel from './api/models/datakeys';
// import dataValueModel from './api/models/datavalues';
// import projectModel from './api/models/projects';
// import languageModel from './api/models/languages';

const sagaMiddleware = createSagaMiddleware()

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

  return `<!doctype html>\n${renderToString(Html({content, css, store}))}`

}


const app = express()
app.use(bodyParser.json())
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/i18n_demo', { useMongoClient: true })

app.use(express.static('public'))

app.use('/api/auth', auth)
app.use('/api', apiRouter)
app.use('/api/projects', projects);
app.use('/api/languages', languages);
app.use('/api/datakeys', dataKeys);
app.use('/api/datavalues', dataValues);

app.get('*', (req, res) => {
  const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));
  // sagaMiddleware.run(helloSaga)
  res.status(200)
  res.send(renderer(req, store))
})



app.listen(3000, console.log('Listening on port 3000'))

// const lang = new languageModel({ _id: 'en', name: 'English'});

// lang.save(err => {
//   if(err)
//     console.log(err);

//   const datakeyItem = new dataKeyModel({ _id: 'GLOBAL__BTN_SAVE' });
//   datakeyItem.save(err => { if(err) console.log(err);});

//   const datavalueItem = new dataValueModel({ value: 'Save', key: datakeyItem._id, language: lang._id, project: ''});
//   datavalueItem.save(err => { if(err) console.log(err);});

//   const proj = new projectModel({ _id: 'TestProject', languages: [lang._id], data:{ datakeys: [datakeyItem._id], datavalues: [datavalueItem._id] } });
//   proj.save(err => {
//     if(err)
//       console.log(err);
//   });
// });

// "dev:start-server": "nodemon --watch build --exec \"node --inspect-brk build/bundle.js\"",
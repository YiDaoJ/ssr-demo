import React from 'react'
import App from './App'
import Login from './components/Login'
import Home from './components/Home'
import About from './components/About'

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: '/',
        exact: true
      },
      {
        ...Login,
        path: '/login',
        exact: true
      },
      {
        ...About,
        path: '/about',
        exact: true
      }
    ]
  }
]
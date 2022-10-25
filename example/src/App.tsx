import React from 'react'
import { getRoutes } from 'md-react-router'
import 'md-react-router/dist/index.css'
import Header from './components/header'
import Routes from './Routes'
import NotFound from './components/404'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <div>{getRoutes(Routes, NotFound)}</div>
    </div>
  )
}

export default App

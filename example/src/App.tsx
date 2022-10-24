import React from 'react'
import { getRoutes } from 'md-react-router'
import 'md-react-router/dist/index.css'
import Header from './components/header'
import Routes from './Routes'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <div>{getRoutes(Routes)}</div>
    </div>
  )
}

export default App

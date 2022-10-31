import React from 'react'
import { Router } from 'md-react-router'
import Header from './components/header'
// import Routes from './Routes'
import NotFound from './components/404'
import TestOne from './components/testone'
import Test from './components/test'
import Testtwo from './components/testtwo'
import Item from './components/testDyn'
import TestDynT from './components/testDynx'

const testList = [
  {
    path: '/test',
    children: <TestOne />
  },
  {
    path: '/',
    children: <Test />
  },
  {
    hash: 'ct',
    children: <Testtwo />
  },
  {
    path: '/testDyn/:id',
    children: <Item />
  },
  {
    path: '/testDyn/:id/ssss',
    children: <TestDynT />
  }
]

const App = () => {
  return (
    <div className='App'>
      <Header />
      <div>{Router(testList, NotFound)}</div>
    </div>
  )
}

export default App

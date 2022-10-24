import Test from './components/test'
import TestOne from './components/testone'
import Testtwo from './components/testtwo'

const Routes = [
  {
    path: '/',
    component: Test,
    title: 'Test'
  },
  {
    path: '/test',
    component: TestOne,
    title: 'TestOne'
  },
  {
    hash: 'ct',
    component: Testtwo,
    title: 'Testtwo'
  }
]

export default Routes

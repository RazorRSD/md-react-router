# md-react-router

A simple, lightweight, and easy-to-use react-router. Just add your routes list you are good to go.

## Install

```bash
npm install --save md-react-router
```

## Usage

-- Add your routes list in `routes.js` file

```ts
import { Home, About, Contact, TestHash } from './pages'

export const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/contact',
    component: Contact
  },
  {
    hash: 'test',
    component: TestHash
  }
]
```

-- Add `Router` component in your `App.js` file

```tsx
import React from 'react'
import { getRoutes } from 'md-react-router'
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
```

-- Use "Link" instead of "A" when you want to navigate to another page

```tsx
import React from 'react'
import { Link } from 'md-react-router'

const Header = () => {
  return (
    <div>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/contact'>Contact</Link>
      <Link to='#test'>Test Hash</Link>
    </div>
  )
}

export default Header
```

## License

MIT © [RazorRSD](https://github.com/RazorRSD)

# md-react-router

A simple, lightweight, and easy-to-use react-router. Just add your routes list you are good to go.

## Install

```bash
npm install --save md-react-router
```

## Usage

_Add your routes list in `routes.js` file_

```ts
import { Home, About, TestHash, ItemCategories, Item } from './pages'

export const routes = [
  {
    path: '/',
    children: <Home />
  },
  {
    path: '/about',
    children: <About />
  },
  //Use Hash to redirect: page will be desided on letters and you can pass a id using numbers after letters
  {
    hash: 'ct',
    children: <TestHash />
  },
  //You can add Dynamic Routing with ":" name
  {
    path: '/testDyn/:catid',
    children: <ItemCategories />
  },
  {
    path: '/testDyn/:id/details',
    children: <Item />
  }
]
```

_Add `Router` component in your `App.js` file_

```tsx
import React from 'react'
import { Router } from 'md-react-router'
import Header from './components/header'
import NotFound from './componets/NotFoundComp'
import Routes from './Routes'

const App = () => {
  return (
    <div className='App'>
      <Header />
      <div>{getRoutes(Routes, NotFound)}</div>
    </div>
  )
}

export default App
```

_Use "Link" instead of "A" when you want to navigate to another page_

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
      <Link to='/TestDyn/234'>Category 01</Link>
      <Link to='/testDyn/562/details'>Item X</Link>
    </div>
  )
}

export default Header
```

_You can ust ctx to get query values from router_

```tsx
import React from 'react'
import { ctx } from 'md-react-router'

const Item = () => {
  return <div>testDyn {ctx.query.id}</div>
}

export default Item
```

## License

MIT © [RazorRSD](https://github.com/RazorRSD)

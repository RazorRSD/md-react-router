# md-react-router

A simple, lightweight, and easy-to-use react-router. Just add your routes list you are good to go.

## Install

```bash
npm install --save md-react-router
```

## Usage

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

## License

MIT © [RazorRSD](https://github.com/RazorRSD)

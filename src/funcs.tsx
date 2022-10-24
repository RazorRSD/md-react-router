import React from 'react'
import Router from './Router'

const getRoutes = (
  routes: {
    path?: string
    hash?: string
    component: React.FunctionComponent
    onCallback?: () => void
  }[]
) => {
  return routes.map((prop, key) => {
    return (
      <Router
        path={prop.path}
        hash={prop.hash}
        key={key}
        onCallback={prop.onCallback}
      >
        <prop.component />
      </Router>
    )
  })
}

export default getRoutes

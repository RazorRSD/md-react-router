import React from 'react'
import Router from './Router'

const getRoutes = (
  routes: {
    path?: string
    hash?: string
    component: React.FunctionComponent
    onCallback?: () => void
  }[],
  notFound?: React.FunctionComponent
) => {
  const notFoundComp = () => {
    return notFound ? notFound : <div>404</div>
  }
  return routes.map((prop, key) => {
    return Router ? (
      <Router
        path={prop.path}
        hash={prop.hash}
        key={key}
        onCallback={prop.onCallback}
      >
        <prop.component />
      </Router>
    ) : (
      notFoundComp
    )
  })
}

export default getRoutes

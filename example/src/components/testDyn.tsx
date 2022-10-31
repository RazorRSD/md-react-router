import React from 'react'
import { ctx } from 'md-react-router'

const Item = () => {
  return <div>testDyn {ctx.query.id}</div>
}

export default Item

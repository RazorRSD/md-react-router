import React from 'react'
import { Link, ctx } from 'md-react-router'

const Header = () => {
  const onChange = () => {
    console.log(window.location.pathname + window.location.hash)
  }
  return (
    <header>
      {'test =>' + ctx.query.id}
      <h1>My App</h1>
      <Link href='/test' className='test-link'>
        Test
      </Link>
      <Link href='/' className='test-link'>
        home
      </Link>
      <Link href='/#ct4200' className='test-link'>
        certs
      </Link>
      <Link href='/testDyn/333333333' className='test-link'>
        Dyn
      </Link>

      <button className='test-link' onClick={onChange}>
        Hash
      </button>
    </header>
  )
}

export default Header

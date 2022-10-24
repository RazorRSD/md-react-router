import React from 'react'

const Link: (Props: {
  href: string
  className: string
  children: React.ReactNode
  onClick?: () => void
}) => JSX.Element = ({ className, href, children, onClick }) => {
  function dispatchHashchange() {
    if (typeof HashChangeEvent !== 'undefined') {
      window.dispatchEvent(new HashChangeEvent('hashchange'))
      return
    }
    try {
      window.dispatchEvent(new Event('hashchange'))
      return
    } catch (error) {
      console.log(error)
    }
    const ieEvent = document.createEvent('Event')
    ieEvent.initEvent('hashchange', true, true)
    window.dispatchEvent(ieEvent)
  }

  const onClickLink = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatchHashchange()
    if (event.metaKey || event.ctrlKey) {
      return
    }
    {
      onClick ? onClick() : null
    }
    window.history.pushState({}, '', href)
    const navEvent = new PopStateEvent('popstate')
    window.dispatchEvent(navEvent)
  }

  return (
    <a className={className} href={href} onClick={onClickLink}>
      {children}
    </a>
  )
}

export default Link

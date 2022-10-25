import React, { useEffect, useState } from 'react'

const hashReader = (str: string) => {
  const patt1 = /[0-9]/g
  const patt2 = /[a-zA-Z]/g
  if (!str) return { numbers: '', letters: '' }
  const letters = str.match(patt2)?.join('')
  const digits = str.match(patt1)?.join('')
  return { letters, digits }
}

const Router: (props: {
  path?: string
  hash?: string
  onCallback?: () => void
  children: React.ReactNode
}) => JSX.Element | null = ({ path, hash, children, onCallback }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
      setCurrentHash(window.location.hash)
      {
        onCallback ? onCallback() : null
      }
    }
    const onHashChange = () => {
      setCurrentPath(window.location.pathname)
      setCurrentHash(window.location.hash)
      {
        onCallback ? onCallback() : null
      }
    }
    window.addEventListener('popstate', onLocationChange)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  if (currentHash) {
    const { letters } = hashReader(currentHash)
    if (letters === hash) return children as JSX.Element
    else return null
  } else {
    return currentPath === path ? (children as JSX.Element) : null
  }
}

export default Router

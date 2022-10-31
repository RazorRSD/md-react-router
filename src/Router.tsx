import React, { useEffect, useState } from 'react'
import { ctx, reset } from './store'

const hashReader = (str: string) => {
  const patt1 = /[0-9]/g
  const patt2 = /[a-zA-Z]/g
  if (!str) return { numbers: '', letters: '' }
  const letters = str.match(patt2)?.join('')
  const digits = str.match(patt1)?.join('')
  return { letters, digits }
}

const comparePaths = (path: string, dynamicPath: string) => {
  const pathSplit = path.split('/')
  const dynamicPathSplit = dynamicPath.split('/')
  if (pathSplit.length !== dynamicPathSplit.length) return false
  let isMatch = true
  pathSplit.forEach((item, index) => {
    if (
      item !== dynamicPathSplit[index] &&
      !dynamicPathSplit[index]?.includes(':')
    ) {
      isMatch = false
    }
  })

  if (isMatch) {
    dynamicPathSplit.map((item, index) => {
      if (item.includes(':')) {
        const key = item.replace(':', '')
        ctx.query[key] = pathSplit[index]
        console.log('ctx', ctx)
      }
    })
  }
  return isMatch
}

const Router: (
  Routes: {
    path?: string
    hash?: string
    children: React.ReactNode
  }[],
  NotFound: React.ReactNode
) => JSX.Element = (Routes, NotFound) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  const getCorrect = (path: string) => {
    const { letters, digits } = hashReader(currentHash)
    if (letters && digits) {
      const correchash = Routes.find((item) => item.hash === letters)
      return (correchash?.children as JSX.Element) || NotFound
    }
    const dynamicPath = Routes.filter((item) => item.path?.includes(':'))
    const testChil = dynamicPath.map((item) => {
      if (comparePaths(path, item.path || '')) {
        return item.children as JSX.Element
      }
      return null
    })
    const finChil = testChil.filter((item) => item)
    if (finChil.length > 0) {
      return finChil[0] as JSX.Element
    }
    const correct = Routes.find((item) => item.path === path)
    return (correct?.children as JSX.Element) || NotFound
  }

  useEffect(() => {
    const onLocationChange = () => {
      reset()
      setCurrentPath(window.location.pathname)
      setCurrentHash(window.location.hash)
    }
    const onHashChange = () => {
      setCurrentPath(window.location.pathname)
      setCurrentHash(window.location.hash)
    }
    window.addEventListener('popstate', onLocationChange)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])
  return getCorrect(currentPath)
}

export default Router

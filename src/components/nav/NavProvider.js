import React, { useState, useMemo, useCallback } from 'react'
import NavContext from './NavContext'
import sections from './sections'

export default ({ children }) => {
  const [ navigation, setNavigation ] = useState(sections)

  const setDefaultNavigation = useCallback(() => {
    setNavigation(sections)
  }, [ setNavigation ])

  const contextValue = useMemo(() => ({
    navigation,
    setNavigation,
    setDefaultNavigation
  }), [ navigation, setNavigation ])

  return (
    <NavContext.Provider value={contextValue}>
      {children}
    </NavContext.Provider>
  )
}

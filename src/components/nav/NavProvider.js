import React, { useState, useMemo } from 'react'
import NavContext from './NavContext'
import sections from './sections'

export default ({ children }) => {
  const [ navigation, setNavigation ] = useState(sections)

  const contextValue = useMemo(() => ({
    navigation,
    setNavigation
  }), [ navigation, setNavigation ])

  return (
    <NavContext.Provider value={contextValue}>
      {children}
    </NavContext.Provider>
  )
}

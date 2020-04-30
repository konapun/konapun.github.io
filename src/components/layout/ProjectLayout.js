import React from 'react'
import useNavigation from '../nav/useNavigation'

export default ({ title, children }) => {
  useNavigation([
    {
      id: 'home',
      name: 'Home',
      href: '/'
    }
  ])

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {children}
      </div>
    </div>
  )
}

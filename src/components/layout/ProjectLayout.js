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
    <div className="px-2 py-2 mt-5">
      <h1>{title}</h1>
      <div>
        {children}
      </div>
    </div>
  )
}

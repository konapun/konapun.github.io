import React from 'react'
import DataContext from './DataContext'
import values from '../../../config'

const config = {
  ...values,
  findSocialLink (name) {
    const found = values.socialLinks.filter(link => link.name.toLowerCase() === name.toLowerCase())
    return found?.[0]
  }
}

export default ({ children }) => (
  <DataContext.Provider value={config}>
    {children}
  </DataContext.Provider>
)

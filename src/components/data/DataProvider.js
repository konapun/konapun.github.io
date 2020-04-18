import React from 'react'
import DataContext from './DataContext'
import config from '../../../config'

export default ({ children }) => (
  <DataContext.Provider value={config}>
    {children}
  </DataContext.Provider>
)

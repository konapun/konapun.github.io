import React from 'react'
import DataProvider from './components/data/DataProvider'
import NavProvider from './components/nav/NavProvider'
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'

export default ({ children }) => (
  <DataProvider>
    <ThemeProvider theme={theme}>
      <NavProvider>
        {children}
      </NavProvider>
    </ThemeProvider>
  </DataProvider>
)

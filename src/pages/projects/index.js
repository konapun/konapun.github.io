import React, { useContext, useEffect } from 'react'
import ProjectLayout from '../../components/layout/ProjectLayout'

// import SEO from '../../components/SEO'

export default ({ children }) => {
  return (
    <ProjectLayout
      title='All Projects'
    >
      {children}
    </ProjectLayout>
  )
}

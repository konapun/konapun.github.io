import React from 'react'
import ProjectLayout from '../../components/layout/ProjectLayout'

// import SEO from '../../components/SEO'

// TODO:
export default ({ children }) => {
  return (
    <ProjectLayout
      title='All Projects'
    >
      {children}
    </ProjectLayout>
  )
}

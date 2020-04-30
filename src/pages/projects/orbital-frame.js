import React from 'react'
import styled from 'styled-components'
import ProjectLayout from '../../components/layout/ProjectLayout'
import OrbitalFrameConsole from '../../components/projects/orbitalFrame/Console'

export default () => (
  <ProjectLayout
    title='Orbital Frame'
  >
    <div>
      <OrbitalFrameConsole/>
    </div>
    <Examples>

    </Examples>
  </ProjectLayout>
)

const Examples = styled.div`
`

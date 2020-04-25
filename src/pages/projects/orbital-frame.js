import React from 'react'
import styled from 'styled-components'
import Terminal from '../../components/projects/Terminal'

export const metadata = {
  name: 'Orbital Frame',
  github: 'orbital-frame'
}

export default () => {
  const handleEnter = value => {
    console.log('JEHUTY GOT VALUE', value)
  }

  return (
    <Container>
      Orbital frame!
      <Terminal
        title='Orbital Frame Jehuty'
        prompt='jehuty>'
        onEnter={handleEnter}
      >
        Content
      </Terminal>
    </Container>
  )
}

const Container = styled.div`
  padding: 12px;
`

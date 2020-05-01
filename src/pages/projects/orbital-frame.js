import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import ProjectLayout from '../../components/layout/ProjectLayout'
import OrbitalFrameConsole from '../../components/projects/orbitalFrame/Console'

export default () => {
  const [ input, setInput ] = useState('')

  const handleTryIt = useCallback(source => {
    // TODO: scroll to top
    setInput(source)
  }, [ input, setInput ])

  return (
    <ProjectLayout
      title='Orbital Frame'
    >
      <div>
        <OrbitalFrameConsole input={input}/>
      </div>
      <Examples>

      </Examples>

      <h2>Commands</h2>
      <span onClick={() => handleTryIt(tryCommand)}>Try It</span>

      <h3>Options</h3>
      <span onClick={() => handleTryIt(tryCommandWithOptions)}>Try It</span>

      <h2>Variables</h2>
      <span onClick={() => handleTryIt(tryVariable)}>Try It</span>

      <h2>Interpolations</h2>
      <span onClick={() => handleTryIt(tryInterpolation)}>Try It</span>

      <h2>Pipes</h2>
      <span onClick={() => handleTryIt(tryPipe)}>Try It</span>

      <h2>Signals</h2>
      <span onClick={() => handleTryIt(trySignal)}>Try It</span>

      <h2>Interactions</h2>
      <span onClick={() => handleTryIt(tryInteraction)}>Try It</span>

      <h2>Functions</h2>
      <span onClick={() => handleTryIt(tryFunction)}>Try It</span>

      <h2>Control Structures</h2>
      <span onClick={() => handleTryIt(tryControlStructure)}>Try It</span>
    </ProjectLayout>
  )
}

const tryCommand = '@jehuty echo hello'
const tryCommandWithOptions = '@jehuty choose -n 2 option1 option2 option3 option4'
const tryVariable = '@jehuty $MY_VAR="a variable"; echo $MY_VAR'
const tryInterpolation = '@jehuty echo TODO' // TODO
const tryPipe = "@jehuty echo hello | split -d '' | head -n 4 | join"
const trySignal = '@jehuty echo TODO' // TODO
const tryInteraction = '@jehuty echo TODO' // TODO
const tryFunction = `@jehuty function analyze_length {
  local WORD=$1
  local LOWER=$2
  local UPPER=$3
  local WORD_LENGTH=$(split -d '' $WORD | length)

  if $(and $(greater-than $WORD_LENGTH $LOWER) $(less-than $WORD_LENGTH $UPPER)) "String is valid" "String is invalid"
}
`
const tryControlStructure = '@jehuty echo TODO' // TODO

const Examples = styled.div`
`

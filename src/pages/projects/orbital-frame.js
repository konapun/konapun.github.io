import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import ProjectLayout from '../../components/layout/ProjectLayout'
import OrbitalFrameConsole from '../../components/projects/orbitalFrame/Console'

export const metadata = {
  id: 'orbital-frame',
  name: 'Orbital Frame',
  description: 'Unleash the power of UNIX in your chatbot!',
  link: 'https://github.com/konapun/orbital-frame'
}

export default () => {
  const [ input, setInput ] = useState('')

  const handleTryIt = useCallback(source => {
    // TODO: scroll to top
    setInput(source)
  }, [ setInput ])

  return (
    <ProjectLayout
      title='Orbital Frame'
      description={metadata.description}
      link={metadata.link}
    >
      <p>
        <span className="font-weight-bold">Orbital Frame</span> is a framework for building chatbots which support UNIX-like concepts such as:
        <ul>
          <li>Commands</li>
          <li>Pipes</li>
          <li>Signals</li>
          <li>Variables</li>
          <li>Scripting</li>
        </ul>
        It is designed to run basically everywhere through the use of adapters. Though it was built with chat services such as Slack and Discord in mind,
        it can even run on the web as in the demo below which is running entirely client side. For the full project description, see the <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core/README.md" target="_blank">README</a>.
      </p>
      <p>
        The demo below is Orbital Frame running on a custom web adapter with interaction provided through a React terminal emulator. The bot commands are provided by <a href="https://github.com/konapun/orbital-frame/blob/master/packages/orbital-frame-core-commands/README.md" target="_blank">@orbital-frame/core-commands</a> which
        are a set of basic commands to help you get up and running quickly. If you're looking for a prebuilt bot which is able to run on most chat services, check out <a href="https://github.com/konapun/orbital-frame/tree/master/packages/orbital-frame-jehuty" target="_blank">@orbital-frame/jehuty</a> which is configured to run on Hubot.
        A description of capabilities and examples are given below.
      </p>
      <div>
        <OrbitalFrameConsole input={input}/>
      </div>
      <Examples>
        Examples
      </Examples>
      <hr/>

      <h1>TODO</h1>

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

const tryCommand = '@ifrit echo hello'
const tryCommandWithOptions = '@ifrit choose -n 2 option1 option2 option3 option4'
const tryVariable = '@ifrit $MY_VAR="a variable"; echo $MY_VAR'
const tryInterpolation = '@ifrit echo TODO' // TODO
const tryPipe = "@ifrit echo hello | split -d '' | head -n 4 | join"
const trySignal = '@ifrit echo TODO' // TODO
const tryInteraction = '@ifrit echo TODO' // TODO
const tryFunction = `@ifrit function analyze_length {
  local WORD=$1
  local LOWER=$2
  local UPPER=$3
  local WORD_LENGTH=$(split -d '' $WORD | length)

  if $(and $(greater-than $WORD_LENGTH $LOWER) $(less-than $WORD_LENGTH $UPPER)) "String is valid" "String is invalid"
}
`
const tryControlStructure = '@ifrit echo TODO' // TODO

const Examples = styled.div`
`

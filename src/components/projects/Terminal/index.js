import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Window from '../Window'
import ScrollPane from '../ScrollPane'
import Cursor from './Cursor'

const noop = () => {}

export default ({ title = 'Terminal', prompt, onEnter = noop, maxScrollback = 100 }) => {
  const [ history, setHistory ] = useState([])

  const handleEnter = useCallback(event => {
    const { value } = event.target

    setHistory([ ...(history.length === maxScrollback ? history.slice(1) : history), value ])
    onEnter(value)
  }, [ onEnter, maxScrollback, history, setHistory ])

  return (
    <Window title={title}>
      <ScrollPane>
        <Background>
          {history.map((text, index) => (
            <Line key={index}>
              {text}
            </Line>
          ))}
          <Cursor prompt={prompt} onEnter={handleEnter}/>
        </Background>
      </ScrollPane>
    </Window>
  )
}

const Background = styled.div`
  min-height: 100%;
  height: max-content;
  background-color: #000;
  color: #fff;
  padding: 6px;
`

const Line = styled.div`
  color: #fff;
`

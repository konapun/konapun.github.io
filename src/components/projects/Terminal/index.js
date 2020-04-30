import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { isEqual } from 'lodash'
import styled from 'styled-components'
import Window from '../Window'
import ScrollPane from '../ScrollPane'
import Cursor from './Cursor'
import usePrevious from '../../usePrevious'

const noop = () => {}

export default ({ title = 'Terminal', prompt, onEnter = noop, maxScrollback = 100, output, ...windowProps }) => {
  const mappedOutput = useMemo(() => [ output ].filter(e => e).map(value => ({ type: 'output', value, text: value })), [ output ])
  const [ value, setValue ] = useState('')
  const [ history, setHistory ] = useState(mappedOutput)
  const [ cursorIndex, setCursorIndex ] = useState(0)
  const [ focused, setFocused ] = useState(true)
  const previousOutput = usePrevious(mappedOutput)

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [ setFocused ])

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [ setFocused ])

  const handleChange = useCallback(event => {
    setValue(event.target.value)
  }, [ setValue ])

  const handleEnter = useCallback(async event => {
    const { value } = event.target

    setHistory([ ...(history.length === maxScrollback ? history.slice(1) : history), { type: 'input', value, text: `${prompt} ${value}` }])
    const result = await onEnter(value)
    if (result) {
      setHistory([ ...(history.length === maxScrollback ? history.slice(1) : history), { type: 'output', value: result, text: result } ])
    }
    setValue('')
  }, [ onEnter, prompt, maxScrollback, history, setHistory, setValue ])

  const handleArrowUp = useCallback(event => {
    const previous = [ ...history ].reverse().find(({ type, value }) => type === 'input')
    if (previous) {
      setValue(previous.value)
      setCursorIndex(0) // FIXME:
    }
  }, [ history, setValue ])

  useEffect(() => {
    if (!isEqual(mappedOutput, previousOutput)) {
      setHistory([ ...history, ...mappedOutput ])
    }
  }, [ mappedOutput, previousOutput, history, setHistory])

  return (
    <Window title={title} {...windowProps}>
      <ScrollPane>
        <Background onClick={handleFocus}>
          {history.map(({ text }, index) => (
            <Line key={index}>
              {formatText(text)}
            </Line>
          ))}
          <Cursor
            value={value}
            focused={focused}
            prompt={prompt}
            onChange={handleChange}
            onEnter={handleEnter}
            // onArrowUp={handleArrowUp}
            // onArrowDown={handleArrowDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
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

const Tab = styled.span`
  margin-right: 16px;
`

const formatText = text => text.split('\n').map((piece, index) => (
  <div key={index}>
    {piece.split('\t').map((tab, tabIndex) => (
      <Tab key={tabIndex}>{tab}</Tab>
    ))}
  </div>
))

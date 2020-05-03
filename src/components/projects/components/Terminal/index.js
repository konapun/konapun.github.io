import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { isEqual } from 'lodash'
import styled from 'styled-components'
import Window from '../Window'
import ScrollPane from '../ScrollPane'
import Button from '../Button'
import Cursor from './Cursor'
import PopupWindow from './PopupWindow'
import usePrevious from '../../../usePrevious'

const noop = () => {}

export default ({ title = 'Terminal', prompt, onEnter = noop, maxScrollback = 100, output, ...windowProps }) => {
  const mappedOutput = useMemo(() => [ output ].filter(e => e).map(value => ({ type: 'output', value, text: value })), [ output ])
  const [ value, setValue ] = useState('')
  const [ history, setHistory ] = useState(mappedOutput)
  const [ accumulator, setAccumulator ] = useState('')
  const [ cursorIndex, setCursorIndex ] = useState(0)
  const [ popupVisible, setPopupVisible ] = useState(false)
  const [ focused, setFocused ] = useState(true)
  const previousOutput = usePrevious(mappedOutput)

  const handlePopupClick = useCallback(() => setPopupVisible(true), [ setPopupVisible ])

  const showPopupButton = useMemo(() => (
    <Button onClick={handlePopupClick}>MULTILINE</Button>
  ), [ handlePopupClick ])

  const handlePopupCancel = useCallback(() => {
    setPopupVisible(false)
  }, [ setPopupVisible ])

  const handlePopupEnter = useCallback(text => {
    onEnter(text, { print: true })
    setValue('')
    setPopupVisible(false)
  }, [ onEnter, setValue, setPopupVisible ])

  const handleFocus = useCallback(() => {
    if (!popupVisible) {
      setFocused(true)
    }
  }, [ popupVisible, setFocused ])

  const handleBlur = useCallback(() => {
    setFocused(false)
  }, [ setFocused ])

  const handleChange = useCallback(event => {
    setValue(event.target.value)
  }, [ setValue ])

  const handleEnter = useCallback(event => {
    const { value } = event.target

    setHistory([ ...(history.length === maxScrollback ? history.slice(1) : history), { type: 'input', value, text: `${prompt} ${value}` }])

    if ([ ...value.trim() ].reverse().join()[0] === '\\') {
      const accumulatorValue = value.replace(/\\\w*$/, '')
      setAccumulator([ accumulator, accumulatorValue].join('\n'))
    } else {
      onEnter([ accumulator, value ].join('\n').trim())
      setAccumulator('')
    }
    setValue('')
    setCursorIndex(0)
  }, [ onEnter, prompt, maxScrollback, history, setHistory, setValue, accumulator, setAccumulator ])

  const previousInputs = useMemo(() => [ ...history ].reverse().filter(({ type }) => type === 'input'), [ history ])

  const handleArrowUp = useCallback(event => {
    if (cursorIndex < previousInputs.length) {
      setValue(previousInputs[cursorIndex].value)
      setCursorIndex(cursorIndex + 1)
    }
  }, [ previousInputs, cursorIndex, setValue, setCursorIndex ])


  const handleArrowDown = useCallback(event => {
    if (cursorIndex > 0) {
      setValue(previousInputs[cursorIndex - 1].value)
      setCursorIndex(cursorIndex - 1)
    }
  }, [ previousInputs, cursorIndex, setValue, setCursorIndex ])

  useEffect(() => {
    if (!isEqual(mappedOutput, previousOutput)) {
      setHistory([ ...history, ...mappedOutput ])
    }
  }, [ mappedOutput, previousOutput, history, setHistory])

  return (
    <Window title={title} controls={[showPopupButton]} {...windowProps}>
      <ScrollPane>
        <Background onClick={handleFocus}>
          {history.map(({ text }, index) => (
            <Line key={index}>
              {formatText(text)}
            </Line>
          ))}
          <PopupWindow
            visible={popupVisible}
            onCancel={handlePopupCancel}
            onEnter={handlePopupEnter}
          />
          <Cursor
            value={value}
            focused={focused}
            prompt={prompt}
            onChange={handleChange}
            onEnter={handleEnter}
            onArrowUp={handleArrowUp}
            onArrowDown={handleArrowDown}
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

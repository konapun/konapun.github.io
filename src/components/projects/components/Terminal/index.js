import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Window from '../Window'
import ScrollPane from '../ScrollPane'
import Button from '../Button'
import Cursor from './Cursor'
import PopupWindow from './PopupWindow'

const noop = () => {}

export default ({ title = 'Terminal', prompt, value: history = [], input = '', onEnter = noop, onArrowUp = noop, onArrowDown = noop, ...windowProps }) => {
  const [ value, setValue ] = useState(input)
  const [ popupVisible, setPopupVisible ] = useState(false)
  const [ focused, setFocused ] = useState(true)
  const scroll = useRef(null)

  useEffect(() => {
    setValue(input)
  }, [ input ])

  useEffect(() => {
    if (scroll && scroll.current) {
      scroll.current.scrollTop = scroll.current.scrollHeight
    }
  }, [ scroll, history ])

  const handlePopupClick = useCallback(() => setPopupVisible(true), [ setPopupVisible ])

  const showPopupButton = useMemo(() => (
    <Button onClick={handlePopupClick}>MULTILINE</Button>
  ), [ handlePopupClick ])

  const handlePopupCancel = useCallback(() => {
    setPopupVisible(false)
  }, [ setPopupVisible ])

  const handlePopupEnter = useCallback(text => {
    onEnter(text)
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

  const handleEnter = useCallback(({target}) => {
    onEnter(target.value)
    setValue('')
  }, [ onEnter, setValue ])

  return (
    <Window title={title} controls={[showPopupButton]} {...windowProps}>
      <ScrollPane ref={scroll}>
        <Background onClick={handleFocus}>
          {history.map((line, index) => (
            <Line key={index}>
              {formatText(line)}
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
            onArrowUp={onArrowUp}
            onArrowDown={onArrowDown}
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

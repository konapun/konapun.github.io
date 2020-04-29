import React, { useCallback, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'

const noop = () => {}

export default ({ value = '', prompt = '>', onEnter = noop, onArrowUp = noop, onArrowDown = noop, focused = false, onChange = noop, onFocus = noop, onBlur = noop }) => {
  const inputRef = useRef(null)

  const handleKeyDown = useCallback(event => {
    switch (event.key) {
      case 'Enter':
        return onEnter(event)
      case 'ArrowUp':
        return onArrowUp(event)
      case 'ArrowDown':
        return onArrowDown(event)
    }
  }, [ onEnter, onArrowUp, onArrowDown ])

  useEffect(() => {
    if (focused && inputRef) {
      inputRef.current.focus()
    }
  }, [ focused, inputRef ])

  return (
    <Line>
      <Prompt>{prompt}</Prompt>
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Line>
  )
}

const text = css`
  color: white;
`

const Line = styled.div`
  width: 100%;
  display: flex;
`
const Prompt = styled.span`
  ${text}
  padding: 0 4px 0 0;
`

const Input = styled.input`
  ${text}
  flex: 1;
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;

  &:focus, &:active {
    border: none !important;
    outline: none !important;
  }
`

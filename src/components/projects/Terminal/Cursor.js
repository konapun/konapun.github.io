import React, { useState, useCallback } from 'react'
import styled, { css } from 'styled-components'

export default ({ prompt, onEnter }) => {
  const [ value, setValue ] = useState('')

  const handleChange = useCallback(({target}) => {
    setValue(target.value)
  }, [ setValue ])

  const handleKeyDown = useCallback(event => {
    if (event.key === 'Enter') {
      onEnter(event)
      setValue('')
    }
  }, [ onEnter, setValue ])

  return (
    <Line>
      <Prompt>{prompt}</Prompt>
      <Input type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown}/>
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
  padding: 0 4px;
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

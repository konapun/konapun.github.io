import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Window from '../Window'
import Button from '../Button'

export default ({ visible = false, onCancel, onEnter }) => {
  const [ value, setValue ] = useState('')

  const handleChange = useCallback(({ target }) => {
    setValue(target.value)
  }, [ setValue ])

  const handleEnter = useCallback(() => {
    onEnter(value)
    setValue('')
  }, [ onEnter, value ])

  const enterButton = useMemo(() => (
    <Button onClick={handleEnter}>Enter</Button>
  ), [ handleEnter ])

  const windowControls = useMemo(() => [ enterButton ], [ enterButton ])

  if (!visible) return null
  return (
    <Popup>
      <Window
        title='Enter Multiline Input'
        controls={windowControls} height='100%'
        onClose={onCancel}
      >
        <TextArea value={value} onChange={handleChange}/>
      </Window>
    </Popup>
  )
}

const Popup = styled.div`
  position: absolute;
  top: 6px;
  right: 20px;
  width: 60%;
  height: 90%;
  z-index: 2;
  border: 1px solid #fff;
`

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
`

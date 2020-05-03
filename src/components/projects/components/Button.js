import React from 'react'
import styled from 'styled-components'

export default props => (
  <Button {...props}/>
)

const Button = styled.button`
  box-sizing: border-box;
  border: none;
  border-radius: 0;
  min-width: 75px;
  /* min-height: 23px; */
  padding: 0 12px;

  font-family: "Pixelated MS Sans Serif",Arial;
  -webkit-font-smoothing: none;
  font-size: 11px;

  background: silver;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px grey, inset 2px 2px #dfdfdf;

  :not(:disabled):active {
    box-shadow: inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px grey;
  }
`

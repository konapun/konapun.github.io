import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { darken } from 'polished'

export default ({ value, location = '/' }) => (
  <Tag to={`${location}?tag=${value}`}>
    {value}
  </Tag>
)

const Tag = styled(Link)`
  flex: 0 1 auto;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  background-color: ${({theme}) => theme.accent.background};
  color: ${({theme}) => theme.accent.foreground};
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;

  &:hover {
    background-color: ${({theme}) => darken(0.1, theme.accent.background)};
    color: ${({theme}) => theme.accent.foreground};
    text-decoration: none;
  }
`

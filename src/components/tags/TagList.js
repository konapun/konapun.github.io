import React from 'react'
import Tag from './Tag'
import styled from 'styled-components'

export default ({tags = [], ...props}) => (
  <List>
    {tags.map(tag => (
      <Tag key={tag} value={tag} {...props}/>
    ))}
  </List>
)

const List = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`

const noop = () => {}

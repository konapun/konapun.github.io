import React, {useMemo, useCallback} from 'react'
import { Link, navigate } from 'gatsby'
import styled, { css } from 'styled-components'

export default ({ href, label }) => {
  const handleClick = useCallback(() => navigate(href), [href])

  const button = useMemo(() => (
    <StyledButton type='button' onClick={handleClick} disabled={!href}>
      <i className='fab fa fa-arrow-left'/>
    </StyledButton>
  ), [handleClick, href])

  const link = useMemo(() => (
    <StyledLink className='nav-link' to={href} disabled={!href}>
      {label}
    </StyledLink>
  ), [href, label])

  return label ? link : button
}

const StyledButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: 0;
  color: #fff;
  font-size: 1.5rem;
  ${props =>
    props.disabled &&
      css`
      color: rgba(255, 255, 255, 0.4);
      `
  }
`

const StyledLink = styled(Link)``


import React, {useState, useMemo, useCallback} from 'react'

export default function Overflow({ max, children }) {
  const [ expanded, setExpanded ] = useState(false)

  const handleClick = useCallback(() => {
    setExpanded(!expanded)
  }, [ expanded, setExpanded ])

  const items = useMemo(() => expanded ? children : children.slice(0, max), [ expanded, children, max ])

  return (
    <div>
      {items}
      {children.length > max && (
        <div className='text-md-right'>
          <button type='button' className='btn btn-link' onClick={handleClick}>{expanded ? 'less' : 'more'}</button>
        </div>
      )}
    </div>
  )
}

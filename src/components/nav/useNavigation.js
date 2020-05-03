import { useContext, useEffect } from 'react'
import { isEqual } from 'lodash'
import NavContext from './NavContext'
import usePrevious from '../usePrevious'

export default navigation => {
  const { setNavigation } = useContext(NavContext)

  const previousNavigation = usePrevious(navigation)
  useEffect(() => {
    if (!isEqual(navigation, previousNavigation)) {
      setNavigation(navigation)
    }
  }, [ setNavigation, navigation, previousNavigation])
}

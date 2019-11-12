import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 *  implementing it at Router
 *  Navigating away from gitUsersList page
 *  and back to the top of page
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}




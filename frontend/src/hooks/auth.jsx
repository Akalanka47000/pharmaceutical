import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const blacklistedPaths = []

const useAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    if (!localStorage.getItem('token') && blacklistedPaths.includes(window.location.pathname.split('/')[1])) {
      navigate('/login')
    }
  }, [location])
}

export default useAuth
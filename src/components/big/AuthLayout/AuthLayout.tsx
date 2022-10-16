import { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

interface AuthLayoutProps {
  children?: ReactNode
  isLogin?: boolean
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, isLogin = false }) => {
  const [showPage, setShowPage] = useState(false)

  const router = useRouter()

  const processSuccess = () => {
    if (isLogin) {
      router.push('/')
    } else {
      setShowPage(true)
    }
  }
  const processFailure = () => {
    if (!isLogin) {
      router.push('/login')
    } else {
      setShowPage(true)
    }
  }

  const authenticate = () => {
    return axios
      .post('/authentication/token/verify/', { token: localStorage.getItem('accessToken') })
      .then(() => processSuccess())
      .catch(() => refreshAuthentication())
  }
  const refreshAuthentication = () => {
    axios
      .post('/authentication/token/refresh/', { refresh: localStorage.getItem('refreshToken') })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.access)
        processSuccess()
      })
      .catch(() => processFailure())
  }

  useEffect(() => {
    authenticate()
  }, [])

  return showPage ? <>{children}</> : null
}

export default AuthLayout

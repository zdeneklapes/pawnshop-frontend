import { FC, ReactNode, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { UserContext } from '@pages/_app'
import { getUserInformation } from '@components/globals/utils'

interface AuthLayoutProps {
  children?: ReactNode
  isLogin?: boolean
  isAdminPage?: boolean
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, isLogin = false, isAdminPage = false }) => {
  const [showPage, setShowPage] = useState(false)

  const router = useRouter()
  const { user }: any = useContext(UserContext)

  const processSuccess = () => {
    if (isLogin) {
      router.push('/')
    } else {
      if (isAdminPage) {
        const role = user.role ? user.role : getUserInformation(localStorage.getItem('accessToken')).role
        if (role === 'ADMIN') {
          setShowPage(true)
        } else {
          router.push('/')
        }
      } else {
        setShowPage(true)
      }
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

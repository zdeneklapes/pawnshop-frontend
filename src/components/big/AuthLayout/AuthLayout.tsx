import { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { apiService } from '@api/service/service'

interface AuthLayoutProps {
  children?: ReactNode
  isLogin?: boolean
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, isLogin = false }) => {
  const [showPage, setShowPage] = useState(false)

  const router = useRouter()

  const authenticate = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      return await apiService.post('authentication/token/verify/', { json: { token: token } })
    } catch (error) {
      console.error(error)
    }
  }
  const refreshAuthentication = async () => {
    try {
      const token = localStorage.getItem('refreshToken')
      const result: { access: string } = await apiService
        .post('authentication/token/refresh/', { json: { refresh: token } })
        .json()
      localStorage.setItem('accessToken', result.access)
      return result
    } catch (error) {
      console.error(error)
    }
  }

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

  const redirect = () => {
    authenticate().then((response) => {
      if (response?.status === 200) {
        processSuccess()
      } else {
        refreshAuthentication()
          .then(() => {
            authenticate().then((response) => {
              if (response?.status === 200) {
                processSuccess()
              } else {
                processFailure()
              }
            })
          })
          .catch(() => processFailure())
      }
    })
  }

  useEffect(() => {
    redirect()
  }, [])

  return showPage ? <>{children}</> : null
}

export default AuthLayout

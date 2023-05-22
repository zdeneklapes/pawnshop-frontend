import '@/styles/globals.css'import type { AppProps } from 'next/app'
import { useEffect, useState, createContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { getUserInformation } from '@components/globals/utils'

export const UserContext = createContext({})

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>({})

  const router = useRouter()
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API_URL
  axios.defaults.headers.common['Content-Type'] = 'application/json'

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/zoznam/zastavarna/')
    }
  }, [router.pathname])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(getUserInformation(localStorage.getItem('accessToken')))
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp

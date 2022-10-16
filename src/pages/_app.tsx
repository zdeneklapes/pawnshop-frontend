import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API_URL
  // axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}` // todo
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/zoznam/zastavarna/')
    }
  }, [router.pathname])
  return <Component {...pageProps} />
}

export default MyApp

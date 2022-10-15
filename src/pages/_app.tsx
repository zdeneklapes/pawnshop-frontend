import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/zoznam/zastavarna/')
    }
  }, [router.pathname])
  return <Component {...pageProps} />
}

export default MyApp

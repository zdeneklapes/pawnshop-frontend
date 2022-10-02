import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Router from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const { pathname } = Router
    if (pathname === '/') {
      Router.push('/zoznam/zastavarna/')
    }
  })
  return <Component {...pageProps} />
}

export default MyApp

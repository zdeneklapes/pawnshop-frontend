import type { NextPage } from 'next'
import Head from 'next/head'

import { MainLayout } from '@components/big/MainLayout'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Index</title>
      </Head>

      <main>
        <MainLayout />
      </main>
    </div>
  )
}

export default Home

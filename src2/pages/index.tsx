import type {NextPage} from 'next'
import Head from 'next/head'

import {MainLayout} from '@components/big/MainLayout'
import {AuthLayout} from '@components/big/AuthLayout'

const Home: NextPage = () => {
  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Index</title>
        </Head>
        <main>
          <MainLayout/>
        </main>
      </div>
    </AuthLayout>
  )
}

export default Home

import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { Navbar } from '@components/medium/Navbar'

const Medzisklad: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Medzisklad</title>
      </Head>

      <MainLayout>
        <Navbar />
        <div>Medzisklad</div>
      </MainLayout>
    </div>
  )
}

export default Medzisklad

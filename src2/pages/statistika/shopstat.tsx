import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { Statbar } from '@components/medium/Statbar'
import { ShopStatTable } from '@components/medium/ShopStatTable'
import { AuthLayout } from '@components/big/AuthLayout'

const Shopstat: NextPage = () => {
  return (
    <AuthLayout isAdminPage>
      <div>
        <Head>
          <title>Shopstat</title>
        </Head>

        <main>
          <MainLayout>
            <Statbar />
            <ShopStatTable />
          </MainLayout>
        </main>
      </div>
    </AuthLayout>
  )
}

export default Shopstat

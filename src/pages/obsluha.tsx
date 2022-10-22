import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { AuthLayout } from '@components/big/AuthLayout'
import UserTable from '@components/medium/UserTable/UserTable'
import { Register } from '@components/medium/Register'

const Obsluha: NextPage = () => {
  return (
    <AuthLayout isAdminPage>
      <div>
        <Head>
          <title>Obsluha</title>
        </Head>

        <main>
          <MainLayout>
            <div className="flex mt-32 justify-center h-full w-full space-x-20">
              <UserTable />
              <Register />
            </div>
          </MainLayout>
        </main>
      </div>
    </AuthLayout>
  )
}
export default Obsluha

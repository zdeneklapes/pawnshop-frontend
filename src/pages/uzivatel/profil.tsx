import Head from 'next/head'
import { useContext } from 'react'

import { MainLayout } from '@components/big/MainLayout'
import { AuthLayout } from '@components/big/AuthLayout'
import { UserEditForm } from '@components/forms/UserEditForm'

import { UserContext } from '@pages/_app'

const UserProfile = () => {
  const { user }: any = useContext(UserContext)

  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Uživatel</title>
        </Head>

        <MainLayout>
          <div className="flex items-center justify-center h-full w-full">
            <UserEditForm user={user} />
          </div>
        </MainLayout>
      </div>
    </AuthLayout>
  )
}

export default UserProfile

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchUser } from '@api/service/service'
import { MainLayout } from '@components/big/MainLayout'
import { AuthLayout } from '@components/big/AuthLayout'
import { UserEditForm } from '@components/forms/UserEditForm'
import { getUserInformation } from '@components/globals/utils'

const UserProfile = () => {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; role: string; id: string }>()

  useEffect(() => {
    const result = fetchUser(Number(getUserInformation(localStorage.getItem('accessToken')).id)) // todo test this, nemal som permissions
    if (result) {
      result
        .then((user) => {
          if (user) {
            setUser(user)
          } else {
            router.push('/')
          }
        })
        .catch(() => router.push('/'))
    }
  }, [])
  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Uživatel</title>
        </Head>

        <MainLayout>
          <div className="flex items-center justify-center h-full w-full">
            {user ? <UserEditForm user={user} /> : null}
          </div>
        </MainLayout>
      </div>
    </AuthLayout>
  )
}

export default UserProfile

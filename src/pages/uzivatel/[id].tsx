import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchUser } from '@api/service/service'
import { MainLayout } from '@components/big/MainLayout'
import { AuthLayout } from '@components/big/AuthLayout'
import { UserEditForm } from '@components/forms/UserEditForm'
const Uzivatel = () => {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; role: string; id: string }>()

  useEffect(() => {
    if (router.isReady) {
      const result = fetchUser(Number(router.query.id))
      if (result) {
        result.then((user) => {
          setUser(user)
        })
      }
    }
  }, [router.isReady])
  return (
    <AuthLayout isAdminPage>
      <div>
        <Head>
          <title>Uživatel</title>
        </Head>

        <MainLayout>
          <div className="flex items-center justify-center h-full w-full">
            {user ? <UserEditForm user={user} /> : <p className="font-md text-2xl">Uživatel se nepodařil načíst.</p>}
          </div>
        </MainLayout>
      </div>
    </AuthLayout>
  )
}

export default Uzivatel

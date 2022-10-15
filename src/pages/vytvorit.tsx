import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { ProductCreationForm } from '@components/forms/ProductCreationForm'
import { AuthLayout } from '@components/big/AuthLayout'
const Vytvorit: NextPage = () => {
  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Vytvořiť</title>
        </Head>

        <main>
          <MainLayout>
            <div className="flex items-center justify-center h-full w-full">
              <ProductCreationForm />
            </div>
          </MainLayout>
        </main>
      </div>
    </AuthLayout>
  )
}

export default Vytvorit

import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { ProductForm } from '@components/forms/ProductForm'
const Vytvorit: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pridať</title>
      </Head>

      <main>
        <MainLayout>
          <div className="flex items-center justify-center h-full w-full">
            <ProductForm />
          </div>
        </MainLayout>
      </main>
    </div>
  )
}

export default Vytvorit

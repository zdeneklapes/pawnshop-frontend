import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { ProductCreationForm } from '@components/forms/ProductCreationForm'
import { AuthLayout } from '@components/big/AuthLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useState } from 'react'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'
import { fetchProduct } from '@api/service/service'

const Vytvorit: NextPage = () => {
  const router = useRouter()
  const [product, setProduct] = useState<ProductTableFetchingProps>()
  const productid = router.query.productid

  useEffect(() => {
    if (router.isReady && productid) {
      const result = fetchProduct(Number(productid))
      if (result) {
        result.then((product) => {
          setProduct(product)
        })
      }
    }
  }, [router.isReady])
  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Vytvořiť</title>
        </Head>

        <main>
          <MainLayout>
            <div className="flex items-center justify-center h-full w-full">
              <ProductCreationForm product={product} />
            </div>
          </MainLayout>
        </main>
      </div>
    </AuthLayout>
  )
}

export default Vytvorit

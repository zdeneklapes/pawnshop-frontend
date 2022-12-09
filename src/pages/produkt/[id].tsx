import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchProduct } from '@api/service/service'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'
import { ProductEditForm } from '@components/forms/ProductEditForm'
import { MainLayout } from '@components/big/MainLayout'
import { AuthLayout } from '@components/big/AuthLayout'

const Product = () => {
  const router = useRouter()
  const [product, setProduct] = useState<ProductTableFetchingProps>()
  useEffect(() => {
    if (router.isReady) {
      const result = fetchProduct(Number(router.query.id))
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
          <title>Produkt</title>
        </Head>

        <MainLayout>
          <div className="flex items-center justify-center h-full w-full">
            {product ? (
              <ProductEditForm product={product} />
            ) : (
              <p className="font-md text-2xl">Produkt se nepodařilo načíst.</p>
            )}
          </div>
        </MainLayout>
      </div>
    </AuthLayout>
  )
}

export default Product

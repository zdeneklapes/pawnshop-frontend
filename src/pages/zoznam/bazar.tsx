import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { Navbar } from '@components/medium/Navbar'
import { useEffect, useState } from 'react'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'
import { fetchProducts } from '@api/service/service'
import { ProductTable } from '@components/medium/ProductTable'
import { AuthLayout } from '@components/big/AuthLayout'

const Bazar: NextPage = () => {
  const [offerProduct, setOfferProduct] = useState<ProductTableFetchingProps[]>([])

  useEffect(() => {
    fetchProducts('OFFER').then((customers) => {
      setOfferProduct(customers)
    })
  }, [])
  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Bazar</title>
        </Head>

        <MainLayout>
          <Navbar />
          <ProductTable products={offerProduct} />
        </MainLayout>
      </div>
    </AuthLayout>
  )
}

export default Bazar

import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { Navbar } from '@components/medium/Navbar'
import { useEffect, useState } from 'react'
import { fetchProducts } from '@api/service/service'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'
import { ProductTable } from '@components/medium/ProductTable'
import { AuthLayout } from '../../components/big/AuthLayout'

const Medzisklad: NextPage = () => {
  const [afterMaturityProduct, setafterMaturityProduct] = useState<ProductTableFetchingProps[]>([])

  useEffect(() => {
    fetchProducts('AFTER_MATURITY').then((customers) => {
      setafterMaturityProduct(customers)
    })
  }, [])
  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Medzisklad</title>
        </Head>

        <MainLayout>
          <Navbar />
          <ProductTable products={afterMaturityProduct} />
        </MainLayout>
      </div>
    </AuthLayout>
  )
}

export default Medzisklad

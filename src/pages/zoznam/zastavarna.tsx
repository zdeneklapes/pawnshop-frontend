import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { Navbar } from '@components/medium/Navbar'
import { useEffect, useState } from 'react'
import { fetchProducts } from '@api/service/service'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'

import { ProductTable } from '@components/medium/ProductTable'
import { AuthLayout } from '@components/big/AuthLayout'

const Zastavarna: NextPage = () => {
  const [loanProduct, setLoanProduct] = useState<ProductTableFetchingProps[]>([])

  useEffect(() => {
    fetchProducts('LOAN').then((customers) => {
      setLoanProduct(customers)
    })
  }, [])

  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Zastavárna</title>
        </Head>

        <main>
          <MainLayout>
            <Navbar />
            <ProductTable products={loanProduct} />
          </MainLayout>
        </main>
      </div>
    </AuthLayout>
  )
}

export default Zastavarna

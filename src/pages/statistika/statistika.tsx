import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { Statbar } from '@components/medium/Statbar'
import { useEffect, useState } from 'react'
import { fetchStatistics } from '@api/service/service'

import { StatisticsTable } from '@components/medium/StatisticsTable'
import { AuthLayout } from '@components/big/AuthLayout'

const Statistika: NextPage = () => {
  const [defaultStatistic, setDefaultStatistic] = useState<any>([])

  useEffect(() => {
    fetchStatistics('ALL').then((fetchedAllStats) => {
      setDefaultStatistic(fetchedAllStats)
    })
  }, [])

  return (
    <AuthLayout>
      <div>
        <Head>
          <title>Statistika</title>
        </Head>

        <main>
          <MainLayout>
            <Statbar />
            <StatisticsTable statistics={defaultStatistic} />
          </MainLayout>
        </main>
      </div>
    </AuthLayout>
  )
}

export default Statistika

import type { NextPage } from 'next'
import Head from 'next/head'
import { MainLayout } from '@components/big/MainLayout'
import { Statbar } from '@components/medium/Statbar'
import { useEffect, useState } from 'react'
import { fetchStatistics } from '@api/service/service'

import { DailyStatTable } from '@components/medium/DailyStatTable'
import { AuthLayout } from '@components/big/AuthLayout'

const Denna: NextPage = () => {
  const [defaultStatistic, setDefaultStatistic] = useState<any>([])

  useEffect(() => {
    fetchStatistics('DAILY_STATS').then((fetchedDailyStat) => {
      setDefaultStatistic(fetchedDailyStat)
    })
  }, [])

  return (
    <AuthLayout isAdminPage>
      <div>
        <Head>
          <title>Denna</title>
        </Head>

        <main>
          <MainLayout>
            <Statbar />
            <DailyStatTable dailystats={defaultStatistic} />
          </MainLayout>
        </main>
      </div>
    </AuthLayout>
  )
}

export default Denna

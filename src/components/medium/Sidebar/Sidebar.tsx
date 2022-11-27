import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@pages/_app'
import { getUserRole } from '@components/globals/utils'
import { fetchStatistics } from '@api/service/service'
import { StatisticsCashAmountFetchingProps } from '@components/medium/Sidebar/Sidebar.types'

const navigationRoutes = [
  { route: '/zoznam/zastavarna', name: 'Seznam' },
  { route: '/vytvorit', name: 'Vytvořiť' },
  { route: '/obsluha', name: 'Obsluha' },
  { route: '/statistika/statistika', name: 'Statistika' }
]

const SidebarProps = () => {
  const { user }: any = useContext(UserContext)
  const router = useRouter()
  const [cashAmountStat, setCashAmountStat] = useState<StatisticsCashAmountFetchingProps[]>([])

  useEffect(() => {
    fetchStatistics('CASH_AMOUNT').then((fetchedCashAmountStats) => {
      setCashAmountStat(fetchedCashAmountStats)
    })
  })
  return (
    <div className="mt-2 flex w-64 flex-col border-r border-gray-300 px-2">
      <div
        className="mb-4 flex flex-col items-center justify-center truncate rounded-2xl border-2 border-black py-2 px-2 font-medium shadow-lg hover:cursor-pointer hover:bg-gray-100"
        onClick={() => router.push('/uzivatel/profil')}
      >
        <div>{user.email}</div>
        <div className="text-xl">{getUserRole(user.role)}</div>
      </div>

      <nav className="w-full divide-y divide-gray-400 ">
        {navigationRoutes.map((page) =>
          page.route !== '/obsluha' || user.role === 'ADMIN' ? (
            <Link key={page.route} href={page.route}>
              <span
                className={clsx(
                  'flex w-full flex-col items-center py-4  text-2xl hover:cursor-pointer hover:text-gray-700',
                  {
                    'font-bold ': router.pathname === page.route
                  }
                )}
              >
                {page.name}
              </span>
            </Link>
          ) : null
        )}
        <span
          onClick={() => {
            localStorage.setItem('accessToken', '')
            localStorage.setItem('refreshToken', '')
            router.push('/login')
          }}
          className="flex w-full flex-col items-center py-4  text-2xl hover:cursor-pointer hover:text-gray-700"
        >
          Odhlasit
        </span>
      </nav>
      {cashAmountStat[0] && (
        <div className="mt-auto mb-4 flex w-full flex-col items-center align-bottom text-2xl font-bold">
          {cashAmountStat[0].amount} Kč
        </div>
      )}
    </div>
  )
}

export default SidebarProps

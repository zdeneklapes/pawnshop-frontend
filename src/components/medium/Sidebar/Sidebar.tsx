import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { useContext } from 'react'
import { UserContext } from '@pages/_app'
import { getUserRole } from '@components/globals/utils'

const navigationRoutes = [
  { route: '/zoznam/zastavarna', name: 'Seznam' },
  { route: '/vytvorit', name: 'Vytvořiť' },
  { route: '/obsluha', name: 'Obsluha' },
  { route: '/statistika/statistika', name: 'Statistika' }
]

const SidebarProps = () => {
  const { user }: any = useContext(UserContext)
  const router = useRouter()
  return (
    <div className="flex flex-col mt-2 w-64 border-gray-300 border-r px-2">
      <div
        className="flex flex-col justify-center items-center rounded-2xl py-2 px-2 mb-4 border-2 border-black shadow-lg font-medium truncate hover:cursor-pointer hover:bg-gray-100"
        onClick={() => router.push('/uzivatel/profil')}
      >
        <div>{user.email}</div>
        <div className="text-xl">{getUserRole(user.role)}</div>
      </div>

      <nav className="divide-y divide-gray-400 w-full ">
        {navigationRoutes.map((page) =>
          page.route !== '/obsluha' || user.role === 'ADMIN' ? (
            <Link key={page.route} href={page.route}>
              <span
                className={clsx(
                  'flex flex-col w-full py-4 text-2xl  items-center hover:cursor-pointer hover:text-gray-700',
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
          className="flex flex-col w-full py-4 text-2xl  items-center hover:cursor-pointer hover:text-gray-700"
        >
          Odhlasit
        </span>
      </nav>
    </div>
  )
}

export default SidebarProps

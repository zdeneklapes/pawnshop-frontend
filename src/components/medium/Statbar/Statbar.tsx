import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '@pages/_app'

const navigationRoutes = [
  { route: '/statistika/statistika', name: 'Vsechny' },
  { route: '/statistika/denna', name: 'Denne' },
  { route: '/statistika/shopstat', name: 'Obchod' }
]

const Statbar = () => {
  const { user }: any = useContext(UserContext)
  const router = useRouter()
  return (
    <nav className="relative flex flex-row justify-center space-x-20 w-full my-10 ">
      {navigationRoutes.map((page) => 
      (page.route !== '/statistika/denna' && page.route !== '/statistika/shopstat') || user.role === 'ADMIN' ? (
        <Link key={page.route} href={page.route}>
          <span
            className={clsx(
              'flex justify-center border border-gray-400 rounded-2xl shadow px-10 w-48 h-12 items-center shadow hover:cursor-pointer hover:border-black hover:bg-gray-50 ',
              {
                'border-2 border-black shadow-lg font-medium': router.pathname === page.route
              }
            )}
          >
            {page.name}
          </span>
        </Link>
      ) : null
      )}
    </nav>
  )
}

export default Statbar

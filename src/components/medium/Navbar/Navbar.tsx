import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from 'next/link'

const navigationRoutes = [
  { route: '/zastavarna', name: 'Zastavárna' },
  { route: '/medzisklad', name: 'Medzisklad' },
  { route: '/bazar', name: 'Bazar' }
]

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className="flex flex-row w-full h-20  border-gray-300 border-b items-center justify-evenly">
      {navigationRoutes.map((page) => (
        <Link key={page.route} href={page.route}>
          <span
            className={clsx('hover:cursor-pointer font-semibold text-xl', {
              'text-emerald-800': router.pathname === page.route
            })}
          >
            {page.name}
          </span>
        </Link>
      ))}
    </nav>
  )
}

export default Navbar

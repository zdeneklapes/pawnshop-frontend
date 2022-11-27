import clsx from 'clsx'
import { useRouter } from 'next/router'
import Link from 'next/link'

const navigationRoutes = [
  { route: '/zoznam/zastavarna', name: 'Zastavárna' },
  { route: '/zoznam/medzisklad', name: 'Mezisklad' },
  { route: '/zoznam/bazar', name: 'Bazar' }
]

const Navbar = () => {
  const router = useRouter()
  return (
    <nav className="flex flex-row justify-center space-x-20 w-full my-10 ">
      {navigationRoutes.map((page) => (
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
      ))}
    </nav>
  )
}

export default Navbar

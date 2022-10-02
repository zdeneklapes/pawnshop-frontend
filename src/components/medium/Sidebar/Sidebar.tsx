import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

const navigationRoutes = [
  { route: '/zoznam/zastavarna', name: 'Zoznam' },
  { route: '/vytvorit', name: 'Vytvořiť' }
]

const SidebarProps = () => {
  const router = useRouter()
  return (
    <div className="flex mt-2 w-64 border-gray-300 border-r">
      <nav className="mx-2 divide-y divide-gray-400 w-full mt-16">
        {navigationRoutes.map((page) => (
          <Link key={page.route} href={page.route}>
            <span
              className={clsx('flex flex-col w-full py-4 text-2xl  items-center font-semibold hover:cursor-pointer', {
                'text-emerald-800': router.pathname === page.route
              })}
            >
              {page.name}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default SidebarProps

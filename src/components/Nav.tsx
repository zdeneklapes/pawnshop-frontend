import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/">
        <h1 className="text-2xl font-bold">Root</h1>
      </Link>

      {["shops"].map((title: string, index: number) => (
        <Link key={index} href={`/${title}`}>{title}</Link>
      ))}
    </nav>
  )
}

export default Nav

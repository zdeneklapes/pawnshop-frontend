import '@/styles/globals.css'
// import Nav from '@/components/Nav'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pawn Shop',
  description: 'All pawn shops in one place, find the best deals.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*<html lang="en" suppressHydrationWarning={true}>*/}
      <Head>
        <title>Pawnshop</title>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        {/*<body>*/}
        <main>
          <Sidebar />
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}

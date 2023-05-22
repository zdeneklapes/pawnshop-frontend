import '@styles/globals.css'
import Nav from '@components/nav'
import {Inter} from 'next/font/google'
import Head from 'next/head'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'Pawn Shop',
  description: 'All pawn shops in one place, find the best deals.',
}

export default function RootLayout({children,}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <Head>
      {/*<title>asasa</title>*/}
      <title>{metadata.title}</title>
    </Head>
    <body className={inter.className}>
    <main>
      <Nav/>
      layout_Starts
      {children}
      layout_Ends
    </main>
    </body>
    </html>
  )
}

import './globals.css'
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
      <title>{metadata.title}</title>
    </Head>
    <body className={inter.className}>{children}aa</body>
    </html>
  )
}

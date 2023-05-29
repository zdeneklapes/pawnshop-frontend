'use client'
import '@/styles/globals.css'
// import Nav from '@/components/Nav'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })
const metadata: Metadata = {
  title: 'Pawnshop',
  description: 'Pawnshop is a web application for managing pawnshop business.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        {/*<title>Pawnshop</title>*/}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={inter.className}>
        <main>
          <Sidebar />
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  )
}

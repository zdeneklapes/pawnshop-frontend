import { FC, ReactNode } from 'react'

import { Navbar } from '@components/medium/Navbar'
import { Sidebar } from '@components/medium/Sidebar'

interface MainLayoutProps {
  children?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex h-full flex-row">
        <Sidebar />
        {children}
      </div>
    </div>
  )
}

export default MainLayout

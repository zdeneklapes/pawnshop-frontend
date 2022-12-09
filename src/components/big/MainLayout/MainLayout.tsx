import { FC, ReactNode } from 'react'

import { Sidebar } from '@components/medium/Sidebar'

interface MainLayoutProps {
  children?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">{children}</div>
    </div>
  )
}

export default MainLayout

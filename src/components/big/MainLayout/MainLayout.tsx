import { FC, ReactNode } from 'react'

// import { Navbar } from '@components/medium/Navbar'
import { Sidebar } from '@components/medium/Sidebar'

interface MainLayoutProps {
  children?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex h-full flex-col w-full">
        {/*<Navbar />*/}
        {children}
      </div>
    </div>
  )
}

export default MainLayout

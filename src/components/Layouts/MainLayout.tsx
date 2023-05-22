import Sidebar from "@/components/Sidebar";
import React, {FC, ReactNode} from "react";

interface MainLayoutProps {
  children?: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({children}: MainLayoutProps) => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar/>
      <div className="flex flex-col w-full">{children}</div>
    </div>
  )
}


export default MainLayout

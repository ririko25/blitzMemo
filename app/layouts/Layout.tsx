import Sidebar from "app/layouts/Sidebar"
import { ReactNode, Suspense } from "react"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <div className="flex bg-gray-100 min-h-screen w-screen">
        <Suspense fallback="Loading...">
          <Sidebar />
        </Suspense>
        <main className="w-full">{children}</main>
      </div>
    </>
  )
}

export default Layout

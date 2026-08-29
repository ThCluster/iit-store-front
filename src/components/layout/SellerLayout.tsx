import { Outlet } from 'react-router-dom'
import { SellerHeader } from './SellerHeader'
import { SellerFooter } from './SellerFooter'

export function SellerLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <SellerHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SellerFooter />
    </div>
  )
}
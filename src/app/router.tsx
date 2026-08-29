import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense, type ReactNode } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { SellerLayout } from '@/components/layout/SellerLayout'
// import { ProtectedRoute } from '@/features/auth'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const ProductsPage = lazy(() => import('@/pages/boutique/product/ProductsPage'))
const ProductDetailPage = lazy(() => import('@/pages/boutique/product/ProductDetailPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const CartPage = lazy(() => import('@/pages/cart/CartPage'))
const FavoritesPage = lazy(() => import('@/pages/favorites/FavoritesPage'))
const CheckoutPage = lazy(() => import('@/pages/checkout/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('@/pages/checkout/OrderConfirmationPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const SellerDashboardPage = lazy(() => import('@/pages/seller/SellerDashboardPage'))
const NotFoundPage = lazy(() => import('@/pages/not-found/NotFoundPage'))

function withSuspense(children: ReactNode) {
  return <Suspense fallback={<div className="p-8 text-center">Chargement...</div>}>{children}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'products', element: withSuspense(<ProductsPage />) },
      { path: 'products/:id', element: withSuspense(<ProductDetailPage />) },
      { path: 'cart', element: withSuspense(<CartPage />) },
      { path: 'favorites', element: withSuspense(<FavoritesPage />) },
      { path: 'checkout', element: withSuspense(<CheckoutPage />) },
      { path: 'order-confirmation', element: withSuspense(<OrderConfirmationPage />) },
      { path: 'dashboard', element: withSuspense(<DashboardPage />) },
      // {
      //   path: 'dashboard',
      //   element: <ProtectedRoute>{withSuspense(<DashboardPage />)}</ProtectedRoute>,
      // },
      { path: '*', element: withSuspense(<NotFoundPage />) },
    ],
  },
  {
    path: '/seller-dashboard',
    element: <SellerLayout />,
    children: [
      { index: true, element: withSuspense(<SellerDashboardPage />) },
    ],
  },
  {
    path: '/login',
    element: withSuspense(<LoginPage />),
  },
  {
    path: '/register',
    element: withSuspense(<RegisterPage />),
  },
])
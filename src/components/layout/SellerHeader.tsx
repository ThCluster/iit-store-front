import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

export function SellerHeader() {
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setProfileOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link to="/seller-dashboard" className="flex shrink-0 items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e63946] text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </span>
          <span className="text-xl font-black tracking-tight sm:text-2xl">
            IIT<span className="text-[#e63946]">_STORE</span>
          </span>
        </Link>

        {/* Espace vendeur */}
        <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 md:flex">
          <span className="text-sm font-semibold text-primary">Espace vendeur</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Cloche de notification */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifOpen((o) => !o)
                setProfileOpen(false)
              }}
              className="btn btn-ghost btn-circle"
              aria-label="notifications"
              title="Notifications"
              aria-expanded={notifOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#e63946] text-[10px] font-bold text-white">
                3
              </span>
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-base-200 bg-white p-2 shadow-lg">
                <p className="px-3 py-2 text-sm font-semibold">Notifications</p>
                <div className="space-y-1">
                  <div className="rounded-lg bg-base-100 p-3">
                    <p className="text-sm font-medium">Nouvelle commande</p>
                    <p className="text-xs text-base-content/60">#CMD-2026-0842 · il y a 5 min</p>
                  </div>
                  <div className="rounded-lg bg-base-100 p-3">
                    <p className="text-sm font-medium">Produit en rupture</p>
                    <p className="text-xs text-base-content/60">Coque de protection · il y a 1 h</p>
                  </div>
                  <div className="rounded-lg bg-base-100 p-3">
                    <p className="text-sm font-medium">Nouvel avis</p>
                    <p className="text-xs text-base-content/60">5 étoiles · il y a 2 h</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profil boutique */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen((o) => !o)
                setNotifOpen(false)
              }}
              className="flex items-center gap-2 rounded-full p-1 transition hover:bg-base-200"
              aria-label="ma boutique"
              aria-expanded={profileOpen}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e63946] text-sm font-bold text-white">
                T
              </div>
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold leading-tight">TechWorld</p>
                <p className="text-xs text-base-content/60">Vendeur</p>
              </div>
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full z-30 mt-2 w-48 rounded-xl border border-base-200 bg-white p-2 shadow-lg">
                <div className="border-b border-base-200 px-3 py-2">
                  <p className="text-sm font-semibold">TechWorld</p>
                  <p className="text-xs text-base-content/60">vendeur@techworld.com</p>
                </div>
                <Link
                  to="/seller-dashboard"
                  onClick={() => setProfileOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                  Ma boutique
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error hover:bg-error/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
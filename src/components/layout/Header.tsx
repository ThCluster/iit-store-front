import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { demoCategories } from '@/features/products/demoData'
import { useAuth } from '@/features/auth/AuthContext'

export function Header() {
  const [cartItems] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { isLoggedIn, role, logout } = useAuth()
  const navigate = useNavigate()

  const isSeller = role === 'seller'
  const dashboardPath = isSeller ? '/seller-dashboard' : '/dashboard'
  const profileName = isSeller ? 'TechWorld' : 'Awa Koné'
  const profileEmail = isSeller ? 'vendeur@techworld.com' : 'awa@exemple.com'
  const profileInitial = isSeller ? 'T' : 'A'

  function handleLogout() {
    logout()
    setProfileOpen(false)
    setMenuOpen(false)
    navigate('/')
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set('q', search.trim())
    if (category) params.set('category', category)
    navigate(`/products?${params.toString()}`)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-20 border-b border-base-300 bg-base-100 shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        {/* Ligne principale */}
        <div className="flex items-center justify-between gap-4">
          {/* Menu hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="btn btn-ghost btn-circle md:hidden"
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Logo (centré) */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e63946] text-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </span>
            <span className="text-xl font-black tracking-tight sm:text-2xl">
              IIT<span className="text-[#e63946]">_STORE</span>
            </span>
          </Link>

          {/* Barre de recherche (desktop) */}
          <form
            onSubmit={handleSearch}
            className="mx-auto hidden w-full max-w-xl md:block"
          >
            <div className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-3 py-1.5 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/40"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-28 shrink-0 cursor-pointer border-l border-base-300 bg-transparent pl-2 text-xs font-medium text-black outline-none"
                aria-label="Catégorie"
              >
                <option value="">Catégorie</option>
                {demoCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </form>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1">
            {/* Panier */}
            <Link
              to="/cart"
              aria-label="panier"
              className="btn btn-ghost btn-circle relative"
              title="Panier"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {cartItems > 0 && (
                <div className="absolute -right-1 -top-1 rounded-full bg-secondary px-1.5 py-0.5 text-xs font-semibold text-secondary-content">
                  {cartItems}
                </div>
              )}
            </Link>

            {/* Favoris */}
            <Link
              to="/favorites"
              aria-label="favoris"
              className="btn btn-ghost btn-circle relative"
              title="Favoris"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </Link>

            {/* Profil / Avatar */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((o) => !o)}
                  className="btn btn-ghost btn-circle"
                  aria-label="mon compte"
                  title={isSeller ? 'Ma boutique' : 'Mon compte'}
                  aria-expanded={profileOpen}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e63946] text-sm font-bold text-white">
                    {profileInitial}
                  </div>
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full z-30 mt-2 w-48 rounded-xl border border-base-200 bg-white p-2 shadow-lg">
                    <div className="border-b border-base-200 px-3 py-2">
                      <p className="text-sm font-semibold">{profileName}</p>
                      <p className="text-xs text-base-content/60">{profileEmail}</p>
                    </div>
                    <Link
                      to={dashboardPath}
                      onClick={() => setProfileOpen(false)}
                      className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-base-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                      </svg>
                      {isSeller ? 'Ma boutique' : 'Mon compte'}
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
            ) : (
              <Link
                to="/login"
                aria-label="se connecter"
                className="btn btn-ghost btn-circle"
                title="Se connecter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Barre de recherche (mobile / tablette) */}
        <form onSubmit={handleSearch} className="mt-3 w-full md:hidden">
          <div className="flex items-center gap-2 rounded-full border border-base-300 bg-base-100 px-3 py-1.5 shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/40"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-28 shrink-0 cursor-pointer border-l border-base-300 bg-transparent pl-2 text-xs font-medium text-black outline-none"
              aria-label="Catégorie"
            >
              <option value="">Catégorie</option>
              {demoCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Menu déroulant mobile */}
        {menuOpen && (
          <nav className="mt-3 flex flex-col gap-1 border-t border-base-200 pt-3 md:hidden">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
            >
              Accueil
            </Link>
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
            >
              Produits
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to={dashboardPath}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
                >
                  {isSeller ? 'Ma boutique' : 'Mon compte'}
                </Link>
                {!isSeller && (
                  <>
                    <Link
                      to="/cart"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
                    >
                      Mon panier
                    </Link>
                    <Link
                      to="/favorites"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
                    >
                      Mes favoris
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-base-200"
                >
                  Créer un compte
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
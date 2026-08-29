import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="border-b px-4 py-3">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">iit-store</Link>
        <div className="flex gap-4">
          <Link to="/products">Produits</Link>
          <Link to="/cart">Panier</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/products" className="btn btn-primary">Produits</Link>
        </div>
      </nav>
    </header>
  )
}
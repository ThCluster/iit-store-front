import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-b px-4 py-3">
      <nav className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">iit-store</Link>
        <div className="flex gap-4">
          <h1></h1>
        </div>
      </nav>
    </footer>
  )
}
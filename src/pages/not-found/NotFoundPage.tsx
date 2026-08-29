import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="mt-2 text-gray-600">Page introuvable</p>
            <Link to="/" className="mt-4 text-blue-600 underline">Retour à l'accueil</Link>
        </div>
    )
}
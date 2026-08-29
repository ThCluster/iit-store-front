import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // TODO: appeler l'API d'authentification
    login('buyer')
    navigate('/products')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e63946] text-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </span>
            <span className="text-2xl font-black tracking-tight">
              IIT<span className="text-[#e63946]">_STORE</span>
            </span>
          </Link>
        </div>

        {/* Carte de connexion */}
        <div className="card bg-white shadow-xl">
          <div className="card-body p-8">
            <h1 className="text-center text-2xl font-bold">Connexion</h1>
            <p className="mt-1 text-center text-sm text-base-content/60">
              Accédez à votre compte pour continuer
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text">Adresse e-mail</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Mot de passe */}
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input input-bordered w-full"
                  required
                />
                <label className="label">
                  <span className="label-text-alt link link-primary cursor-pointer">
                    Mot de passe oublié ?
                  </span>
                </label>
              </div>

              {/* Bouton */}
              <button type="submit" className="btn btn-primary btn-block">
                Se connecter
              </button>
            </form>

            {/* Séparateur */}
            <div className="divider my-4 text-xs text-base-content/50">ou</div>

            {/* Lien inscription */}
            <p className="text-center text-sm text-base-content/60">
              Pas encore de compte ?{' '}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>

        {/* Lien retour */}
        <p className="mt-6 text-center text-sm">
          <Link to="/" className="link link-hover text-base-content/60">
            Retour à l'accueil
          </Link>
        </p>
      </div>
    </div>
  )
}
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { register as apiRegister, login as apiLogin, getProfil } from '@/services/auth'

type Role = 'buyer' | 'seller'

export default function RegisterPage() {
  const [role, setRole] = useState<Role>('buyer')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [shopName, setShopName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginWithProfile } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const [firstLast = '', ...rest] = name.trim().split(/\s+/)
    const last = rest.join(' ')
    try {
      await apiRegister({
        username: email,
        email,
        first_name: firstLast,
        last_name: last || undefined,
        telephone: phone,
        password,
        password_confirmation: password,
        role: role === 'seller' ? 'vendeur' : 'client',
      })
      await apiLogin(email, password)
      const profil = await getProfil()
      loginWithProfile(profil)
      navigate(role === 'seller' ? '/seller-dashboard' : '/products')
    } catch (err) {
      setError("L'inscription a échoué. Vérifiez vos informations et réessayez.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-100 px-4 py-8">
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

        {/* Carte d'inscription */}
        <div className="card bg-white shadow-xl">
          <div className="card-body p-8">
            <h1 className="text-center text-2xl font-bold">Créer un compte</h1>
            <p className="mt-1 text-center text-sm text-base-content/60">
              Rejoignez la marketplace en tant que
            </p>

            {/* Choix du rôle */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('buyer')}
                className={`card cursor-pointer border-2 p-4 text-center transition ${
                  role === 'buyer'
                    ? 'border-primary bg-primary/5'
                    : 'border-base-300 hover:border-base-content/30'
                }`}
              >
                <div className="text-3xl font-black text-primary">A</div>
                <h3 className="mt-2 font-semibold">Acheteur</h3>
                <p className="mt-1 text-xs text-base-content/60">
                  Acheter des produits
                </p>
              </button>
              <button
                type="button"
                onClick={() => setRole('seller')}
                className={`card cursor-pointer border-2 p-4 text-center transition ${
                  role === 'seller'
                    ? 'border-primary bg-primary/5'
                    : 'border-base-300 hover:border-base-content/30'
                }`}
              >
                <div className="text-3xl font-black text-primary">V</div>
                <h3 className="mt-2 font-semibold">Vendeur</h3>
                <p className="mt-1 text-xs text-base-content/60">
                  Vendre vos produits
                </p>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Nom complet */}
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text">Nom complet</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Numéro de téléphone */}
              <div className="form-control">
                <label className="label" htmlFor="phone">
                  <span className="label-text">Numéro de téléphone</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+225 07 00 00 00 00"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Nom de la boutique (vendeur uniquement) */}
              {role === 'seller' && (
                <div className="form-control">
                  <label className="label" htmlFor="shopName">
                    <span className="label-text">Nom de la boutique</span>
                  </label>
                  <input
                    id="shopName"
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Ex : TechWorld"
                    className="input input-bordered w-full"
                    required
                  />
                </div>
              )}

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
              </div>

              {/* Bouton */}
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading
                  ? 'Création...'
                  : role === 'seller'
                    ? 'Créer ma boutique'
                    : 'Créer mon compte'}
              </button>

              {/* Erreur */}
              {error && (
                <p className="text-center text-sm font-medium text-error">{error}</p>
              )}
            </form>

            {/* Séparateur */}
            <div className="divider my-4 text-xs text-base-content/50">ou</div>

            {/* Lien connexion */}
            <p className="text-center text-sm text-base-content/60">
              Déjà un compte ?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Se connecter
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
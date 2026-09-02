import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'

type Section = 'overview' | 'products' | 'orders' | 'reviews' | 'settings'

interface NavItem {
  id: Section
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Tableau de bord', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
  { id: 'products', label: 'Mes produits', icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
  { id: 'orders', label: 'Commandes reçues', icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
  { id: 'reviews', label: 'Avis reçus', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
  { id: 'settings', label: 'Réglages boutique', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z' },
]

export default function SellerDashboardPage() {
  const [section, setSection] = useState<Section>('overview')
  const { profil } = useAuth()
  const profileName = profil
    ? `${profil.first_name || ''} ${profil.last_name || ''}`.trim() || profil.username
    : 'Ma boutique'
  const profileEmail = profil?.email ?? ''
  const profileInitial = profil
    ? (profil.first_name || profil.username || 'V').charAt(0).toUpperCase()
    : 'V'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card bg-base-100 shadow-sm lg:sticky lg:top-24">
            <div className="card-body p-4">
              {/* Profil boutique */}
              <div className="mb-4 border-b border-base-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    {profileInitial}
                  </div>
                  <div>
                    <p className="font-semibold">{profileName}</p>
                    <p className="text-xs text-base-content/60">{profileEmail}</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5 text-sm">
                  {profil?.telephone && (
                    <div className="flex items-center gap-2 text-base-content/70">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      {profil.telephone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-base-content/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {profil?.role ?? 'Vendeur'}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:space-y-1 lg:overflow-visible lg:pb-0">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition lg:w-full ${
                      section === item.id
                        ? 'bg-primary/10 font-semibold text-primary'
                        : 'hover:bg-base-200'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={item.icon} />
                    </svg>
                    <span className="hidden sm:inline">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Déconnexion */}
              <div className="mt-4 border-t border-base-200 pt-4">
                <Link
                  to="/login"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-error transition hover:bg-error/10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                  Se déconnecter
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenu */}
        <main className="lg:col-span-3">
          {section === 'overview' && <Overview />}
          {section === 'products' && <Products />}
          {section === 'orders' && <Orders />}
          {section === 'reviews' && <Reviews />}
          {section === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  )
}

function Overview() {
  const { profil } = useAuth()
  const shopName = profil
    ? `${profil.first_name || ''} ${profil.last_name || ''}`.trim() || profil.username
    : 'boutique'

  const stats = [
    { label: 'Ventes', value: '0', icon: 'M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z' },
    { label: 'Produits', value: '0', icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
    { label: 'Commandes', value: '0', icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
    { label: 'Note moyenne', value: '-', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
  ]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Bonjour, {shopName} !</h1>
      <p className="mb-6 text-sm text-base-content/60">
        Bienvenue dans votre espace vendeur. Voici un aperçu de votre boutique.
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={stat.icon} />
                </svg>
              </div>
              <p className="mt-3 text-2xl font-black">{stat.value}</p>
              <p className="text-sm text-base-content/60">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-6 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-base">Dernière commande reçue</h2>
          <p className="mt-3 text-sm text-base-content/60">
            Aucune commande reçue pour le moment.
          </p>
        </div>
      </div>
    </div>
  )
}

function Products() {
  const [showModal, setShowModal] = useState(false)
  const [products, setProducts] = useState<{
    name: string
    price: string
    stock: number
    status: string
  }[]>([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  function addTag() {
    const trimmed = tagInput.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags((prev) => [...prev, trimmed])
      setTagInput('')
    }
  }

  function removeTag(tag: string) {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  function handleAddProduct(e: FormEvent) {
    e.preventDefault()
    const newProduct = {
      name,
      price: `${Number(price).toLocaleString('fr-FR')} FCFA`,
      stock: Number(stock),
      status: Number(stock) > 0 ? 'Actif' : 'Rupture',
    }
    setProducts((prev) => [newProduct, ...prev])
    setShowModal(false)
    setName('')
    setPrice('')
    setStock('')
    setCategory('')
    setDescription('')
    setImagePreview(null)
    setTags([])
    setTagInput('')
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-black">Mes produits</h1>
        <div className="flex gap-2">
          <Link to="/products" className="btn btn-outline btn-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Voir sur la boutique
          </Link>
          <button onClick={() => setShowModal(true)} className="btn btn-primary btn-sm">
            Ajouter un produit
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {products.map((product) => (
          <div key={product.name} className="card bg-base-100 shadow-sm">
            <div className="card-body p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-base-content/60">{product.price} · Stock : {product.stock}</p>
                </div>
                <span className={`badge badge-outline ${product.status === 'Actif' ? 'badge-success' : 'badge-error'}`}>
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'ajout de produit */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="card max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-b-none bg-white shadow-2xl sm:rounded-b-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-5 sm:p-6">
              {/* En-tête */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">Ajouter un produit</h2>
                  <p className="text-sm text-base-content/60">Renseignez les informations du produit</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-ghost btn-circle btn-sm"
                  aria-label="Fermer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Formulaire */}
              <form onSubmit={handleAddProduct} className="mt-4 space-y-4">
                {/* Image du produit */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Image du produit</span>
                  </label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-base-300 bg-base-100 p-6 transition hover:border-primary">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <p className="mt-2 text-sm font-medium">Cliquez pour ajouter une image</p>
                        <p className="text-xs text-base-content/50">PNG, JPG jusqu'à 5 Mo</p>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nom du produit</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Smartphone X200"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Prix (FCFA)</span>
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="299990"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Stock</span>
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="45"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Catégorie</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>Sélectionnez une catégorie</option>
                    <option value="electronics">Électronique</option>
                    <option value="fashion">Mode</option>
                    <option value="home">Maison</option>
                    <option value="sports">Sport</option>
                    <option value="beauty">Beauté</option>
                    <option value="toys">Jouets</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Décrivez votre produit..."
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                </div>

                {/* Étiquettes */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Étiquettes</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                      placeholder="Ex : neuf, promo..."
                      className="input input-bordered w-full"
                    />
                    <button type="button" onClick={addTag} className="btn btn-outline">
                      Ajouter
                    </button>
                  </div>
                  {tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <span key={tag} className="badge badge-primary badge-outline gap-1">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-xs hover:text-error"
                            aria-label={`Retirer ${tag}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <button type="submit" className="btn btn-primary flex-1">
                    Ajouter le produit
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn btn-ghost"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Orders() {
  const orders: {
    id: string
    date: string
    total: string
    status: string
    client: string
  }[] = []

  const statusClass: Record<string, string> = {
    'À expédier': 'badge-warning',
    'Expédiée': 'badge-info',
    'Livrée': 'badge-success',
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Commandes reçues</h1>
      {orders.length === 0 ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <p className="text-base-content/60">Aucune commande reçue pour le moment.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card bg-base-100 shadow-sm">
              <div className="card-body p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-base-content/60">{order.date} · {order.client}</p>
                  </div>
                  <span className={`badge badge-outline ${statusClass[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-base-200 pt-3">
                  <span className="font-bold text-primary">{order.total}</span>
                  <button className="btn btn-outline btn-sm">Détails</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Reviews() {
  const reviews: { client: string; rating: number; comment: string }[] = []

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Avis reçus</h1>
      {reviews.length === 0 ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <p className="text-base-content/60">Aucun avis reçu pour le moment.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.client} className="card bg-base-100 shadow-sm">
              <div className="card-body p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{review.client}</p>
                  <div className="flex gap-0.5 text-warning">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? '' : 'opacity-30'}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-base-content/70">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Settings() {
  const { profil } = useAuth()
  const shopName = profil
    ? `${profil.first_name || ''} ${profil.last_name || ''}`.trim() || profil.username
    : ''
  const email = profil?.email ?? ''
  const phone = profil?.telephone ?? ''
  const initial = profil
    ? (profil.first_name || profil.username || 'V').charAt(0).toUpperCase()
    : 'V'

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Réglages</h1>

      {/* Paramètres vendeur */}
      <section className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-base">Paramètres vendeur</h2>
          <p className="text-sm text-base-content/60">Informations de votre boutique</p>

          <div className="mt-4 space-y-4">
            {/* Photo de la boutique */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo de la boutique</span>
              </label>
              <div className="flex items-center gap-6">
                {/* Cercle style Instagram story */}
                <div className="relative">
                  {/* Dégradé arc-en-ciel autour */}
                  <div className="rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px]">
                    <div className="rounded-full bg-white p-[3px]">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-3xl font-bold text-primary">
                        {initial}
                      </div>
                    </div>
                  </div>
                  {/* Bouton + pour ajouter */}
                  <label className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#e63946] text-white shadow-md transition hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                </div>
                <div>
                  <p className="text-sm font-medium">Photo de profil</p>
                  <p className="text-xs text-base-content/60">
                    Cliquez sur le bouton + pour ajouter une photo
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Nom de la boutique</span>
                </label>
                <input type="text" defaultValue={shopName} className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">E-mail</span>
                </label>
                <input type="email" defaultValue={email} className="input input-bordered w-full" />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description de la boutique</span>
              </label>
              <textarea
                defaultValue=""
                className="textarea textarea-bordered w-full"
                rows={3}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contact</span>
                </label>
                <input type="text" defaultValue={phone} className="input input-bordered w-full" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Téléphone</span>
                </label>
                <input type="tel" defaultValue={phone} className="input input-bordered w-full" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ville</span>
                </label>
                <select className="select select-bordered w-full" defaultValue="Abidjan">
                  <option>Abidjan</option>
                  <option>Bouaké</option>
                  <option>Daloa</option>
                  <option>Yamoussoukro</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Pays</span>
                </label>
                <select className="select select-bordered w-full" defaultValue="CI">
                  <option value="CI">Côte d'Ivoire</option>
                  <option value="SN">Sénégal</option>
                  <option value="ML">Mali</option>
                  <option value="BF">Burkina Faso</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Horaires d'ouverture</span>
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <input type="time" defaultValue="08:00" className="input input-bordered w-full" />
                <input type="time" defaultValue="18:00" className="input input-bordered w-full" />
              </div>
            </div>

            <button className="btn btn-primary mt-2">Enregistrer la boutique</button>
          </div>
        </div>
      </section>

      {/* Réglages compte */}
      <section className="card mt-6 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-base">Réglages compte</h2>
          <p className="text-sm text-base-content/60">Gérez votre compte vendeur</p>

          <div className="mt-4 space-y-4">
            {/* Informations personnelles */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                Informations personnelles
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nom complet</span>
                  </label>
                  <input type="text" defaultValue={shopName} className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">E-mail</span>
                  </label>
                  <input type="email" defaultValue={email} className="input input-bordered w-full" />
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="border-t border-base-200 pt-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                Sécurité
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mot de passe actuel</span>
                  </label>
                  <input type="password" placeholder="••••••••" className="input input-bordered w-full" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nouveau mot de passe</span>
                  </label>
                  <input type="password" placeholder="••••••••" className="input input-bordered w-full" />
                </div>
              </div>
            </div>

            {/* Préférences */}
            <div className="border-t border-base-200 pt-4">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                Préférences
              </h3>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center justify-between rounded-lg bg-base-100 p-3">
                  <div>
                    <p className="text-sm font-medium">Notifications par e-mail</p>
                    <p className="text-xs text-base-content/60">Recevoir les alertes de commandes</p>
                  </div>
                  <input type="checkbox" defaultChecked className="toggle toggle-primary" />
                </label>
                <label className="flex cursor-pointer items-center justify-between rounded-lg bg-base-100 p-3">
                  <div>
                    <p className="text-sm font-medium">Notifications SMS</p>
                    <p className="text-xs text-base-content/60">Alertes de nouvelles commandes</p>
                  </div>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </div>
            </div>

            <button className="btn btn-primary mt-2">Enregistrer le compte</button>
          </div>
        </div>
      </section>
    </div>
  )
}
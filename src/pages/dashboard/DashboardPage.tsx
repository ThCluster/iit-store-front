import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthContext'
import { getCommandes } from '@/services/store'
import type { Commande } from '@/types/store'

type Section = 'overview' | 'orders' | 'favorites' | 'reviews' | 'addresses' | 'settings'

interface NavItem {
  id: Section
  label: string
  icon: string
}

interface Order {
  id: string
  date: string
  total: string
  status: string
  items: number
  payment: string
  address: string
  products: { name: string; qty: number; price: string }[]
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Tableau de bord', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
  { id: 'orders', label: 'Mes commandes', icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
  { id: 'favorites', label: 'Mes favoris', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
  { id: 'reviews', label: 'Mes avis', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
  { id: 'addresses', label: 'Mes adresses', icon: 'M15 10.5a3 3 0 11-6 0 3 3 0 016 0zM19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z' },
  { id: 'settings', label: 'Réglages', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28z' },
]

export default function DashboardPage() {
  return <DashboardLayout />
}

export function DashboardLayout() {
  const [section, setSection] = useState<Section>('overview')
  const { profil } = useAuth()
  const profileName = profil
    ? `${profil.first_name || ''} ${profil.last_name || ''}`.trim() || profil.username
    : 'Mon compte'
  const profileEmail = profil?.email ?? ''
  const profileInitial = profil
    ? (profil.first_name || profil.username || 'A').charAt(0).toUpperCase()
    : 'A'

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card bg-base-100 shadow-sm lg:sticky lg:top-24">
            <div className="card-body p-4">
              {/* Profil */}
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
                    {profil?.role ?? 'Acheteur'}
                  </div>
                </div>
              </div>

              {/* Navigation : horizontale sur mobile, verticale sur desktop */}
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
          {section === 'orders' && <Orders />}
          {section === 'favorites' && <Favorites />}
          {section === 'reviews' && <Reviews />}
          {section === 'addresses' && <Addresses />}
          {section === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  )
}

function Overview() {
  const { profil } = useAuth()
  const [commandes, setCommandes] = useState<Commande[]>([])
  useEffect(() => {
    getCommandes().then(setCommandes).catch(() => setCommandes([]))
  }, [])

  const stats = [
    { label: 'Commandes', value: String(commandes.length), icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z' },
    { label: 'Favoris', value: '8', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    { label: 'Avis laissés', value: '5', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
    { label: 'Livraisons', value: String(commandes.length), icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12' },
  ]

  const firstName = profil?.first_name || profil?.username || ''
  const lastCommande = commandes[0]

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Bonjour, {firstName} !</h1>
      <p className="mb-6 text-sm text-base-content/60">
        Bienvenue dans votre espace client. Voici un aperçu de votre activité.
      </p>

      {/* Statistiques */}
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

      {/* Dernière commande */}
      <div className="card mt-6 bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-base">Dernière commande</h2>
          {lastCommande ? (
            <div className="mt-3 flex items-center justify-between rounded-xl bg-base-200 p-4">
              <div>
                <p className="font-semibold">#{lastCommande.number}</p>
                <p className="text-sm text-base-content/60">
                  {Math.round(lastCommande.total).toLocaleString('fr-FR')} FCFA ·{' '}
                  {lastCommande.lignes?.length ?? 0} article(s)
                </p>
              </div>
              <span className="badge badge-success badge-outline">
                {lastCommande.statut}
              </span>
            </div>
          ) : (
            <p className="mt-3 text-sm text-base-content/60">
              Aucune commande pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function Orders() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    getCommandes().then((cmds) => {
      setOrders(
        cmds.map((c) => ({
          id: c.number ? `#${c.number}` : `#${c.id}`,
          date: '-',
          total: `${Math.round(c.total).toLocaleString('fr-FR')} FCFA`,
          status: c.statut || '-',
          items: c.lignes?.length ?? 0,
          payment: '-',
          address: c.destination || '-',
          products: (c.lignes ?? []).map((l) => ({
            name: l.product_name || `Produit #${l.product_id}`,
            qty: l.quantity,
            price: `${Math.round(Number(l.unit_price ?? 0)).toLocaleString('fr-FR')} FCFA`,
          })),
        })),
      )
    }).catch(() => setOrders([]))
  }, [])

  const statusClass: Record<string, string> = {
    'Livrée': 'badge-success',
    'En cours': 'badge-warning',
    'Annulée': 'badge-error',
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Mes commandes</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="card bg-base-100 shadow-sm">
            <div className="card-body p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-sm text-base-content/60">{order.date} · {order.items} article{order.items > 1 ? 's' : ''}</p>
                </div>
                <span className={`badge badge-outline ${statusClass[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-base-200 pt-3">
                <span className="font-bold text-primary">{order.total}</span>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="btn btn-outline btn-sm"
                >
                  Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détail */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:px-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="card max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-b-none bg-white shadow-2xl sm:rounded-b-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-5 sm:p-6">
              {/* En-tête */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">{selectedOrder.id}</h2>
                  <p className="text-sm text-base-content/60">{selectedOrder.date}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="btn btn-ghost btn-circle btn-sm"
                  aria-label="Fermer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Statut */}
              <div className="mt-2">
                <span className={`badge badge-outline ${statusClass[selectedOrder.status]}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Articles */}
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                  Articles
                </h3>
                <div className="space-y-2">
                  {selectedOrder.products.map((product) => (
                    <div
                      key={product.name}
                      className="flex items-center justify-between rounded-lg bg-base-100 p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-base-content/60">x{product.qty}</p>
                      </div>
                      <span className="text-sm font-semibold">{product.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Livraison */}
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                  Livraison
                </h3>
                <p className="text-sm text-base-content/70">{selectedOrder.address}</p>
              </div>

              {/* Paiement */}
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-base-content/50">
                  Paiement
                </h3>
                <p className="text-sm text-base-content/70">{selectedOrder.payment}</p>
              </div>

              {/* Total */}
              <div className="mt-4 flex items-center justify-between border-t border-base-200 pt-4">
                <span className="font-bold">Total</span>
                <span className="text-lg font-black text-primary">{selectedOrder.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Favorites() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Mes favoris</h1>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <p className="text-base-content/60">Aucun favori pour le moment.</p>
          <Link to="/favorites" className="btn btn-primary btn-sm mt-4 w-fit">
            Voir mes favoris
          </Link>
        </div>
      </div>
    </div>
  )
}

function Reviews() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Mes avis</h1>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <p className="text-base-content/60">Aucun avis pour le moment.</p>
        </div>
      </div>
    </div>
  )
}

function Addresses() {
  const addresses: { label: string; detail: string }[] = []

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Mes adresses</h1>
      {addresses.length === 0 ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <p className="text-base-content/60">Aucune adresse enregistrée.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div key={addr.label} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <p className="font-semibold">{addr.label}</p>
                <p className="text-sm text-base-content/60">{addr.detail}</p>
                <button className="btn btn-outline btn-sm mt-3 w-fit">Modifier</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn btn-primary mt-4">Ajouter une adresse</button>
    </div>
  )
}

function Settings() {
  const { profil } = useAuth()
  const name = profil
    ? `${profil.first_name || ''} ${profil.last_name || ''}`.trim() || profil.username
    : ''
  const email = profil?.email ?? ''
  const phone = profil?.telephone ?? ''

  return (
    <div>
      <h1 className="mb-6 text-2xl font-black">Réglages</h1>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom complet</span>
            </label>
            <input type="text" defaultValue={name} className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input type="email" defaultValue={email} className="input input-bordered w-full" />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Téléphone</span>
            </label>
            <input type="tel" defaultValue={phone} className="input input-bordered w-full" />
          </div>
          <button className="btn btn-primary mt-2">Enregistrer</button>
        </div>
      </div>
    </div>
  )
}
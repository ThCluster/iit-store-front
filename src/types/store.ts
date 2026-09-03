export interface PanierItem {
  id: number
  slug: string
  product: number
  product_name: string
  product_price: string | number
  product_image: string
  quantity: number
  sub_total: string | number
}

export interface Panier {
  id: number
  slug: string
  profil: number | null
  session_key: string | null
  items: PanierItem[]
  total: number
}

export interface LigneCommande {
  id: number
  slug: string
  quantity: number
  order_id: number
  sub_total: string | number
  product_id: number
  unit_price: string | number
  product_name: string
  product_image: string
}

export interface Commande {
  id: number
  slug: string
  number: string
  statut: string
  lignes: LigneCommande[]
  total: number
  destination: string
}

export interface Livraison {
  id: number
  slug: string
  city: string
  order: {
    id: number
    slug: string
    number: string
    statut: string
    destination: string
  } | null
  status: string
  country: string
  order_id: number
  shipped_at: string | null
  expected_at: string | null
  delivered_at: string | null
  tracking_number: string
}

export interface ModeDeReglement {
  id: number
  slug: string
  name: string
  type: string
  is_active: boolean
}
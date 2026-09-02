export interface Categorie {
  id: number
  slug: string
  name: string
  description?: string
}

export interface Etiquette {
  id: number
  slug: string
  name: string
  description?: string
}

export interface Product {
  id: number
  slug: string
  name: string
  price: number | string
  description: string
  vendeur: number
  vendeur_nom: string | null
  categorie: Categorie
  etiquettes: Etiquette[]
}
export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface Seller {
  id: string
  name: string
  logo: string
  rating: number
  productsCount: number
}

export interface Review {
  id: string
  author: string
  rating: number
  comment: string
}

// Catégories de démonstration (à remplacer par l'API plus tard)
export const demoCategories: Category[] = [
  { id: 'electronics', name: 'Électronique', icon: 'electronics', color: 'bg-blue-100' },
  { id: 'fashion', name: 'Mode', icon: 'fashion', color: 'bg-pink-100' },
  { id: 'home', name: 'Maison', icon: 'home', color: 'bg-amber-100' },
  { id: 'sports', name: 'Sport', icon: 'sports', color: 'bg-green-100' },
  { id: 'beauty', name: 'Beauté', icon: 'beauty', color: 'bg-purple-100' },
  { id: 'toys', name: 'Jouets', icon: 'toys', color: 'bg-red-100' },
]

// Vendeurs de démonstration (à remplacer par l'API plus tard)
export const demoSellers: Seller[] = [
  { id: 's1', name: 'TechWorld', logo: 'T', rating: 4.8, productsCount: 120 },
  { id: 's2', name: 'FashionHub', logo: 'F', rating: 4.6, productsCount: 85 },
  { id: 's3', name: 'HomeDecor', logo: 'H', rating: 4.9, productsCount: 64 },
  { id: 's4', name: 'SportZone', logo: 'S', rating: 4.7, productsCount: 98 },
]

// Avis clients de démonstration (à remplacer par l'API plus tard)
export const demoReviews: Review[] = [
  {
    id: 'r1',
    author: 'Awa Koné',
    rating: 5,
    comment:
      'Excellente plateforme ! J\'ai reçu ma commande en 48h et le produit était conforme à la description. Je recommande vivement.',
  },
  {
    id: 'r2',
    author: 'Jean-Marc Kouassi',
    rating: 4,
    comment:
      'Très bon choix de produits et vendeurs sérieux. Le paiement par mobile money est très pratique. Petit bémol sur les délais de livraison.',
  },
  {
    id: 'r3',
    author: 'Fatou Diabaté',
    rating: 5,
    comment:
      'Enfin une marketplace locale fiable ! Les prix sont compétitifs et le service client est réactif. Je suis devenue une cliente fidèle.',
  },
]
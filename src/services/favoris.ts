import api from '@/services/api'

export interface Favori {
  id: number
  profil: number
  produit: number
  produit_id: number
  produit_name: string
  produit_price: string | number
  produit_image: string
}

export async function getFavoris(): Promise<Favori[]> {
  const { data } = await api.get<Favori[]>('/store/api/favori/')
  return data
}

export async function addFavori(produitId: number): Promise<Favori> {
  const { data } = await api.post<Favori>('/store/api/favori/', { produit: produitId })
  return data
}

export async function removeFavori(favoriId: number): Promise<void> {
  await api.delete(`/store/api/favori/${favoriId}/`)
}
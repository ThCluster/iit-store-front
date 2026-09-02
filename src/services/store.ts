import api from '@/services/api'
import type {
  Panier,
  Commande,
  Livraison,
  ModeDeReglement,
} from '@/types/store'

// --- Panier ---
export async function getPanier(): Promise<Panier> {
  const { data } = await api.get<Panier>('/store/api/panier/')
  return data
}

// Ajouter un produit (panier anonyme via session_key géré côté Django)
export function addToPanier(productId: number, quantity = 1): Promise<Panier> {
  return api
    .post<Panier>('/store/api/panier/ajouter/', { product: productId, quantity })
    .then((res) => res.data)
}

// Retirer une quantité (ou l'article si quantité atteint 0)
export function removeFromPanier(
  productId: number,
  quantity = 1,
): Promise<Panier> {
  return api
    .post<Panier>('/store/api/panier/retirer/', { product: productId, quantity })
    .then((res) => res.data)
}

// Fusionner le panier de session dans le panier du profil (après connexion)
export async function fusionnerPanier(): Promise<Panier> {
  const { data } = await api.post<Panier>('/store/api/panier/fusionner/')
  return data
}

// --- Commandes ---
export async function getCommandes(): Promise<Commande[]> {
  const { data } = await api.get<Commande[]>('/store/api/commande/')
  return data
}

export async function createCommande(payload: {
  destination: string
  lignes: { product_id: number; quantity: number }[]
}): Promise<Commande> {
  const { data } = await api.post<Commande>('/store/api/commande/', payload)
  return data
}

// --- Livraisons ---
export async function getLivraisons(): Promise<Livraison[]> {
  const { data } = await api.get<Livraison[]>('/store/api/livraison/')
  return data
}

// --- Modes de règlement ---
export async function getModesReglement(): Promise<ModeDeReglement[]> {
  const { data } = await api.get<ModeDeReglement[]>('/store/api/modeReglement/')
  return data
}
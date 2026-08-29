import type { Product } from '@/types/product'

export async function getProducts(): Promise<Product[]> {
  const res = await fetch('/api/products')
  if (!res.ok) throw new Error('Erreur lors du chargement des produits')
  return res.json()
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`/api/products/${id}`)
  if (!res.ok) throw new Error('Produit introuvable')
  return res.json()
}
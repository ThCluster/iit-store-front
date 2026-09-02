import api from '@/services/api'
import type { Product, Categorie } from '@/types/product'

export async function getProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>('/vendor/api/produits/')
  return data
}

export async function getProductById(id: string | number): Promise<Product> {
  const { data } = await api.get<Product>(`/vendor/api/produits/${id}/`)
  return data
}

export async function getCategories(): Promise<Categorie[]> {
  const { data } = await api.get<Categorie[]>('/vendor/api/categories/')
  return data
}
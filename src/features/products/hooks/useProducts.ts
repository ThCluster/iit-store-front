import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById, getCategories } from '../api/getProducts'

export function useProducts() {
  return useQuery({ queryKey: ['products'], queryFn: getProducts })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}

export function useCategories() {
  return useQuery({ queryKey: ['categories'], queryFn: getCategories })
}
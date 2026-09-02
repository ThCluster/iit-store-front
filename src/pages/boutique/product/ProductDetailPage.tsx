import { useParams } from 'react-router-dom'
import { useProduct } from '@/features/products'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: product, isLoading } = useProduct(id!)

  if (isLoading) return <p className="container mx-auto px-4 py-8">Chargement...</p>
  if (!product) return <p className="container mx-auto px-4 py-8">Produit introuvable</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-xl text-gray-700">{Math.round(Number(product.price)).toLocaleString('fr-FR')} FCFA</p>
    </div>
  )
}
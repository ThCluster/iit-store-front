import { useProducts, ProductCard } from '@/features/products'

export default function ProductsPage() {
    const {data: products, isLoading, error} = useProducts()

    if (isLoading) return <p className="container mx-auto px-4 py-8">Chargement...</p>
    if (error) return <p className="container mx-auto px-4 py-8">Erreur de chargement</p>

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-2xl font-semibold">Nos produits</h1>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {products?.map((p) => <ProductCard key={p.id} product={p}/>)}
            </div>
        </div>
    )
}
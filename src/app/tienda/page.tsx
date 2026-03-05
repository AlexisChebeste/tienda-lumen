
import ShopView from "@/components/shop/shop-view"
import { getProductsSearch, parseFilters } from "@/services/catalog.service"

type Props = {
  searchParams: Promise<{
    category?: string
    color?: string
    size?: string
    priceRange?: string
    sort?: string
    page?: string
  }>
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams
  const filters =  parseFilters(params)
  
  const pagination = {
    page: Number(params.page) || 1,
    limit: 10,
    sort: params.sort as "price-asc" | "price-desc" | "newest" || 'newest'
  }

  const products = await getProductsSearch(filters, pagination)

  return (
    <ShopView
      products={products.data}
      total={products.total}
      page={products.page}
      limit={products.limit}
    />
  )
}

import { CatalogProduct, ProductVariant } from "@/domain/catalog.types";
import { categories } from "@/domain/categories";
import { colors } from "@/domain/colors";
import { ProductImage } from "@/domain/product-image";
import { sizes } from "@/domain/sizes";
import { productImages } from "@/mock/product-images.mock";
import { products } from "@/mock/products.mock";
import { variants } from "@/mock/variants.mock";


export async function getCatalogProducts() {
  const result: CatalogProduct[] = products.map(product => {
    const productVariants : ProductVariant[] = variants
      .filter(v => v.productId === product.id)
      .map(v => ({
        id: v.id,
        productId: v.productId,
        price: v.price,
        stock: v.stock,
        sku: v.sku,
        color: colors.find(c => c.id === v.colorId)!,
        size: sizes.find(s => s.id === v.sizeId)!,
        image: productImages.find(
          img => img.productId === product.id && img.colorId === v.colorId
        )?.url || ''
      }));

    return {
      ...product,
      category: categories.find(c => c.id === product.categoryId)!,
      variants: productVariants,
      images: productImages.filter(img => img.productId === product.id),
    };
  });

  return result;
}

export async function getProductsPopular() {
  const result: CatalogProduct[] = products.map(product => {
    const productVariants = variants
      .filter(v => v.productId === product.id)
      .map(v => ({
        id: v.id,
        price: v.price,
        stock: v.stock,
        sku: v.sku,
        color: colors.find(c => c.id === v.colorId)!,
        size: sizes.find(s => s.id === v.sizeId)!,
        image: productImages.find(img => img.productId === product.id && img.url.includes(colors.find(c => c.id === v.colorId)!.name.replace(/\s/g, '').toLowerCase()))?.url || ''
      }));

    const images : ProductImage[] = productImages.filter(img => img.productId === product.id);

    return {
      ...product,
      category: categories.find(c => c.id === product.categoryId)!,
      variants: productVariants,
      images: images,
    };
  });

  return result;
}

export interface QueryPaginationDto {
  page?: number;
  limit?: number;
  sort?: "price-asc" | "price-desc" | "recent" | "name-asc" | "name-desc";
}

export async function getProductsSearch(
  filters: any,
  queryPaginationDto: QueryPaginationDto
) {

  const { page = 1, limit = 12, sort } = queryPaginationDto

  let filteredProducts = await getCatalogProducts()

  const { category, color, size, priceRange } = filters

  if (category.length) {
    filteredProducts = filteredProducts.filter(p =>
      category.includes(p.category.id)
    )
  }

  if (color.length) {
    filteredProducts = filteredProducts.filter(p =>
      p.variants.some(v => color.includes(v.color.id))
    )
  }

  if (size.length) {
    filteredProducts = filteredProducts.filter(p =>
      p.variants.some(v => size.includes(v.size.id))
    )
  }

  if (  priceRange) {
    const [min, max] = priceRange

    filteredProducts = filteredProducts.filter(p =>
      p.variants.some(v => v.price >= min && v.price <= max)
    )
  }

  // sorting

  if (sort === "price-asc") {
    filteredProducts.sort((a,b)=>a.basePrice-b.basePrice)
  }

  if (sort === "price-desc") {
    filteredProducts.sort((a,b)=>b.basePrice-a.basePrice)
    console.log(filteredProducts)
  }

  if (sort === "recent") {
    filteredProducts.sort((a,b)=>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
    )
  }

  if (sort === "name-asc") {
    filteredProducts.sort((a,b)=>
      a.name.localeCompare(b.name)
    )
  }

  if (sort === "name-desc") {
    filteredProducts.sort((a,b)=>
      b.name.localeCompare(a.name)
    )
  }

  const total = filteredProducts.length

  const start = (page - 1) * limit
  const end = start + limit

  const paginatedProducts = filteredProducts.slice(start, end)

  return {
    data: paginatedProducts,
    total,
    page,
    limit
  }
}

export function parseFilters(searchParams: any) {

  const category = searchParams.category
    ? searchParams.category.split(",")
    : []

  const color = searchParams.color
    ? searchParams.color.split(",")
    : []

  const size = searchParams.size
    ? searchParams.size.split(",")
    : []

  const priceRange =
    searchParams.priceRange ? searchParams.priceRange.split("-").map(Number) : undefined

  return {
    category,
    color,
    size,
    priceRange
  }
}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | undefined> {
  const products = await getCatalogProducts();
  return products.find((p) => p.slug === slug);
}
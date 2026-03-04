import { FiltersProducts } from "@/app/tienda/page";
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
        image: productImages.find(img => img.productId === product.id && img.url.includes(colors.find(c => c.id === v.colorId)!.name.replace(/\s/g, '').toLowerCase()))?.url || ''
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
}

export async function getProductsSearch(filters: FiltersProducts, queryPaginationDto: QueryPaginationDto): Promise<{ 
  data: CatalogProduct[]; 
  total: number; 
  page: number; 
  limit: number; 
}> {
  const { page = 1, limit = 10 } = queryPaginationDto;

  const {
    categoryIds,
    colorIds,
    sizeIds,
    priceRange,
  } = filters;

  let filteredProducts = await getCatalogProducts();

  if (categoryIds.length > 0) {
    filteredProducts = filteredProducts.filter(p => categoryIds.includes(p.category.id));
  }

  if (colorIds.length > 0) {
    filteredProducts = filteredProducts.filter(p => p.variants.some(v => colorIds.includes(v.color.id)));
  }

  if (sizeIds.length > 0) {
    filteredProducts = filteredProducts.filter(p => p.variants.some(v => sizeIds.includes(v.size.id)));
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange;
    filteredProducts = filteredProducts.filter(p => 
      p.variants.some(v => v.price >= minPrice && v.price <= maxPrice)
    );
  }

  const total = filteredProducts.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedProducts = filteredProducts.slice(start, end);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: paginatedProducts,
        total,
        page,
        limit,
      });
    }, 500);
  });

}

export async function getProductBySlug(slug: string): Promise<CatalogProduct | undefined> {
  const products = await getCatalogProducts();
  return products.find((p) => p.slug === slug);
}
'use client'

import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import FilterSection from "@/components/shop/filter-section";
import FilterSectionMobile from "@/components/shop/filter-section-mobile";
import { getProductVariants, ProductFilter, products } from "@/data/products";
import { useEffect, useMemo, useState } from "react";

const MAX_PRICE = Math.max(...products.map((p) => p.price));



export default function ShopPage() {

  const [filters, setFilters] = useState<ProductFilter>({
    category: [],
    size: [],
    color: [],
    priceRange: [0, MAX_PRICE],
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {

    // Filtrar categoría (OR dentro del grupo)
    if (filters.category.length > 0 &&
        !filters.category.includes(product.category.toLowerCase())) {
      return false;
    }

    // Filtrar precio
    if (product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]) {
      return false;
    }

    // Filtrar variantes (talle / color)
    const variants = getProductVariants(product.id);

    const hasValidVariant = variants.some(variant => {

      const sizeMatch =
        filters.size.length === 0 ||
        filters.size.includes(variant.size.toLowerCase());

      const colorMatch =
        !filters.color || filters.color.length === 0 ||
        filters.color.includes(variant.color.name.toLowerCase());

      return sizeMatch && colorMatch && variant.stock > 0;
    });

    return hasValidVariant;
  })
  }, [filters]);


  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-5">

        <FilterSection filters={filters} setFilters={setFilters} />
        <FilterSectionMobile filters={filters} setFilters={setFilters} />

        {/* Aquí iría el listado de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 lg:grid-cols-3 xl:grid-cols-4 col-span-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
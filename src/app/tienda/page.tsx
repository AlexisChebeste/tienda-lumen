'use client'

import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import FilterSection from "@/components/shop/filter-section";
import FilterSectionMobile from "@/components/shop/filter-section-mobile";
import { CatalogProduct } from "@/domain/catalog.types";
import { ProductData } from "@/domain/filters.types";
import { getCatalogProducts, getProductsSearch } from "@/services/catalog.service";
import { useEffect, useMemo, useState } from "react";

export interface FiltersProducts {
  categoryIds: string[];
  colorIds: string[];
  sizeIds: string[];
  priceRange: [number, number] | null;
}

export default function ShopPage() {
  const [filters, setFilters] = useState<FiltersProducts>({
    categoryIds: [],
    colorIds: [],
    sizeIds: [],
    priceRange: null,
  });

  const [products, setProducts] = useState<CatalogProduct[]>([]);

  useEffect(() => {
    // Simulación de carga de productos (reemplazar con fetch real)
    const fetchProducts = async () => {
      // Aquí iría la lógica para obtener los productos desde una API o base de datos
      // Por ahora, usaremos datos simulados
      const data : ProductData = await getProductsSearch(filters, { page: 1, limit: 10 });

      const productsData: CatalogProduct[] = data.data;
      setProducts(productsData);
    }
    fetchProducts();

    console.log('filters', filters);
  }, [filters]);

  return (
    <div className="flex min-h-screen flex-col ">
      <Header />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-5 max-w-7xl mx-auto w-full p-4 gap-6">

        <FilterSection filters={filters} setFilters={setFilters} products={products}/>
        {/*<FilterSectionMobile filters={filters} setFilters={setFilters} /> */}
       
        {/* Aquí iría el listado de productos */}
        <section className="col-span-4 flex flex-col gap-2 py-2 ">
          <div className="hidden justify-between items-center px-2 lg:flex">
            <p className="text-sm text-gray-500">{products.length} {products.length === 1 ? 'producto' : 'productos'}</p>
            <select name="order-by" id="order-by" className="w-max bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400  cursor-pointer " >
              <option value="">Ordenar por</option>
              <option value="price-low">Precio: De menor a mayor</option>
              <option value="price-high">Precio: De mayor a menor</option>
              <option value="recent">Recientes</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 p-2 lg:grid-cols-3  mx-auto h-full">
            {products.length === 0 ? (
              <p className="text-center col-span-full py-24 text-gray-500">No se encontraron productos que coincidan con los filtros seleccionados.</p>
            ) : (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            )))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
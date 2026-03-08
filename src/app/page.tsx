import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductPopular from "@/components/product-popular";
import { CatalogProduct } from "@/domain/catalog.types";
import { getProductsPopular } from "@/services/catalog.service";
import Link from "next/link";

export default async function Home() {

  const products : CatalogProduct[] =  await getProductsPopular() || [];

  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1">
        {/*Hero */}
        <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center bg-muted px-6 py-32">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: "url('/fashion-minimalist.jpg')",
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-5xl font-light leading-tight tracking-tight text-balance md:text-6xl">
              Esenciales Urbanos Minimalistas
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">Piezas atemporales para la vida moderna</p>
            <button className="bg-black text-white mt-10 rounded-none px-10 py-4 text-sm tracking-widest uppercase hover:bg-black/90 transition-colors duration-300 ease-in-out">
              <Link href="/shop">Comprar ahora</Link>
            </button>
          </div>
        </section>
        {/*Colección Destacada */}
        <section>
          <div className="mx-auto px-6 py-24 max-w-7xl">
            <h2 className="font-serif text-4xl font-light tracking-tight md:text-5xl text-center">Colección Destacada</h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-4">
              {/* Example Product Cards */}
              {products.map((product) => (
               <ProductPopular key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        {/*Brand Identity */}
        <section className="bg-secondary px-6 py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-light tracking-tight md:text-5xl ">Nuestra Filosofía</h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              LUMEN trae esenciales cuidadosamente diseñados que trascienden las tendencias. Cada pieza está elaborada con intención para el minimalista moderno que valora la calidad, la sostenibilidad y el estilo atemporal.
            </p>
            <button className="mt-10 px-12 py-4 border border-primary  text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out tracking-widest uppercase bg-transparent text-sm">
              <Link href="/about">Saber más</Link>
            </button>
          </div>
        </section>
      </main>

    </div>
  );
}

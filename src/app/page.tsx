import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductCard from "@/components/product-card";
import { products } from "@/data/products";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

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
              Minimalist Urban Essentials
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">Timeless pieces for modern living</p>
            <button className="bg-black text-white mt-10 rounded-none px-10 py-4 text-sm tracking-widest uppercase hover:bg-black/90 transition-colors duration-300 ease-in-out">
              <Link href="/shop">Shop Now</Link>
            </button>
          </div>
        </section>
        {/*Featured Collection */}
        <section>
          <div className="mx-auto px-6 py-24 max-w-7xl">
            <h2 className="font-serif text-4xl font-light tracking-tight md:text-5xl text-center">Featured Collection</h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-4">
              {/* Example Product Cards */}
              {products.map((product) => (
               <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
        {/*Brand Identity */}
        <section className="bg-secondary px-6 py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-serif text-4xl font-light tracking-tight md:text-5xl ">Our Philosophy</h2>
            <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
              LUMEN brings thoughtfully designed essentials that transcend trends. Each piece is crafted with intention for the modern minimalist who values quality, sustainability, and timeless style.
            </p>
            <button className="mt-10 px-12 py-4 border border-primary  text-black hover:bg-black hover:text-white transition-colors duration-300 ease-in-out tracking-widest uppercase bg-transparent text-sm">
              <Link href="/about">Learn More</Link>
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client'

import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductGallery from "@/components/product-gallery";
import ProductInfo from "@/components/product-info";
import { Product, products } from "@/data/products";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function ProductPage() {
    const params = useParams();
    const { slug } = params;

    const product: Product | undefined = products.find((p) => p.slug === slug);
    const [selectImage, setSelectImage] = useState(0)

    if (!product) {
        return (
            <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <section className="flex flex-col items-center justify-center gap-7">
                        <h1 className="text-2xl">Product Not Found</h1>
                        <Link href="/shop" className="ml-4 text-blue-500 underline">
                            <ArrowLeft className="inline-block mr-2" size={20} />
                            Back to Shop
                        </Link>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Header />

            <main className="flex-1 max-w-7xl mx-auto w-full px-6">
                <section className="mx-auto py-10 grid gap-6 md:grid-cols-2 items-start">
                    <ProductGallery images={product.images} selectImage={selectImage} setSelectImage={setSelectImage} />
                    <div className="flex flex-col gap-2 min-h-full">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-serif text-4xl font-light tracking-tight ">{product.name}</h1>
                            <p className="text-2xl font-medium text-gray-600">${product.price.toFixed(2)}</p>
                            <p className="text-base text-muted-foreground">{product.description}</p>
                        </div>
                        <ProductInfo product={product} setSelectImage={setSelectImage} />
                    </div>
                </section>
                <section className="mx-auto py-10 flex flex-col gap-4 items-start border-t w-full">
                    <h2 className="text-2xl font-semibold ">Product Details</h2>
                    <ul className="text-sm list-disc list-inside space-y-2">
                        {product.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
'use client'

import ProductGallery from "@/components/product-gallery";
import ProductInfo from "@/components/product-info";
import { CatalogProduct } from "@/domain/catalog.types";
import { getProductBySlug } from "@/services/catalog.service";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";


export default function ProductPage() {
    const params = useParams();
    const { slug } = params;

    const [product, setProduct] = useState<CatalogProduct | null>(null);
    const [loading, setLoading] = useState(true);

    // Simulate fetching product by slug
    useEffect(() => {
        setLoading(true);
        // Replace this with actual API call
        const fetchProduct = async () => {
            // Simulate delay
            await new Promise(resolve => setTimeout(resolve, 500));
            // Mock product data based on slug
            const productData: CatalogProduct = await getProductBySlug(slug as string) as CatalogProduct;
            setProduct(productData);
            setLoading(false);
        };

        fetchProduct();
    }, [slug]);

    const [selectImage, setSelectImage] = useState(0)

    if (!loading && !product) {
        return (
            <div className="flex min-h-screen flex-col">
                <main className="flex-1 flex items-center justify-center">
                    <section className="flex flex-col items-center justify-center gap-7">
                        <h1 className="text-2xl">No hay producto disponible</h1>
                        <Link href="/tienda" className="ml-4 text-blue-500 underline">
                            <ArrowLeft className="inline-block mr-2" size={20} />
                            Volver a la tienda
                        </Link>
                    </section>
                </main>
            </div>
        );
    }

    return (
        <div className="flex-1 h-full p-5 lg:py-10 ">

            <main className="max-w-7xl mx-auto w-full  h-full">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[50vh]">
                        <div className="flex flex-col items-center gap-3 text-gray-500 h-full justify-center">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <p className="text-sm">Cargando producto...</p>
                        </div>
                    </div>
                ) : product && (
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <section className="mx-auto grid grid-cols-1 gap-6 lg:gap-10 lg:grid-cols-2 w-full" >
                            <ProductGallery images={product.images} selectImage={selectImage} setSelectImage={setSelectImage} />
                            <div className="flex flex-col gap-2 min-h-full ">
                                <div className="flex flex-col gap-1">
                                    <h1 className="font-serif text-4xl font-light tracking-tight ">{product.name}</h1>
                                    <p className="text-2xl font-medium text-gray-600">${product.basePrice}</p>
                                    <p className="text-base text-muted-foreground">{product.description}</p>
                                </div>
                                <ProductInfo product={product} setSelectImage={setSelectImage} />
                            </div>
                        </section>
                        <section className="mx-auto py-10 flex flex-col gap-4 items-start border-t w-full ">
                            <h2 className="text-2xl font-semibold ">Detalles</h2>
                            <ul className="text-sm list-disc list-inside space-y-2">
                                {product.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                    )}
            </main>

        </div>
    );
}
"use client"

import { CatalogProduct } from "@/domain/catalog.types";
import Link from "next/link";


export default function ProductPopular({ product }: { product: CatalogProduct }) {

    const prices = product.variants.map(v => v.price);
    const minPrice = Math.min(...prices);   

    return (
        <Link href={`/producto/${product.slug}`} key={product.id} className="group relative flex flex-col overflow-hidden rounded-md ">
            <div className="aspect-square w-full bg-muted relative overflow-hidden">
                <img
                    src={product.images.find(img => img.isMain)?.url || product.images[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    loading="lazy"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </div>
            
            <div className="flex flex-1 flex-col py-3 px-1 gap-1">
                <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                <p className="text-sm text-neutral-500">${minPrice.toFixed(2)}</p>
            </div>
        </Link>
    );
}
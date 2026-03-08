"use client"

import { CatalogProduct } from "@/domain/catalog.types";
import Link from "next/link";


export default function ProductCard({ product }: { product: CatalogProduct }) {

    const prices = product.variants.map(v => v.price);
    const minPrice = Math.min(...prices);   
    const uniqueColors = Array.from(
        new Map(
            product.variants.map(v => [v.color.id, v.color])
        ).values()
    );

    return (
        <Link href={`/producto/${product.slug}`} key={product.id} className="group relative flex flex-col overflow-hidden rounded-md p-1 gap-2">
            <div className="aspect-square w-full bg-muted relative overflow-hidden">
                <img
                    src={product.images.find(img => img.isMain)?.url || product.images[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
                <div className="absolute top-2 left-2 flex gap-1">
                    {uniqueColors.slice(0, 3).map(color => (
                        <span key={color.id} className="w-4 h-4 rounded-full " style={{ backgroundColor: color.hex }} />
                    ))}
                    {uniqueColors.length > 3 && (
                        <span className="w-4 h-4 rounded-full  flex items-center justify-center text-xs text-gray-500">
                            +{uniqueColors.length - 3}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex flex-1 flex-col py-2 px-1 gap-1">
                <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                <p className="text-sm text-neutral-500">${minPrice.toFixed(2)}</p>
            </div>
        </Link>
    );
}
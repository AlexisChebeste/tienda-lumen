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
        <Link href={`/producto/${product.slug}`} key={product.id} className="group relative flex flex-col overflow-hidden rounded-md ">
            <div className="aspect-square w-full bg-muted relative overflow-hidden">
                <img
                    src={product.images.find(img => img.isMain)?.url || product.images[0]?.url || "/placeholder.png"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </div>
            <div className="flex flex-wrap gap-3 p-2 text-sm  text-slate-800">
                {uniqueColors.map(color => (
                    <label key={color.name} className="cursor-pointer" title={color.name}>
                        <input
                            type="checkbox"
                            value={color.id}
                            className="peer sr-only"
                        />

                        <div
                        className="
                            size-8
                            rounded-full
                            border border-neutral-300
                            peer-checked:ring-2
                            peer-checked:ring-black
                            peer-checked:ring-offset-2
                            hover:scale-105
                            transition
                        "
                        style={{ backgroundColor: color.hex }}
                        />
                    </label>
                ))}
            </div>
            <div className="flex flex-1 flex-col py-2 px-1 gap-1">
                <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                <p className="text-sm text-neutral-500">${minPrice.toFixed(2)}</p>
            </div>
        </Link>
    );
}
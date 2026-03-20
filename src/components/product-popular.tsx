"use client"

import { ProductPopularType } from "@/services/catalog.service";
import Image from "next/image";
import Link from "next/link";


export default function ProductPopular({ product }: { product: ProductPopularType }) {


    return (
        <Link href={`/producto/${product.slug}`} key={product.id} className="group relative flex flex-col overflow-hidden rounded-md ">
            <div className="aspect-square w-full bg-muted relative overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
            </div>
            
            <div className="flex flex-1 flex-col py-3 px-1 gap-1">
                <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
                <p className="text-sm text-neutral-500">${product.basePrice.toFixed(2)}</p>
            </div>
        </Link>
    );
}
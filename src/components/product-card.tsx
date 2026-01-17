import { Product } from "@/data/products";
import Link from "next/link";


export default function ProductCard({ product }: { product: Product }) {

  return (
    <Link href={`/product/${product.slug}`} key={product.id} className="group relative flex flex-col overflow-hidden rounded-md ">
        <div className="aspect-square w-full bg-muted relative overflow-hidden">
            <img
                src={product.images[0]}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
        </div>
        <div className="flex flex-1 flex-col p-4">
            <h3 className="text-lg font-medium text-foreground">{product.name}</h3>
            <p className="mt-2 text-sm text-foreground/70">${product.price}</p>
        </div>
    </Link>
  );
}
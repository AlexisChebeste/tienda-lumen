import { getProductVariants, Product, ProductVariant, uniqueColorsFromVariants } from "@/data/products";
import { useCart } from "@/lib/card-context";
import { useEffect, useState } from "react";

export default function ProductInfo({product}: {product: Product}) {
    const [sizeSelected, setSizeSelected] = useState<string | null>(null);
    const [colorSelected, setColorSelected] = useState<string>("");
    const [variantProduct, setVariantProduct] = useState<ProductVariant[]>([])
    const [count, setCount] = useState(1);
    const {addItem} = useCart()

    useEffect(() => {
        setSizeSelected(null);
        setCount(1);
        const variants = getProductVariants(product.id)

        setVariantProduct(variants)
        setColorSelected(variants[0].color.name)

    }, [product]);

    const colors = uniqueColorsFromVariants(variantProduct)
    
    const sizesForColor = variantProduct
        .filter(v => v.color.name === colorSelected)

    const isColorOutOfStock = sizesForColor.every(v => v.stock === 0);

    const selectedVariant = variantProduct.find(
        v =>
        v.color.name === colorSelected &&
        v.size === sizeSelected
    );

    const handleAddItemToCart = () =>{
        if (!sizeSelected || !selectedVariant){
            return
        }

        addItem({
            id: selectedVariant.id,     
            productId: product.id,
            name: product.name,
            price: product.price,
            image: selectedVariant.image,
            color: selectedVariant.color.name,
            size: selectedVariant.size,
            sku: selectedVariant.sku
        }, count)
    }

    const handleColor  = (color : string) => {
        if (colorSelected !== color){
            setSizeSelected(null)
            setColorSelected(color)
            setCount(1)
        }
    }
    const LOW_STOCK_THRESHOLD = 3;

    const isLowStock = (stock: number) =>
        stock > 0 && stock <= LOW_STOCK_THRESHOLD;

    return (
        <div className="flex flex-col gap-4 mt-auto">

            <div className="flex flex-col ">
                <h3>Color: {colorSelected}</h3>
                <div className="mt-2 flex gap-2">
                    {colors.map((color) => (
                        <button 
                            key={color.name} 
                            onClick={() => handleColor(color.name)} 
                            className={`border-2 p-5 rounded-full text-md font-medium  cursor-pointer transition-colors duration-200 
                                ${colorSelected === color.name ? 'border-black' : 'border-gray-300 hover:border-gray-500 hover:scale-105'}
                            `} 
                            style={{ backgroundColor: color.value }}
                            aria-label={color.name}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3>Sizes:</h3>
                
                <div className="flex gap-2">
                    {sizesForColor.map((variant) => {
                        const isDisabled = variant.stock === 0;
                        const isSelected = sizeSelected === variant.size;

                        return (
                        <div key={variant.size} className="relative">
                            <button
                            disabled={isDisabled}
                            onClick={() => setSizeSelected(variant.size)}
                            title={isDisabled ? 'No stock available' : undefined}
                            className={`
                                relative z-10 
                                border w-14 h-12 text-md font-medium transition 
                                ${isSelected ? 'bg-black text-white border-black' : ''}
                                ${isDisabled
                                ? 'opacity-50 cursor-not-allowed bg-gray-300 text-stone-600'
                                : 'hover:bg-gray-200 cursor-pointer'}
                            `}
                            >
                                {variant.size}
                            </button>
                        </div>
                        );
                    })}
                </div>
                {selectedVariant && isLowStock(selectedVariant.stock) && (
                    <p className="text-sm text-red-600 font-medium">
                        Only {selectedVariant.stock} left
                    </p>
                )}
            </div>

            {isColorOutOfStock ? (
                <div className="flex w-full gap-2">
                    <button className="w-full rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={true}>
                        Out of stock
                    </button>
                </div>
            ) : (
                <div className="flex w-full gap-2">
                    <div className="flex">
                        <button onClick={() => setCount(Math.max(1, count - 1))} className="px-4 py-3 border flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">-</button>
                        <div className="w-12 py-3 border-t border-b flex items-center justify-center">{count}</div>
                        <button onClick={() => setCount(count + 1)} className="px-4 py-3 border flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">+</button>
                    </div>
                    <button onClick={handleAddItemToCart} className="w-full rounded-md bg-stone-800 px-4 py-3 text-white hover:bg-stone-900 transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:text-stone-500 disabled:cursor-not-allowed font-medium" disabled={!sizeSelected}>
                        {!sizeSelected ? "Select a size" : "Add to Cart"}
                    </button>

                </div>
            )}

        </div>
    );
}
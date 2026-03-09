import { CatalogProduct, ProductVariant } from "@/domain/catalog.types";
import { Color } from "@/domain/colors";
import { useCart } from "@/lib/card-context";
import { uniqueColorsFromVariants } from "@/services/product.service";
import { useMemo, useState } from "react";

export default function ProductInfo({product, setSelectImage}: {product: CatalogProduct, setSelectImage: (index: number) => void}) {

    const [variantProduct, setVariantProduct] = useState<ProductVariant[]>((product.variants || []).map(v => ({
        ...v,
        productId: product.id,
        image: product.images[0]?.url || ''
    })));
    const colors = uniqueColorsFromVariants(variantProduct)
    const [outStock, setOutStock] = useState<boolean>(false)
    const [count, setCount] = useState(1);
    const [sizeSelected, setSizeSelected] = useState<string | null>(null);
    const [colorSelected, setColorSelected] = useState<Color>(colors[0] || { name: '', hex: '' });
    const {addItem, items} = useCart()

    const sizesForColor = useMemo(() => variantProduct
        .filter(v => v.color.id === colorSelected.id)
    , [variantProduct, colorSelected]);

    const isColorOutOfStock = sizesForColor.every(v => v.stock === 0);

    const selectedVariant = variantProduct.find(
        v =>
        v.color.id === colorSelected.id &&
        v.size.name === sizeSelected
    );

    const handleAddItemToCart = () =>{
        if (!sizeSelected || !selectedVariant) return;

        const result = addItem(
            {
                id: selectedVariant.id,     
                productId: product.id,
                name: product.name,
                price: product.basePrice,
                image: selectedVariant.image,
                colorId: selectedVariant.color.id,
                colorName: selectedVariant.color.name,
                size: selectedVariant.size.name,
                sku: selectedVariant.sku,
                stock: selectedVariant.stock
            }, count
        )

        if(!result.success){
            setOutStock(true)
            return;
        }

        setOutStock(false)
    }

    const handleColor  = (color : Color) => {
        if (colorSelected !== color){
            setSizeSelected(null)
            setColorSelected(color)
            setCount(1)
            handleColorChange(color)
        }
    }

    const handleColorChange = (color: Color) => {
        const index = product.images.findIndex(img => img.colorId === color.id);
        if (index !== -1) {
            setSelectImage(index);
        }
    }

    const cartItem = items.find(
    (i) =>
        i.id === selectedVariant?.id &&
        i.size === selectedVariant?.size.name &&
        i.colorId === selectedVariant?.color.name
    );

    const quantityInCart = cartItem?.quantity ?? 0;
    const availableStock =
    (selectedVariant?.stock ?? 0) - quantityInCart;

    return (
        <div className="flex flex-col gap-4 mt-auto">

            <div className="flex flex-col ">
                <h3>Color: {colorSelected.name}</h3>
                <div className="mt-2 flex gap-2">
                    {colors.map((color) => (
                        <button 
                            key={color.name} 
                            onClick={() => handleColor(color)} 
                            className={`border-2 w-10 h-10 rounded-full  cursor-pointer transition-colors duration-200 hover:scale-110
                                ${colorSelected.name === color.name ? 'border-black' : 'border-gray-300 hover:border-gray-500 hover:scale-105'}
                            `} 
                            style={{ backgroundColor: color.hex }}
                            aria-label={color.name}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <h3>Talles:</h3>
                
                <div className="flex gap-2">
                    {sizesForColor.map((variant) => {
                        const isDisabled = variant.stock === 0;
                        const isSelected = sizeSelected === variant.size.name;

                        return (
                        <div key={variant.size.id} className="relative">
                            <button
                            disabled={isDisabled}
                            onClick={() => setSizeSelected(variant.size.name)}
                            title={isDisabled ? 'Sin stock disponible' : undefined}
                            className={`
                                relative z-10 
                                border w-14 h-12 text-md font-medium transition 
                                ${isSelected ? 'bg-black text-white border-black hover:text-black' : ''}
                                ${isDisabled
                                ? 'opacity-50 cursor-not-allowed bg-gray-300 text-stone-600 line-through'
                                : 'hover:bg-gray-200 cursor-pointer'}
                            `}
                            >
                                {variant.size.name}
                            </button>
                        </div>
                        );
                    })}
                </div>
                {outStock && selectedVariant && (
                    <p className="text-red-600">
                        Solo puedes añadir {selectedVariant.stock} unidades en total.
                    </p>
                )}
            </div>

            {isColorOutOfStock ? (
                <div className="flex w-full gap-2">
                    <button className="w-full rounded-md bg-black px-4 py-3 text-white hover:bg-gray-800 transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed" disabled={true}>
                        Sin stock
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <div className="flex w-full gap-2">
                        <div className="flex">
                            <button onClick={() => setCount(Math.max(1, count - 1))} className="px-4 py-3 border flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">-</button>
                            <div className="w-12 py-3 border-t border-b flex items-center justify-center">{count}</div>
                            <button onClick={() => setCount(count + 1)} className="px-4 py-3 border flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">+</button>
                        </div>
                        <button onClick={handleAddItemToCart} className="w-full rounded-md bg-stone-800 px-4 py-3 text-white hover:bg-stone-900 transition-colors duration-200 cursor-pointer disabled:bg-gray-300 disabled:text-stone-500 disabled:cursor-not-allowed font-medium" disabled={!sizeSelected || count > availableStock} title={!sizeSelected ? "Por favor selecciona un talle" : count > availableStock ? `Solo ${availableStock} unidades disponibles` : undefined}>
                            {!sizeSelected ? "Selecciona un talle" : "Añadir al carrito"}
                        </button>

                    </div>
                    {count > availableStock && selectedVariant && (
                        <p className="text-red-600">
                            {availableStock === 0 ? "No hay stock disponible" : `Solo ${availableStock} unidades disponibles`}
                        </p>
                    )}
                </div>
                
            )}

        </div>
    );
}
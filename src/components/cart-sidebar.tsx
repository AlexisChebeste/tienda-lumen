import { useCart } from "@/lib/card-context"
import {  X } from "lucide-react"
import Link from "next/dist/client/link"
import Image from "next/image"

interface CartSidebarProps {
    isOpen: boolean,
    onClose: () => void
}

export default function CartSidebar ({isOpen, onClose} : CartSidebarProps) {
    const {totalItems, totalPrice, items, updateQuantity, removeItem, clearCart} = useCart()

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs  transition-opacity" onClick={onClose} />
            )}

            <div className={`fixed right-0 top-0 z-50 h-full w-full bg-background shadow-xl transition-transform ease-in-out duration-300 md:w-md ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 h-20">
                        <h2 className="text-lg font-medium tracking-wider">Carrito ({totalItems})</h2>
                            <button
                                onClick={clearCart}
                                className={`text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 ${items.length === 0 ? 'cursor-not-allowed opacity-0' : ''}`}
                            >
                                Vaciar
                            </button>
                        <button onClick={onClose} className="rounded-full hover:bg-gray-300 p-1 transition">
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6 border-t border-border">

                        {items.length === 0 ? (
                            <div className="flex h-full items-center justify-center gap-2 flex-col">
                                <p className="text-sm text-muted-foreground">Tu carrito está vacío</p>
                                <button
                                    onClick={onClose}
                                    className="mt-4 text-sm underline cursor-pointer hover:text-foreground transition-colors duration-200"
                                >
                                    Ir a la tienda
                                </button>
                            </div>
                            ) : (
                            <div className="flex flex-col gap-2">
                                
                                {items.map((item) => {
                                    return(
                                        <div key={`${item.id}-${item.size}-${item.colorId}`} className="flex gap-2">
                                            <div className="relative w-28  overflow-hidden bg-muted rounded-md">
                                                <Image
                                                    src={item.image}
                                                    alt="Product"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 300px"
                                                    className="object-cover w-full h-full overflow-hidden"
                                                />
                                            </div>
                                            <div className="flex h-full w-full flex-col gap-4">
                                                <div className="flex justify-between items-start">
                                                    <div >
                                                        <h3 className="font-medium">{item.name}</h3>
                                                        <p className="text-sm text-gray-600 font-medium">Talle: {item.size}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-gray-200"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                

                                                <div className="flex items-center justify-between w-full">
                                                    <div className="flex">
                                                        <button onClick={() => updateQuantity(item.id, item.quantity -1)} className="px-2 py-0.5 border-r-0 border flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">-</button>
                                                        <div className=" px-3.5 py-0.5 border-t border-b flex items-center justify-center text-sm">{item.quantity}</div>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity +1)} className={`px-2 py-0.5 border border-l-0 flex items-center justify-center transition-colors duration-200 ${item.quantity >= item.stock ? ' cursor-not-allowed' : 'cursor-pointer hover:bg-gray-200'}`} title={item.quantity >= (item.stock ?? 0) ? "Máxima cantidad alcanzada" : undefined}>+</button>
                                                    </div>
                                                    <p>$ {(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}


                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className=" flex flex-col gap-4 border-t border-border px-6 py-5">
                            <div className="flex items-center justify-between">
                                <h2 className="text-md font-medium tracking-wider uppercase">Subtotal</h2>
                                <p className="text-lg font-semibold">$ {totalPrice.toFixed(2)} </p>
                            </div>

                            <p className="text-sm text-stone-700">Envío gratis en compras mayores a $100.000</p>

                            <Link className="flex items-center justify-center w-full p-4 bg-stone-950 text-white hover:bg-stone-800 transition-colors duration-200 cursor-pointer font-semibold uppercase" href="/checkout" onClick={() => {
                                onClose()
                            }}>
                                Finalizar Compra
                            </Link>
                            <button className="flex items-center justify-center w-full p-4 bg-transparent text-stone-800 hover:bg-stone-200 border border-stone-800 transition-colors duration-200 cursor-pointer font-semibold uppercase"
                                onClick={onClose}
                            >
                                Seguir Comprando
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
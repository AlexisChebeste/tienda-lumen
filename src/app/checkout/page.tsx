"use client"

import Divider from "@/components/divider";
import { CartItem, useCart } from "@/lib/card-context";
import { ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import Image from "next/image"


export default function CheckoutPage() {
    const {totalPrice, items} = useCart()

    const [envio, setEnvio] = useState(9.99)

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-6 items-start h-full relative">
                <h1 className="text-2xl font-bold mb-4 uppercase tracking-wide">Finalizar Compra</h1>
                <section className=" flex-1 gap-10 rounded grid grid-cols-1 lg:grid-cols-3 w-full">

                    <form className="flex flex-col gap-4 lg:col-span-2 pb-16">

                        <section className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Información de contacto</h2>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                                <input type="email" id="email" name="email" className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="tu@email.com" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre completo</label>
                                <input type="text" id="name" name="name" className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu Nombre Completo" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Número de teléfono</label>
                                <input type="tel" id="phone" name="phone" className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+1 234 567 8900" />
                            </div>
                        </section>

                        <Divider />

                        <section className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Dirección de envío</h2>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="address" className="text-sm font-medium text-gray-700">Dirección</label>
                                <input type="text" id="address" name="address" className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Calle, número, etc." />
                            </div>
                            <div className="flex flex-col gap-1 lg:flex-row lg:gap-4 w-full">
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="city" className="text-sm font-medium text-gray-700">Ciudad</label>
                                    <input type="text" id="city" name="city" className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ciudad" />
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Código postal</label>
                                    <input type="text" id="postalCode" name="postalCode" className="border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Código postal" />
                                </div>  
                            </div>
                        </section>

                        <Divider />

                        <section>
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Método de Envio</h2>

                            <div className="flex flex-col gap-3">
                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-stone-800 transition-colors accent-stone-800 has-checked:border-stone-800 has-checked:bg-stone-100">
                                    <input type="radio" name="shippingMethod" value="normal" defaultChecked className="w-4 h-4 cursor-pointer" 
                                    onChange={() => setEnvio(
                                        totalPrice > 100 ? 0 : 9.99
                                    )}
                                    />
                                    <div className="ml-3 flex-1">
                                        <p className="font-semibold text-gray-700">Envío Normal</p>
                                        <p className="text-sm text-gray-500">Entrega en 5-7 días</p>
                                    </div>
                                    <p className="font-semibold text-gray-700">{totalPrice > 100 ? "Gratis" : "$9.99"}</p>
                                </label>
                                
                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-stone-800 transition-colors accent-stone-800 has-checked:border-stone-800 has-checked:bg-stone-100">
                                    <input type="radio" name="shippingMethod" value="express" className="w-4 h-4 cursor-pointer" 
                                    onChange={() => setEnvio(19.99)}
                                    />
                                    <div className="ml-3 flex-1">
                                        <p className="font-semibold text-gray-700">Envío Express</p>
                                        <p className="text-sm text-gray-500">Entrega en 1-2 días</p>
                                    </div>
                                    <p className="font-semibold text-gray-700">$19.99</p>
                                </label>
                            </div>
                        </section>

                        <Divider />

                        <section>
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Método de Pago</h2>

                            <div className="flex flex-col gap-3">
                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-stone-800 transition-colors accent-stone-800 has-checked:border-stone-800 has-checked:bg-stone-100">
                                    <input type="radio" name="paymentMethod" value="creditCard" defaultChecked className="w-4 h-4 cursor-pointer" />
                                    <div className="ml-3 flex-1">
                                        <p className="font-semibold text-gray-700">Tarjeta de Crédito</p>
                                    </div>
                                </label>

                                <label htmlFor="creditCardNumber">
                                    Número de Tarjeta
                                </label>
                                <input type="text" id="creditCardNumber" placeholder="1234 5678 9012 3456" className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                                <div className="flex gap-4">
                                    <div className="flex flex-col w-full">
                                        <label htmlFor="creditCardExpiry">
                                            Fecha de Expiración
                                        </label>
                                        <input type="text" id="creditCardExpiry" placeholder="MM/AA" className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    
                                    <div className="w-full flex flex-col flex-1/3">
                                        <label htmlFor="creditCardCVC">
                                            CVC
                                        </label>
                                        <input type="text" id="creditCardCVC" placeholder="123" className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>

                                <label htmlFor="creditCardHolder">
                                    Titular de la Tarjeta
                                </label>
                                <input type="text" id="creditCardHolder" placeholder="Nombre completo" className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500" />

                            </div>


                        </section>

                        <button className="mt-6 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors uppercase">
                            Pagar
                        </button>
                    </form>
                    <section className="p-8 border h-max  bg-white shadow w-full sticky top-24 lg:col-span-1">
                        <h2 className="text-lg font-semibold  uppercase tracking-wide text-gray-600">Resumen del pedido</h2>
                        
                        <div className="">
                            {items.length === 0 ? (
                                <p className="text-gray-500 text-center py-10">Tu carrito está vacío</p>
                            ) : (
                                <div className="flex flex-col gap-4 mt-4">
                                    {items.map((item : CartItem) => (
                                        <div key={item.id} className="flex items-center gap-4">
                                            <div className="relative w-16 h-16 overflow-hidden bg-muted rounded-md">
                                                <Image
                                                    src={item.image}
                                                    alt="Product"
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 300px"
                                                    className="object-cover w-full h-full overflow-hidden"
                                                />
                                            </div>
                                            <div className="flex-1 flex flex-col gap-1">
                                                <h3 className="font-medium text-gray-700">{item.name} (x{item.quantity})</h3>
                                                <p className="text-xs text-gray-500">
                                                    {item.colorId && <span>{item.colorName}</span>}
                                                        {item.size && <span> / {item.size}</span>}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-1 items-center">
                                                <p className="font-bold text-primary text-sm">${item.price.toFixed(2)}</p>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Divider />

                        <section className="flex flex-col gap-2">
                            <div className="flex justify-between text-gray-700 text-sm">
                                <span>Subtotal</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-700 text-sm">
                                <span>Envío</span>
                                <span>${envio.toFixed(2)}</span>
                            </div>
                            
                        </section>

                        <Divider />

                        <section className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${(totalPrice + envio).toFixed(2)}</span>
                        </section> 

                        <div className="flex gap-4 my-3 items-center ">
                            <Truck className="text-gray-500"  size={18}/>
                            <span className="text-sm text-gray-500">Envío gratis en pedidos superiores a $100</span>
                        </div>
                        <div className="flex gap-4 my-3 items-center ">
                            <ShieldCheck className="text-gray-500"  size={18}/>
                            <span className="text-sm text-gray-500">Pago seguro</span>
                        </div>

                    </section>
                </section>
                
                
            </main>
        </div>
    )
}
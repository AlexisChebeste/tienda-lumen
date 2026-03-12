"use client"

import Divider from "@/components/divider";
import { CartItem, useCart } from "@/lib/card-context";
import { ShieldCheck, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image"
import Link from "next/link";
import { useRouter} from "next/navigation"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateCheckoutSchema } from "@/schemas/checkout.schema";
import { CreateOrder } from "@/domain/order";
import { IMaskInput } from 'react-imask';
import { createOrder } from "@/services/orders.service";

const COST_FREE_SHIPPING_THRESHOLD = 100000
const COST_STANDARD_SHIPPING = 9999
const COST_EXPRESS_SHIPPING = 19999

export default function CheckoutPage() {
    const {totalPrice, items, clearCart} = useCart()
    const router = useRouter()

    const isFreeShipping = totalPrice > COST_FREE_SHIPPING_THRESHOLD

    const [envio, setEnvio] = useState(isFreeShipping ? 0 : COST_STANDARD_SHIPPING)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({
        resolver: zodResolver(CreateCheckoutSchema),
        mode: "onChange"
    })

    
    async function handleCheckout(data: CreateCheckoutSchema) {

        setLoading(true)

        const orderData : CreateOrder= {
            subtotal: totalPrice,
            shipping: {
                method: data.shipping.method,
                price: data.shipping.method === "standard" ? (isFreeShipping ? 0 : COST_STANDARD_SHIPPING) : COST_EXPRESS_SHIPPING
            },
            total: totalPrice + envio,
            customer: {
                nombre: data.nombre,
                email: data.email,
                telefono: {
                    codigo_pais: data.telefono.codigo_pais,
                    codigo_area: data.telefono.codigo_area && data.telefono.codigo_area.length > 0 ? data.telefono.codigo_area : "",
                    numero: data.telefono.numero
                },
            },
            items: items,
            direccion: {
                calle: data.direccion.calle,
                numero: data.direccion.numero,
                provincia: data.direccion.provincia,
                codigo_postal: data.direccion.codigo_postal,
            },
            payment: {
                method: data.payment.method,
                status: "paid"
            }
        }

        const order = await createOrder(orderData)

        const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")

        existingOrders.push(data)

        localStorage.setItem("orders", JSON.stringify(existingOrders))
        clearCart()
        
        router.push(`/order-success/${order.id}`)
    }

    useEffect(()=>{
        setEnvio(totalPrice > COST_FREE_SHIPPING_THRESHOLD ? 0 : COST_STANDARD_SHIPPING)
    },[totalPrice])

    const remainingForFreeShipping = COST_FREE_SHIPPING_THRESHOLD - totalPrice

    if (items.length === 0) {
        return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-6 items-start h-full">
            <div className="text-center m-auto">
                <h1 className="font-serif text-3xl font-light tracking-wide">Tu carrito está vacío</h1>
                <p className="mt-4 text-muted-foreground">
                Agrega productos a tu carrito para continuar con la compra.
                </p>
                <button className="mt-10 rounded-none px-12 py-6 text-sm tracking-widest uppercase">
                <Link href="/tienda">Ver Tienda</Link>
                </button>
            </div>
            </main>
        </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-6 items-start h-full relative">

                <h1 className="text-2xl font-bold mb-4 uppercase tracking-wide">Finalizar Compra</h1>

                <section className=" flex-1 gap-10 rounded grid grid-cols-1 lg:grid-cols-3 w-full">

                    <form className="flex flex-col gap-4 lg:col-span-2 pb-16" onSubmit={handleSubmit(handleCheckout)}>

                        <section className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Información de contacto</h2>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                                <input type="email" id="email" {...register("email")}  className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="tu@email.com" autoComplete="email" disabled={loading}/>
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre completo</label>
                                <input type="text" id="name" {...register("nombre")}  className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Tu Nombre Completo" autoComplete="name" disabled={loading}/>
                                {errors.nombre && <p className="text-sm text-red-500">{errors.nombre.message}</p>}  
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-1 ">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 ">Código de país</label>
                                    <input type="tel" id="phone" {...register("telefono.codigo_pais")}  className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="+54" autoComplete="tel" disabled={loading}/>
                                    {errors.telefono?.codigo_pais && <p className="text-sm text-red-500">{errors.telefono.codigo_pais.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">Código de área</label>
                                    <input type="tel" id="phone" {...register("telefono.codigo_area")}  className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="11" autoComplete="tel" disabled={loading}/>
                                    {errors.telefono?.codigo_area && <p className="text-sm text-red-500">{errors.telefono.codigo_area.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">Número de teléfono</label>
                                    <input type="tel" id="phoneNumber" {...register("telefono.numero")}  className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="1234567890" autoComplete="tel-national" disabled={loading}/>
                                    {errors.telefono?.numero && <p className="text-sm text-red-500">{errors.telefono.numero.message}</p>}
                                </div>

                            </div>
                        </section>

                        <Divider />

                        <section className="flex flex-col gap-4">
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Dirección de envío</h2>
                            <div className="flex flex-col gap-1 lg:flex-row lg:gap-4 w-full">
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="address" className="text-sm font-medium text-gray-700">Calle</label>
                                    <input type="text" id="address" {...register("direccion.calle")} required className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Calle" autoComplete="address-line1" disabled={loading}/>
                                    {errors.direccion?.calle && <p className="text-sm text-red-500">{errors.direccion.calle.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="number" className="text-sm font-medium text-gray-700">Número</label>
                                    <input type="text" id="number" {...register("direccion.numero")} required className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Número" autoComplete="address-line2" disabled={loading}/>
                                    {errors.direccion?.numero && <p className="text-sm text-red-500">{errors.direccion.numero.message}</p>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="province" className="text-sm font-medium text-gray-700">Provincia</label>
                                <input type="text" id="province" {...register("direccion.provincia")} required className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Provincia" autoComplete="address-level1" disabled={loading}/>
                                {errors.direccion?.provincia && <p className="text-sm text-red-500">{errors.direccion.provincia.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1 lg:flex-row lg:gap-4 w-full">
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="city" className="text-sm font-medium text-gray-700">Ciudad</label>
                                    <input type="text" id="city" {...register("direccion.ciudad")} required className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Ciudad" autoComplete="address-level2" disabled={loading}/>
                                    {errors.direccion?.ciudad && <p className="text-sm text-red-500">{errors.direccion.ciudad.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1 w-full">
                                    <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Código postal</label>
                                    <input type="text" id="postalCode" {...register("direccion.codigo_postal")} required className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Código postal" autoComplete="postal-code" disabled={loading}/>
                                    {errors.direccion?.codigo_postal && <p className="text-sm text-red-500">{errors.direccion.codigo_postal.message}</p>}
                                </div>  
                            </div>
                        </section>

                        <Divider />

                        <section>
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Método de Envio</h2>

                            <div className="flex flex-col gap-3">
                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-stone-800 transition-colors accent-stone-800 has-checked:border-stone-800 has-checked:bg-stone-100">
                                    <input type="radio" {...register("shipping.method")} value="standard" defaultChecked className="w-4 h-4 cursor-pointer "  
                                    onChange={() => setEnvio(
                                        totalPrice > COST_FREE_SHIPPING_THRESHOLD ? 0 : COST_STANDARD_SHIPPING
                                    )}
                                    />
                                    <div className="ml-3 flex-1">
                                        <p className="font-semibold text-gray-700">Envío Normal</p>
                                        <p className="text-sm text-gray-500">Entrega en 5-7 días / Gratis desde $100.000</p>
                                    </div>
                                    <p className="font-semibold text-gray-700">{totalPrice > COST_FREE_SHIPPING_THRESHOLD ? "Gratis" : `$${(COST_STANDARD_SHIPPING).toFixed(2)}`}</p>
                                </label>
                                
                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-stone-800 transition-colors accent-stone-800 has-checked:border-stone-800 has-checked:bg-stone-100">
                                    <input type="radio" {...register("shipping.method")} value="express" className="w-4 h-4 cursor-pointer" 
                                        onChange={() => setEnvio(COST_EXPRESS_SHIPPING)}
                                    />
                                    <div className="ml-3 flex-1">
                                        <p className="font-semibold text-gray-700">Envío Express</p>
                                        <p className="text-sm text-gray-500">Entrega en 1-2 días</p>
                                    </div>
                                    <p className="font-semibold text-gray-700">${(COST_EXPRESS_SHIPPING ).toFixed(2)}</p>
                                </label>
                            </div>
                        </section>

                        <Divider />

                        <section>
                            <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-600">Método de Pago</h2>

                            <div className="flex flex-col gap-3">
                                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-stone-800 transition-colors accent-stone-800 has-checked:border-stone-800 has-checked:bg-stone-100">
                                    <input type="radio" {...register("payment.method")} value="card" defaultChecked className="w-4 h-4 cursor-pointer" />
                                    <div className="ml-3 flex-1">
                                        <p className="font-semibold text-gray-700">Tarjeta de Crédito</p>
                                    </div>
                                </label>

                                <label htmlFor="creditCardNumber">
                                    Número de Tarjeta
                                </label>
                                <IMaskInput 
                                    id="creditCardNumber"
                                    mask="0000 0000 0000 0000" 
                                    disabled={loading}
                                    required
                                    lazy={true}
                                    className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800"
                                    placeholder="1234 5678 9012 3456"
                                    autoComplete="cc-number"
                                />

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col w-full gap-4 col-span-2">
                                        <label htmlFor="creditCardExpiry">
                                            Fecha de Expiración
                                        </label>
                                        <IMaskInput 
                                            id="creditCardExpiry"
                                            mask="00/00" 
                                            disabled={loading}
                                            required
                                            autoComplete="cc-exp"
                                            lazy={true}
                                            placeholder="01/12"
                                            className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800"
                                        />
                                    </div>
                                    
                                    <div className="w-full flex flex-col gap-4">
                                        <label htmlFor="creditCardCVC">
                                            CVC
                                        </label>
                                        <IMaskInput 
                                            id="creditCardCVC"
                                            mask="000" 
                                            autoComplete="cc-cvc"
                                            disabled={loading}
                                            required
                                            lazy={true}
                                            placeholder="123"
                                            className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800"
                                        />
                                    </div>
                                    

                                </div>

                                <label htmlFor="creditCardHolder">
                                    Titular de la Tarjeta
                                </label>
                                <input type="text" id="creditCardHolder" required placeholder="Nombre completo" className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500" autoComplete="cc-name"/>

                            </div>


                        </section>

                        <button className="mt-6 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors uppercase cursor-pointer" 
                            type="submit" 
                            disabled={loading}
                            aria-label="Finalizar compra"
                        >
                            {loading ? "Procesando..." : "Pagar"}
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
                            {!isFreeShipping && (
                                <p className="text-sm text-gray-500">
                                    Te faltan ${remainingForFreeShipping} para envío gratis
                                </p>
                            )}
                            
                        </section>

                        <Divider />

                        <section className="flex justify-between text-lg font-semibold">
                            <span>Total</span>
                            <span>${(totalPrice + envio).toFixed(2)}</span>
                        </section> 

                        <div className="flex gap-4 my-3 items-center ">
                            <Truck className="text-gray-500"  size={18}/>
                            <span className="text-sm text-gray-500">Envío estandar gratis en pedidos superiores a $100.000</span>
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
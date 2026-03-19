"use client"

import { useCart } from "@/lib/card-context";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import CartSidebar from "./cart-sidebar";
import useClickOutside from "@/lib/useClickOutside";
import SearchInput from "./search/search-input";


export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const {totalItems} = useCart()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const searchRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const toggleSearchMenu = () => {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(!isSearchOpen);
    }

    useClickOutside(searchRef, () => setIsSearchOpen(false))
    useClickOutside(mobileMenuRef, () => setIsMobileMenuOpen(false))

    return (
        <header className="sticky top-0 z-50 flex flex-col">
            <section className="top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-sm">
                <div className="container flex h-20 items-center justify-between px-6 mx-auto max-w-7xl">

                    <button className="md:hidden flex items-center p-2 text-sm font-medium hover:underline hover:bg-black/15 transition rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menú</span>
                    </button>

                    <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                        <span className="font-serif text-2xl text-neutral-600  font-light tracking-[0.3em]">LUMEN</span>
                    </Link>

                    {/* Add navigation links or other header content here */}
                    <nav className="hidden md:flex">
                        <Link href="/tienda" className="mx-4 text-sm font-medium text-neutral-600 hover:underline">
                            Tienda
                        </Link>
                        <Link href="/nosotros" className="mx-4 text-sm font-medium text-neutral-600 hover:underline">
                            Nosotros
                        </Link>
                        <Link href="/contacto" className="mx-4 text-sm font-medium text-neutral-600 hover:underline">
                            Contacto
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">

                        <button className="hidden md:flex items-center p-3 gap-2 text-sm font-medium hover:underline hover:bg-black/15 transition w-full text-center justify-center"
                            onClick={toggleSearchMenu}
                        >
                            <Search className="h-5 w-5" />
                        </button>

                        <Link href="/admin" className="hidden md:flex items-center p-2 text-sm font-medium hover:underline hover:bg-black/15 transition rounded-full">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Cuenta</span>
                        </Link>
                        <button onClick={() => setIsCartOpen(true)} className="flex items-center p-2 text-sm font-medium hover:underline hover:bg-black/15 transition rounded-full relative">
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                    {totalItems}
                                </span>
                            )}
                            <span className="sr-only">Carrito</span>
                        </button>
                    </div>
                </div>


            </section>

            <div
                className={`md:hidden absolute top-20 left-0 z-20 bg-white w-full font-medium text-neutral-600 border-b border-border shadow-sm
                ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
                transition-transform duration-300`}
                ref={mobileMenuRef}
            >
                <div className="flex flex-col items-center justify-center ">


                    <Link href="/tienda" className=" text-sm font-medium text-neutral-600 hover:underline hover:bg-black/15 transition w-full text-center p-3 " onClick={() => setIsMobileMenuOpen(false)}>
                        Tienda
                    </Link>
                    <Link href="/nosotros" className=" text-sm font-medium text-neutral-600 hover:underline hover:bg-black/15 transition w-full text-center p-3" onClick={() => setIsMobileMenuOpen(false)}>
                        Nosotros
                    </Link>
                    <Link href="/contacto" className=" text-sm font-medium text-neutral-600 hover:underline hover:bg-black/15 transition w-full text-center p-3" onClick={() => setIsMobileMenuOpen(false)}>
                        Contacto
                    </Link>

                </div>

                <div className="flex flex-col items-center justify-center border-t border-border">
                    <button className="flex items-center p-3 gap-2 text-sm font-medium hover:underline hover:bg-black/15 transition w-full text-center justify-center"
                        onClick={toggleSearchMenu}
                    >
                        <Search className="h-5 w-5" />
                        <span >Buscar</span>
                    </button>
                    <Link href="/admin" className="flex items-center p-3 gap-2 text-sm font-medium hover:underline hover:bg-black/15 transition w-full text-center justify-center">
                        <User className="h-5 w-5" />
                        <span >Cuenta</span>
                    </Link>

                </div>
            </div>

            <div className={`
                absolute top-20 left-0 md:mx-auto w-full  z-20
                transition-all duration-300
                ${isSearchOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"}
                `}
                ref={searchRef}
            >
                <div className="mx-auto w-full max-w-xl">
                    <SearchInput setIsSearchOpen={setIsSearchOpen} isSearchOpen={isSearchOpen} />
                </div>
            </div>

            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}

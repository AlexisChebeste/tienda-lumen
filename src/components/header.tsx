"use client"

import { useCart } from "@/lib/card-context";
import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CartSidebar from "./cart-sidebar";

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const {totalItems} = useCart()



    return (
        <>
            <header className="sticky top-0 z-30 w-full border-b border-border bg-background/90 backdrop-blur-sm">
                <div className="container flex h-20 items-center justify-between px-6 mx-auto max-w-7xl">
                    <Link href="/" className="flex items-center">
                        <span className="font-serif text-2xl font-light tracking-[0.2em]">LUMEN</span>
                    </Link>

                    {/* Add navigation links or other header content here */}
                    <nav className="hidden md:flex">
                        <Link href="/shop" className="mx-4 text-sm font-medium hover:underline">
                            Shop
                        </Link>
                        <Link href="/about" className="mx-4 text-sm font-medium hover:underline">
                            About
                        </Link>
                        <Link href="/contact" className="mx-4 text-sm font-medium hover:underline">
                            Contact
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center p-2 text-sm font-medium hover:underline hover:bg-black/15 transition rounded-full">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </button>
                        <button className="flex items-center p-2 text-sm font-medium hover:underline hover:bg-black/15 transition rounded-full">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="flex items-center p-2 text-sm font-medium hover:underline hover:bg-black/15 transition rounded-full relative">
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                    {totalItems}
                                </span>
                            )}
                            <span className="sr-only">Cart</span>
                        </button>
                    </div>
                </div>
            </header>
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
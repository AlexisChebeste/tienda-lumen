"use client"

import useClickOutside from "@/lib/useClickOutside";
import { ArrowBigLeft, LayoutDashboard, Menu, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useRef, useState } from "react";
import { useEffect } from "react"

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null)
    useClickOutside(mobileMenuRef, () => setIsMenuOpen(false))

    const navLinks = [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Productos', href: '/admin/products', icon: <Package size={18} /> },
        { name: 'Pedidos', href: '/admin/orders', icon: <ShoppingCart size={18} /> },
    ];
    
    useEffect(() => {
        setIsMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
    }, [isMenuOpen])

    

    function NavItems() {
        const pathname = usePathname()

        return navLinks.map((link) => {
            const isActive = (() => {
                if (link.href === "/admin") return pathname === "/admin"
                return pathname.startsWith(link.href)
            })()

            return (
            <li key={link.name}>
                <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex gap-3 items-center px-3 py-2.5 rounded-md text-sm font-medium ${
                        isActive ? 'bg-gray-200 text-black' : 'text-gray-600 hover:bg-gray-200 hover:text-black lg:text-gray-300 lg:hover:bg-gray-700 lg:hover:text-white'
                    }`}
                    >
                    {link.icon}
                    {link.name}
                </Link>
            </li>
            )
        })
    }

    return (
        <header className="sticky top-0 z-50 flex flex-col">
            <div className="flex lg:hidden h-16 z-40 top-0 left-0 bg-white items-center justify-between px-3 md:p-6 border-b border-gray-300">
                <Link href="/admin" className="flex items-center p-2">
                    <h2 className="font-serif text-2xl text-gray-800 font-light tracking-wide">LUMEN</h2>
                </Link>

                <button className="p-2 rounded-xl text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú">
                    <Menu size={20} className="text-gray-800" />
                </button>
            </div>

            <nav className={`lg:hidden fixed top-16 left-0 w-full bg-white z-30 transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} border-b border-gray-300`} ref={mobileMenuRef}>
                <ul className="flex flex-col gap-2 px-8 py-4">
                    <NavItems />
                    <li className="pt-2 border-t">
                        
                        <Link href="/tienda" className={`flex gap-3 items-center px-3 py-2.5 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200 hover:text-black lg:text-gray-300 lg:hover:bg-gray-700 lg:hover:text-white
                        }`}>
                            <ArrowBigLeft className="inline-block" size={20} />
                            Volver a la tienda
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="hidden lg:flex w-64 bg-stone-900  flex-col text-white h-screen border-r border-gray-600">
                <section className="flex items-center justify-between p-4 border-b border-gray-600">
                    <Link href="/admin" className="flex items-center ">
                        <h2 className="font-serif text-2xl text-white font-light tracking-wide">LUMEN</h2>
                    </Link>
                    
                    <h2 className="text-xs uppercase text-gray-400">Admin</h2>
                </section>
                <section className="flex flex-col justify-between flex-1 h-full">
                    <nav className="p-4 flex flex-col gap-2 justify-between flex-1">
                        <ul className="space-y-4">
                            <NavItems />
                        </ul>
                    </nav>
                    <Link href="/tienda" className="flex items-center px-6 py-4 gap-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white border-t border-gray-600 mt-4">
                        <ArrowBigLeft className="inline-block mr-2" size={20} />
                        Volver a la tienda
                    </Link>
                </section>
            </div>


        </header>
    );
}
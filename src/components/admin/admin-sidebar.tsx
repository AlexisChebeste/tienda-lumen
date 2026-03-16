"use client"

import { ArrowBigLeft, LayoutDashboard, Package, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> },
        { name: 'Productos', href: '/admin/products', icon: <Package size={18} /> },
        { name: 'Pedidos', href: '/admin/orders', icon: <ShoppingCart size={18} /> },
    ];

    return (
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
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.href} className={`flex gap-3 items-center px-3 py-2.5 rounded-md text-sm font-medium ${pathname === link.href ? 'bg-gray-50 text-black' : 'text-gray-300 hover:bg-gray-500 hover:text-white'} transition-colors duration-200`}>
                                    {link.icon}
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <Link href="/tienda" className="flex items-center px-6 py-4 gap-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white border-t border-gray-600 mt-4">
                    <ArrowBigLeft className="inline-block mr-2" size={20} />
                    Volver a la tienda
                </Link>
            </section>
        </div>
    );
}
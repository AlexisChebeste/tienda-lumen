import Footer from "@/components/footer"
import Header from "@/components/header"
import { CartProvider } from "@/lib/card-context"

export default function StoreLayout({
        children,
    }: {
        children: React.ReactNode
    }) {
        
    return (
        <CartProvider>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-1">
                    {children}
                </main>

                <Footer />
            </div>
        </CartProvider>
    )
}
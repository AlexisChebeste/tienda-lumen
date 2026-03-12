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
            <Header />
            
            {children}

            <Footer />
        </CartProvider>
    )
}
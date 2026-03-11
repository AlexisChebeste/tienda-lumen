import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/card-context";
import Header from "@/components/header";
import Footer from "@/components/footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
})

const inter = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "LUMEN - Minimalist Urban Essentials",
  description: "Timeless pieces for modern living. Thoughtfully designed essentials that transcend trends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll="smooth">
      <body className={`${inter.variable} ${cormorant.variable} font-sans antialiased min-h-screen flex flex-col h-full`}>
        <CartProvider>
          <Header />
          {children}

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

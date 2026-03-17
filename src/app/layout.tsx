import type { Metadata } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"

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
      <body 
        suppressHydrationWarning
        className={`${inter.variable} ${cormorant.variable} font-sans antialiased min-h-screen flex flex-col h-full`}
      >
        {children}
        <Toaster richColors  position="top-right"/>
      </body>
    </html>
  );
}

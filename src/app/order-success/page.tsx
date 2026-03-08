import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function OrderSuccessPage() {
    return (
      <div className="flex min-h-screen bg-background flex-col">
        <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-6 items-start justify-center h-full relative ">

            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center border border-border">
              <ShieldCheck className="h-10 w-10 text-foreground" />
            </div>
            <h1 className="mx-auto font-serif text-3xl font-light tracking-wide">Pedido Confirmado</h1>
            <p className="mx-auto  mt-4 text-muted-foreground">
              Gracias por tu compra. Recibirás un correo de confirmación con los detalles de tu pedido.
            </p>
            <p className="mx-auto  mt-2 text-sm text-muted-foreground">
              Número de pedido: <span className="mx-auto  font-medium text-foreground">LMN-{Date.now().toString().slice(-8)}</span>
            </p>
            <button  className="mx-auto  mt-10 rounded-none px-12 py-6 text-sm tracking-widest uppercase">
              <Link href="/shop">Continuar Comprando</Link>
            </button>
        </main>
      </div>
    )
}
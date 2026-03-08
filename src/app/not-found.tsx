import Link from "next/link";

export default function NotFoundPage() {
    return (
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-6 items-start justify-center h-full relative ">
            <div className="text-center m-auto flex flex-col gap-6">
                <h1 className="text-3xl  tracking-wide">404 - Página No Encontrada</h1>
                <p className=" mt-4 text-muted-foreground">
                Lo sentimos, la página que estás buscando no existe. Puede que haya sido movida o eliminada.
                </p>
                <Link href="/tienda" className="rounded-none px-12 py-6 text-sm tracking-widest uppercase">
                    Volver a la tienda
                </Link>
            </div>
        </main>
        </div>
    )
}
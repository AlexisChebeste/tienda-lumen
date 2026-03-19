
export default function ContactoPage() {
    return (
      <div className="flex flex-1 p-6 lg:py-32  bg-background flex-col ">
        <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 gap-6 items-start justify-center h-full relative ">
            <div className="text-center m-auto">
                <h1 className="font-serif text-3xl font-light tracking-wide">Contacto</h1>
                <p className=" mt-4 text-muted-foreground">
                Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.
                </p>

                <form action="/contacto" className="  mt-6 w-full max-w-md mx-auto">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nombre</label>
                            <input type="text" id="name" name="name" className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Tu Nombre" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input type="email" id="email" name="email" className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="tu@email.com" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="message" className="text-sm font-medium text-gray-700">Mensaje</label>
                            <textarea id="message" name="message" rows={4} className="border-2 border-gray-200 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-stone-800" placeholder="Tu Mensaje"></textarea>
                        </div>
                    </div>
                    <button type="submit" className="mt-6 rounded-none px-12 py-6 text-sm tracking-widest uppercase">
                        Enviar Mensaje
                    </button>
                </form>

                <p className=" mt-2 text-sm text-muted-foreground">
                Puedes enviarnos un correo a <span className="mx-auto  font-medium text-foreground">
                    contacto@tienda.com
                </span> o llamarnos al <span className="mx-auto  font-medium text-foreground">+1 (555) 123-4567</span>.
                </p>
            </div>
            

        </main>
        </div>
    )
}
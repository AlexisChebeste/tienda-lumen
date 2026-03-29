import Link from "next/link";

export default function Footer() {
    return(
        <footer className="w-full shadow-md  border-t border-border h-full">
            <div className="max-w-7xl px-6 py-6 mx-auto">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mt-6">

                    <div>
                        <h3 className="font-serif text-2xl font-light tracking-[0.2em] mb-4 ">LUMEN</h3>
                        <p className="text-sm text-muted-foreground">Moda minimalista atemporal para el armario moderno.</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-4 tracking-wider uppercase">About</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Nuestra historia
                                </Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    
                    </div>
                    
                    <div className="">
                        <h3 className="text-lg font-medium mb-4 tracking-wider uppercase">TIENDA</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/tienda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Hombre
                                </Link>
                            </li>
                            <li>
                                <Link href="/tienda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Mujer
                                </Link>
                            </li>
                            <li>
                                <Link href="/tienda" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Accessorios
                                </Link>
                            </li>
                        </ul>
                    
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
                <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} LUMEN. Casi todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Instagram
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    Twitter
                    </Link>
                    <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground ">
                    Facebook
                    </Link>
                </div>
                </div>
            </div>

        </footer>
    )
}
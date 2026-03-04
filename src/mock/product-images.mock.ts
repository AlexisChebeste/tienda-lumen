import { ProductImage } from "@/domain/product-image";

export const productImages: ProductImage[] = [
    {
        id: "img1",
        productId: "1",
        url: "/product/shirt-blanco.webp",
        alt: "Camiseta blanca",
        position: 1,
        isMain: true,
        colorId: "c1"
    },
    {
        id: "img2",
        productId: "1",
        url: "/product/shirt-negro.webp",
        position: 2,
        alt: "Camiseta negra",
        isMain: false,
        colorId: "c2"
    },
    {
        id: "img3",
        productId: "1",
        url: "/product/shirt-verde.webp",
        position: 2,
        alt: "Camiseta verde",
        isMain: false,
        colorId: "c3"
    },
    {
        id: "img4",
        productId: "2",
        url: "/product/hoodie-blanco.webp",
        position: 1,
        alt: "Hoodie blanco",
        isMain: true,
        colorId: "c1"
    },
    {
        id: "img5",
        productId: "2",
        url: "/product/hoodie-negro.webp",
        position: 2,
        alt: "Hoodie negro",
        isMain: false,
        colorId: "c2"
    },
    {
        id: "img6",
        productId: "2",
        url: "/product/hoodie-azul.webp",
        position: 3,
        alt: "Hoodie azul",
        isMain: true,
        colorId: "c4"
    },
    {
        id: "img7",
        productId: "3",
        url: "/product/negro-sweater.webp",
        alt: "Sueter negro",
        position: 1,
        isMain: false,
        colorId: "c2"
    },
    {
        id: "img8",
        productId: "3",
        url: "/product/azulcielo-sweater.webp",
        alt: "Sueter azul cielo",
        position: 2,
        isMain: true,
        colorId: "c8"
    },
    {
        id: "img9",
        productId: "3",
        url: "/product/crema-sweater.webp",
        alt: "Sueter crema",
        position: 3,
        isMain: false,
        colorId: "c9"
    },
    {
        id: "img10",
        productId: "4",
        url: "/product/shirt-couture-negro.webp",
        alt: "Camiseta couture negra",
        position: 2,
        isMain: false,
        colorId: "c2"
    },
    {
        id: "img11",
        productId: "4",
        url: "/product/shirt-couture-blanco.webp",
        alt: "Camiseta couture blanca",
        position: 1,
        isMain: true,
        colorId: "c1"
    },
    {
        id: "img12",
        productId: "4",
        url: "/product/shirt-couture-marron.webp",
        alt: "Camiseta couture marrón",
        position: 3,
        isMain: false,
        colorId: "c7"
    }
];
export interface Product {
    id: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    category: string;
    images: string[];
    details: string[];
    isActive: boolean;
}

export interface ProductVariant {
    id: string;
    stock: number;
    color: Color
    productId: string;
    size: string;
    sku: string;
    image: string
}

export interface Color {
    name: string;
    value: string;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Camiseta Blanca Clásica',
        description: 'Camiseta clásica minimalista confeccionada con algodón 100% orgánico. Presenta un ajuste relajado con una silueta atemporal que combina sin esfuerzo con cualquier guardarropa.',
        slug: "camiseta-blanca-clasica",
        price: 29.99,
        category: 'Camisetas',
        images: [
            '/product/shirt-white.webp',
            '/product/shirt-black.webp',
            '/product/shirt-green.webp',
        ],
        details: [
            'Algodón Orgánico 100%',
            'Lavable a Máquina',
            'Disponible en múltiples colores y tallas',
        ],
        isActive: true,
    },
    {
        id: '2',
        name: 'Camisa Couture',
        description: 'Camisa elegante confeccionada con materiales premium, diseñada para comodidad y estilo. Perfecta para ocasiones formales o para elevar tu look diario.',
        price: 79.99,
        slug: "camisa-couture",
        category: 'Camisas',
        images: [
            '/product/shirt-couture-brown.webp',
            '/product/shirt-couture-white.webp',
            '/product/shirt-couture-black.webp',
        ],
        details: [
            'Mezcla de Algodón Premium',
            'Cuello con Botones',
            'Ajuste Entallado',
        ],
        isActive: true,
    },
    {
        id: '3',
        name: 'Sudadera con Capucha',
        description: 'Cómoda sudadera con capucha disponible en múltiples colores.',
        category: 'Sudaderas',
        price: 49.99,
        slug: "sudadera-capucha",
        images: [
            '/product/hoodie-black.webp',
            '/product/hoodie-white.webp',
            '/product/hoodie-blue.webp',
        ],
        details: [
            'Material de Polar Suave',
            'Cordón Ajustable en la Capucha',
            'Bolsillo Canguro Frontal',
        ],
        isActive: true,
    },
    {
        id: '4',
        name: 'Suéter Clásico',
        description: 'Suéter clásico acogedor hecho de suave mezcla de lana.',
        price: 99.99,
        category: 'Suéteres',
        slug: "sueter-clasico",
        images: [
            '/product/cream-sweater.webp',
            '/product/skyblue-sweater.webp',
            '/product/black-sweater.webp',
        ],
        details: [
            'Tela de Mezcla de Lana',
            'Puños y Borde Acanalados',
            'Disponible en múltiples colores y tallas',
        ],
        isActive: true,
    }
];

const variants: ProductVariant[] = [
  // PRODUCT 1 – CAMISETA
  // BLANCO
  { id: '1', productId: '1', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'S', stock: 10, sku: 'LUM-TEE-WHT-S', image: '/product/shirt-white.webp' },
  { id: '2', productId: '1', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'M', stock: 8, sku: 'LUM-TEE-WHT-M', image: '/product/shirt-white.webp' },
  { id: '3', productId: '1', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'L', stock: 5, sku: 'LUM-TEE-WHT-L', image: '/product/shirt-white.webp' },
  { id: '4', productId: '1', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'XL', stock: 2, sku: 'LUM-TEE-WHT-XL', image: '/product/shirt-white.webp' },

  // NEGRO
  { id: '5', productId: '1', color: { name: 'Negro', value: '#000000' }, size: 'S', stock: 7, sku: 'LUM-TEE-BLK-S', image: '/product/shirt-black.webp' },
  { id: '6', productId: '1', color: { name: 'Negro', value: '#000000' }, size: 'M', stock: 6, sku: 'LUM-TEE-BLK-M', image: '/product/shirt-black.webp' },
  { id: '7', productId: '1', color: { name: 'Negro', value: '#000000' }, size: 'L', stock: 4, sku: 'LUM-TEE-BLK-L', image: '/product/shirt-black.webp' },
  { id: '8', productId: '1', color: { name: 'Negro', value: '#000000' }, size: 'XL', stock: 1, sku: 'LUM-TEE-BLK-XL', image: '/product/shirt-black.webp' },

  // VERDE
  { id: '9', productId: '1', color: { name: 'Verde', value: '#393A2A' }, size: 'S', stock: 3, sku: 'LUM-TEE-BROW-S', image: '/product/shirt-green.webp' },
  { id: '10', productId: '1', color: { name: 'Verde', value: '#393A2A' }, size: 'M', stock: 2, sku: 'LUM-TEE-BROW-M', image: '/product/shirt-green.webp' },
  { id: '11', productId: '1', color: { name: 'Verde', value: '#393A2A' }, size: 'L', stock: 1, sku: 'LUM-TEE-BROW-L', image: '/product/shirt-green.webp' },
  { id: '12', productId: '1', color: { name: 'Verde', value: '#393A2A' }, size: 'XL', stock: 0, sku: 'LUM-TEE-BROW-XL', image: '/product/shirt-green.webp' },

  // PRODUCT 2 – CAMISA COUTURE
  // CAFÉ
  { id: '13', productId: '2', color: { name: 'Café', value: '#463A2E' }, size: 'S', stock: 5, sku: 'LUM-SHRT-BRN-S', image: '/product/shirt-couture-brown.webp' },
  { id: '14', productId: '2', color: { name: 'Café', value: '#463A2E' }, size: 'M', stock: 4, sku: 'LUM-SHRT-BRN-M', image: '/product/shirt-couture-brown.webp' },
  { id: '15', productId: '2', color: { name: 'Café', value: '#463A2E' }, size: 'L', stock: 2, sku: 'LUM-SHRT-BRN-L', image: '/product/shirt-couture-brown.webp' },
  { id: '16', productId: '2', color: { name: 'Café', value: '#463A2E' }, size: 'XL', stock: 0, sku: 'LUM-SHRT-BRN-XL', image: '/product/shirt-couture-brown.webp' },

  // BLANCO
  { id: '17', productId: '2', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'S', stock: 6, sku: 'LUM-SHRT-WHT-S', image: '/product/shirt-couture-white.webp' },
  { id: '18', productId: '2', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'M', stock: 5, sku: 'LUM-SHRT-WHT-M', image: '/product/shirt-couture-white.webp' },
  { id: '19', productId: '2', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'L', stock: 3, sku: 'LUM-SHRT-WHT-L', image: '/product/shirt-couture-white.webp' },
  { id: '20', productId: '2', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'XL', stock: 1, sku: 'LUM-SHRT-WHT-XL', image: '/product/shirt-couture-white.webp' },

  // NEGRO
  { id: '21', productId: '2', color: { name: 'Negro', value: '#000000' }, size: 'S', stock: 4, sku: 'LUM-SHRT-BLK-S', image: '/product/shirt-couture-black.webp' },
  { id: '22', productId: '2', color: { name: 'Negro', value: '#000000' }, size: 'M', stock: 3, sku: 'LUM-SHRT-BLK-M', image: '/product/shirt-couture-black.webp' },
  { id: '23', productId: '2', color: { name: 'Negro', value: '#000000' }, size: 'L', stock: 2, sku: 'LUM-SHRT-BLK-L', image: '/product/shirt-couture-black.webp' },
  { id: '24', productId: '2', color: { name: 'Negro', value: '#000000' }, size: 'XL', stock: 0, sku: 'LUM-SHRT-BLK-XL', image: '/product/shirt-couture-black.webp' },

  // PRODUCT 3 – SUDADERA
  { id: '25', productId: '3', color: { name: 'Negro', value: '#000000' }, size: 'S', stock: 8, sku: 'LUM-HOOD-BLK-S', image: '/product/hoodie-black.webp' },
  { id: '26', productId: '3', color: { name: 'Negro', value: '#000000' }, size: 'M', stock: 6, sku: 'LUM-HOOD-BLK-M', image: '/product/hoodie-black.webp' },
  { id: '27', productId: '3', color: { name: 'Negro', value: '#000000' }, size: 'L', stock: 4, sku: 'LUM-HOOD-BLK-L', image: '/product/hoodie-black.webp' },
  { id: '28', productId: '3', color: { name: 'Negro', value: '#000000' }, size: 'XL', stock: 2, sku: 'LUM-HOOD-BLK-XL', image: '/product/hoodie-black.webp' },

  { id: '29', productId: '3', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'S', stock: 6, sku: 'LUM-HOOD-WHT-S', image: '/product/hoodie-white.webp' },
  { id: '30', productId: '3', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'M', stock: 5, sku: 'LUM-HOOD-WHT-M', image: '/product/hoodie-white.webp' },
  { id: '31', productId: '3', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'L', stock: 3, sku: 'LUM-HOOD-WHT-L', image: '/product/hoodie-white.webp' },
  { id: '32', productId: '3', color: { name: 'Blanco', value: '#FFFFFF' }, size: 'XL', stock: 1, sku: 'LUM-HOOD-WHT-XL', image: '/product/hoodie-white.webp' },

  { id: '33', productId: '3', color: { name: 'Azul', value: '#225A97' }, size: 'S', stock: 4, sku: 'LUM-HOOD-BLU-S', image: '/product/hoodie-blue.webp' },
  { id: '34', productId: '3', color: { name: 'Azul', value: '#225A97' }, size: 'M', stock: 3, sku: 'LUM-HOOD-BLU-M', image: '/product/hoodie-blue.webp' },
  { id: '35', productId: '3', color: { name: 'Azul', value: '#225A97' }, size: 'L', stock: 2, sku: 'LUM-HOOD-BLU-L', image: '/product/hoodie-blue.webp' },
  { id: '36', productId: '3', color: { name: 'Azul', value: '#225A97' }, size: 'XL', stock: 0, sku: 'LUM-HOOD-BLU-XL', image: '/product/hoodie-blue.webp' },

  // PRODUCT 4 – SUÉTER
  { id: '37', productId: '4', color: { name: 'Crema', value: '#F5F5DC' }, size: 'S', stock: 5, sku: 'LUM-SWT-CRM-S', image: '/product/cream-sweater.webp' },
  { id: '38', productId: '4', color: { name: 'Crema', value: '#F5F5DC' }, size: 'M', stock: 4, sku: 'LUM-SWT-CRM-M', image: '/product/cream-sweater.webp' },
  { id: '39', productId: '4', color: { name: 'Crema', value: '#F5F5DC' }, size: 'L', stock: 2, sku: 'LUM-SWT-CRM-L', image: '/product/cream-sweater.webp' },
  { id: '40', productId: '4', color: { name: 'Crema', value: '#F5F5DC' }, size: 'XL', stock: 1, sku: 'LUM-SWT-CRM-XL', image: '/product/cream-sweater.webp' },

  { id: '41', productId: '4', color: { name: 'Azul Cielo', value: '#B0C4DE' }, size: 'S', stock: 4, sku: 'LUM-SWT-SKY-S', image: '/product/skyblue-sweater.webp' },
  { id: '42', productId: '4', color: { name: 'Azul Cielo', value: '#B0C4DE' }, size: 'M', stock: 3, sku: 'LUM-SWT-SKY-M', image: '/product/skyblue-sweater.webp' },
  { id: '43', productId: '4', color: { name: 'Azul Cielo', value: '#B0C4DE' }, size: 'L', stock: 1, sku: 'LUM-SWT-SKY-L', image: '/product/skyblue-sweater.webp' },
  { id: '44', productId: '4', color: { name: 'Azul Cielo', value: '#B0C4DE' }, size: 'XL', stock: 0, sku: 'LUM-SWT-SKY-XL', image: '/product/skyblue-sweater.webp' },

  { id: '45', productId: '4', color: { name: 'Negro', value: '#000000' }, size: 'S', stock: 6, sku: 'LUM-SWT-BLK-S', image: '/product/black-sweater.webp' },
  { id: '46', productId: '4', color: { name: 'Negro', value: '#000000' }, size: 'M', stock: 5, sku: 'LUM-SWT-BLK-M', image: '/product/black-sweater.webp' },
  { id: '47', productId: '4', color: { name: 'Negro', value: '#000000' }, size: 'L', stock: 3, sku: 'LUM-SWT-BLK-L', image: '/product/black-sweater.webp' },
  { id: '48', productId: '4', color: { name: 'Negro', value: '#000000' }, size: 'XL', stock: 2, sku: 'LUM-SWT-BLK-XL', image: '/product/black-sweater.webp' },
];

export const getProductVariants = (productId: string): ProductVariant[] => {
    return variants.filter(variant => variant.productId === productId);
}

export const getVariantById = (productId: string ): ProductVariant | undefined => {
    return variants.find(v => v.id === productId)
}

export const uniqueColorsFromVariants = (variants: ProductVariant[]): Color[] =>{
    return Array.from(
            new Map(
                variants.map(v => [v.color.name, v.color])
            ).values()
        );
}

export interface ProductFilter {
  category: string[];
  size: string[];
  color?: string[];
  priceRange: [number, number];
}

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
        name: 'Classic White T-Shirt',
        description: 'Classic minimalist t-shirt crafted from 100% organic cotton. Features a relaxed fit with a timeless silhouette that pairs effortlessly with any wardrobe.',
        slug: "classic-white-t-shirt",
        price: 29.99,
        category: 'T-Shirts',
        images: [
            '/product/shirt-white.webp',
            '/product/shirt-black.webp',
            '/product/shirt-green.webp',
        ],
        details: [
            '100% Organic Cotton',
            'Machine Washable',
            'Available in multiple colors and sizes',
        ],
        isActive: true,
    },
    {
        id: '2',
        name: 'Shirt Couture',
        description: 'Elegant shirt made from premium materials, designed for both comfort and style. Perfect for formal occasions or elevating your everyday look.',
        price: 79.99,
        slug: "shirt-couture",
        category: 'Shirts',
        images: [
            '/product/shirt-couture-brown.webp',
            '/product/shirt-couture-white.webp',
            '/product/shirt-couture-black.webp',
        ],
        details: [
            'Premium Cotton Blend',
            'Button-Down Collar',
            'Tailored Fit',
        ],
        isActive: true,
    },
    {
        id: '3',
        name: 'Hoodie Sweatshirt',
        description: 'Comfortable hoodie sweatshirt available in multiple colors.',
        category: 'Hoodies',
        price: 49.99,
        slug: "hoodie-swatshirt",
        images: [
            '/product/hoodie-black.webp',
            '/product/hoodie-white.webp',
            '/product/hoodie-blue.webp',
        ],
        details: [
            'Soft Fleece Material',
            'Adjustable Drawstring Hood',
            'Front Kangaroo Pocket',
        ],
        isActive: true,
    },
    {
        id: '4',
        name: 'Classic Sweater',
        description: 'Cozy classic sweater made from soft wool blend.',
        price: 99.99,
        category: 'Sweaters',
        slug: "sweater-classic",
        images: [
            '/product/cream-sweater.webp',
            '/product/sky-sweater.webp',
            '/product/black-sweater.webp',
        ],
        details: [
            'Wool Blend Fabric',
            'Ribbed Cuffs and Hem',
            'Available in multiple colors and sizes',
        ],
        isActive: true,
    }
];

const variants: ProductVariant[] = [
  // PRODUCT 1 – T-SHIRT
  // WHITE
  { id: '1', productId: '1', color: { name: 'White', value: '#FFFFFF' }, size: 'S', stock: 10, sku: 'LUM-TEE-WHT-S', image: '/product/shirt-white.webp' },
  { id: '2', productId: '1', color: { name: 'White', value: '#FFFFFF' }, size: 'M', stock: 8, sku: 'LUM-TEE-WHT-M', image: '/product/shirt-white.webp' },
  { id: '3', productId: '1', color: { name: 'White', value: '#FFFFFF' }, size: 'L', stock: 5, sku: 'LUM-TEE-WHT-L', image: '/product/shirt-white.webp' },
  { id: '4', productId: '1', color: { name: 'White', value: '#FFFFFF' }, size: 'XL', stock: 2, sku: 'LUM-TEE-WHT-XL', image: '/product/shirt-white.webp' },

  // BLACK
  { id: '5', productId: '1', color: { name: 'Black', value: '#000000' }, size: 'S', stock: 7, sku: 'LUM-TEE-BLK-S', image: '/product/shirt-black.webp' },
  { id: '6', productId: '1', color: { name: 'Black', value: '#000000' }, size: 'M', stock: 6, sku: 'LUM-TEE-BLK-M', image: '/product/shirt-black.webp' },
  { id: '7', productId: '1', color: { name: 'Black', value: '#000000' }, size: 'L', stock: 4, sku: 'LUM-TEE-BLK-L', image: '/product/shirt-black.webp' },
  { id: '8', productId: '1', color: { name: 'Black', value: '#000000' }, size: 'XL', stock: 1, sku: 'LUM-TEE-BLK-XL', image: '/product/shirt-black.webp' },

  // BROWN
  { id: '9', productId: '1', color: { name: 'Green', value: '#393A2A' }, size: 'S', stock: 3, sku: 'LUM-TEE-BROW-S', image: '/product/shirt-green.webp' },
  { id: '10', productId: '1', color: { name: 'Green', value: '#393A2A' }, size: 'M', stock: 2, sku: 'LUM-TEE-BROW-M', image: '/product/shirt-green.webp' },
  { id: '11', productId: '1', color: { name: 'Green', value: '#393A2A' }, size: 'L', stock: 1, sku: 'LUM-TEE-BROW-L', image: '/product/shirt-green.webp' },
  { id: '12', productId: '1', color: { name: 'Green', value: '#393A2A' }, size: 'XL', stock: 0, sku: 'LUM-TEE-BROW-XL', image: '/product/shirt-green.webp' },

  // PRODUCT 2 – SHIRT COUTURE
  // BROWN
  { id: '13', productId: '2', color: { name: 'Brown', value: '#463A2E' }, size: 'S', stock: 5, sku: 'LUM-SHRT-BRN-S', image: '/product/shirt-couture-brown.webp' },
  { id: '14', productId: '2', color: { name: 'Brown', value: '#463A2E' }, size: 'M', stock: 4, sku: 'LUM-SHRT-BRN-M', image: '/product/shirt-couture-brown.webp' },
  { id: '15', productId: '2', color: { name: 'Brown', value: '#463A2E' }, size: 'L', stock: 2, sku: 'LUM-SHRT-BRN-L', image: '/product/shirt-couture-brown.webp' },
  { id: '16', productId: '2', color: { name: 'Brown', value: '#463A2E' }, size: 'XL', stock: 0, sku: 'LUM-SHRT-BRN-XL', image: '/product/shirt-couture-brown.webp' },

  // WHITE
  { id: '17', productId: '2', color: { name: 'White', value: '#FFFFFF' }, size: 'S', stock: 6, sku: 'LUM-SHRT-WHT-S', image: '/product/shirt-couture-white.webp' },
  { id: '18', productId: '2', color: { name: 'White', value: '#FFFFFF' }, size: 'M', stock: 5, sku: 'LUM-SHRT-WHT-M', image: '/product/shirt-couture-white.webp' },
  { id: '19', productId: '2', color: { name: 'White', value: '#FFFFFF' }, size: 'L', stock: 3, sku: 'LUM-SHRT-WHT-L', image: '/product/shirt-couture-white.webp' },
  { id: '20', productId: '2', color: { name: 'White', value: '#FFFFFF' }, size: 'XL', stock: 1, sku: 'LUM-SHRT-WHT-XL', image: '/product/shirt-couture-white.webp' },

  // BLACK
  { id: '21', productId: '2', color: { name: 'Black', value: '#000000' }, size: 'S', stock: 4, sku: 'LUM-SHRT-BLK-S', image: '/product/shirt-couture-black.webp' },
  { id: '22', productId: '2', color: { name: 'Black', value: '#000000' }, size: 'M', stock: 3, sku: 'LUM-SHRT-BLK-M', image: '/product/shirt-couture-black.webp' },
  { id: '23', productId: '2', color: { name: 'Black', value: '#000000' }, size: 'L', stock: 2, sku: 'LUM-SHRT-BLK-L', image: '/product/shirt-couture-black.webp' },
  { id: '24', productId: '2', color: { name: 'Black', value: '#000000' }, size: 'XL', stock: 0, sku: 'LUM-SHRT-BLK-XL', image: '/product/shirt-couture-black.webp' },

  // PRODUCT 3 – HOODIE
  { id: '25', productId: '3', color: { name: 'Black', value: '#000000' }, size: 'S', stock: 8, sku: 'LUM-HOOD-BLK-S', image: '/product/hoodie-black.webp' },
  { id: '26', productId: '3', color: { name: 'Black', value: '#000000' }, size: 'M', stock: 6, sku: 'LUM-HOOD-BLK-M', image: '/product/hoodie-black.webp' },
  { id: '27', productId: '3', color: { name: 'Black', value: '#000000' }, size: 'L', stock: 4, sku: 'LUM-HOOD-BLK-L', image: '/product/hoodie-black.webp' },
  { id: '28', productId: '3', color: { name: 'Black', value: '#000000' }, size: 'XL', stock: 2, sku: 'LUM-HOOD-BLK-XL', image: '/product/hoodie-black.webp' },

  { id: '29', productId: '3', color: { name: 'White', value: '#FFFFFF' }, size: 'S', stock: 6, sku: 'LUM-HOOD-WHT-S', image: '/product/hoodie-white.webp' },
  { id: '30', productId: '3', color: { name: 'White', value: '#FFFFFF' }, size: 'M', stock: 5, sku: 'LUM-HOOD-WHT-M', image: '/product/hoodie-white.webp' },
  { id: '31', productId: '3', color: { name: 'White', value: '#FFFFFF' }, size: 'L', stock: 3, sku: 'LUM-HOOD-WHT-L', image: '/product/hoodie-white.webp' },
  { id: '32', productId: '3', color: { name: 'White', value: '#FFFFFF' }, size: 'XL', stock: 1, sku: 'LUM-HOOD-WHT-XL', image: '/product/hoodie-white.webp' },

  { id: '33', productId: '3', color: { name: 'Blue', value: '#225A97' }, size: 'S', stock: 4, sku: 'LUM-HOOD-BLU-S', image: '/product/hoodie-blue.webp' },
  { id: '34', productId: '3', color: { name: 'Blue', value: '#225A97' }, size: 'M', stock: 3, sku: 'LUM-HOOD-BLU-M', image: '/product/hoodie-blue.webp' },
  { id: '35', productId: '3', color: { name: 'Blue', value: '#225A97' }, size: 'L', stock: 2, sku: 'LUM-HOOD-BLU-L', image: '/product/hoodie-blue.webp' },
  { id: '36', productId: '3', color: { name: 'Blue', value: '#225A97' }, size: 'XL', stock: 0, sku: 'LUM-HOOD-BLU-XL', image: '/product/hoodie-blue.webp' },

  // PRODUCT 4 – SWEATER
  { id: '37', productId: '4', color: { name: 'Cream', value: '#F5F5DC' }, size: 'S', stock: 5, sku: 'LUM-SWT-CRM-S', image: '/product/cream-sweater.webp' },
  { id: '38', productId: '4', color: { name: 'Cream', value: '#F5F5DC' }, size: 'M', stock: 4, sku: 'LUM-SWT-CRM-M', image: '/product/cream-sweater.webp' },
  { id: '39', productId: '4', color: { name: 'Cream', value: '#F5F5DC' }, size: 'L', stock: 2, sku: 'LUM-SWT-CRM-L', image: '/product/cream-sweater.webp' },
  { id: '40', productId: '4', color: { name: 'Cream', value: '#F5F5DC' }, size: 'XL', stock: 1, sku: 'LUM-SWT-CRM-XL', image: '/product/cream-sweater.webp' },

  { id: '41', productId: '4', color: { name: 'Sky Blue', value: '#B0C4DE' }, size: 'S', stock: 4, sku: 'LUM-SWT-SKY-S', image: '/product/skyblue-sweater.webp' },
  { id: '42', productId: '4', color: { name: 'Sky Blue', value: '#B0C4DE' }, size: 'M', stock: 3, sku: 'LUM-SWT-SKY-M', image: '/product/skyblue-sweater.webp' },
  { id: '43', productId: '4', color: { name: 'Sky Blue', value: '#B0C4DE' }, size: 'L', stock: 1, sku: 'LUM-SWT-SKY-L', image: '/product/skyblue-sweater.webp' },
  { id: '44', productId: '4', color: { name: 'Sky Blue', value: '#B0C4DE' }, size: 'XL', stock: 0, sku: 'LUM-SWT-SKY-XL', image: '/product/skyblue-sweater.webp' },

  { id: '45', productId: '4', color: { name: 'Black', value: '#000000' }, size: 'S', stock: 6, sku: 'LUM-SWT-BLK-S', image: '/product/black-sweater.webp' },
  { id: '46', productId: '4', color: { name: 'Black', value: '#000000' }, size: 'M', stock: 5, sku: 'LUM-SWT-BLK-M', image: '/product/black-sweater.webp' },
  { id: '47', productId: '4', color: { name: 'Black', value: '#000000' }, size: 'L', stock: 3, sku: 'LUM-SWT-BLK-L', image: '/product/black-sweater.webp' },
  { id: '48', productId: '4', color: { name: 'Black', value: '#000000' }, size: 'XL', stock: 2, sku: 'LUM-SWT-BLK-XL', image: '/product/black-sweater.webp' },
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

export interface ProductVariantCreate {
  id: string;
  productId: string;
  colorId: string;
  sizeId: string;
  price: number;
  stock: number;
  sku: string;
}
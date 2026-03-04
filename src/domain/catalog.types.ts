import { Category } from "./categories";
import { Color } from "./colors";
import { ProductImage } from "./product-image";
import { Size } from "./sizes";

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: ProductImage[];
  basePrice: number;
  category: Category;
  variants: {
    id: string;
    price: number;
    stock: number;
    sku: string;
    color: Color;
    size: Size;
  }[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  price: number;
  stock: number;
  sku: string;
  color: Color;
  size: Size;
  image: string;
}
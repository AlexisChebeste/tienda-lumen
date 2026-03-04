import { CatalogProduct } from "./catalog.types";

export interface ProductData {
    data: CatalogProduct[];
    total: number;
    page: number;
    limit: number;
}
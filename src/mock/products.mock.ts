import { Product } from "@/domain/products";

export const products : Product[] = [
  {
    id: "1",
    name: "Camiseta básica",
    slug: "camiseta-basica",
    description: "Camiseta de algodón suave y cómoda, perfecta para el uso diario.",
    categoryId: "cat1",
    basePrice: 29.99,
    createdAt: "2024-01-01T00:00:00Z",
  },
    {
    id: "2",
    name: "Hoodie",
    slug: "hoodie",
    description: "Hoodie de algodón suave y cómodo, perfecto para el uso diario.",
    categoryId: "cat2",
    basePrice: 49.99,
    createdAt: "2024-01-02T00:00:00Z",
  },
    {
    id: "3",
    name: "Sueter",
    slug: "sueter",
    description: "Sueter de lana suave y cálido, ideal para los días fríos.",
    categoryId: "cat3",
    basePrice: 39.99,
    createdAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    name: "Camiseta de algodón",
    slug: "camiseta-de-algodon",
    description: "Camiseta de algodón suave y cómoda, perfecta para el uso diario.",
    categoryId: "cat1",
    basePrice: 29.99,
    createdAt: "2024-01-04T00:00:00Z",
  }
];
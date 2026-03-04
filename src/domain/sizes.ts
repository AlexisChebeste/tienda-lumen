export interface Size {
  id: string;
  name: string;
  order: number;
}

export const sizes: Size[] = [
  { id: "size1", name: "XS", order: 1 },
  { id: "size2", name: "S", order: 2 },
    { id: "size3", name: "M", order: 3 },
    { id: "size4", name: "L", order: 4 },
    { id: "size5", name: "XL", order: 5 },
];
export type Order = {
  id: string;
  name: string;
  phone: string;
  orderDate: string;
  pickupDate: string;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity?: number;
};

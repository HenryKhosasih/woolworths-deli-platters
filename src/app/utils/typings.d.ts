export type Order = {
  id: string;
  name: string;
  phone: string;
  pickupDate: number;
  pickupTime: string;
  products: Product[];
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
};

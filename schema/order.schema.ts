import { Product } from "./product.schema";

export type Order = {
  kodeBarang: string;
  qty: number;
  price: number;
  Barang: Product;
};

import { Product } from "./product.schema";
export type OrderStatus = "PRE-ORDER" | "ORDER" | "ON-VERIFICATION" | "ON-PACKING";
// export type ShippingMethod = "TAKE_AWAY" | "DELIVERED" | "COD";
// export type PaymentMethod = "VOUCHER" | "TRANSFER" | "CASH";
export const paymentMethod = {
  VOUCHER: "Saldo Voucher",
  TRANSFER: "Transfer Bank",
  CASH: "Tunai",
} as const;
export type PaymentMethod = keyof typeof paymentMethod;

export const shippingMethod = {
  TAKE_AWAY: "Ambil Langsung",
  DELIVERED: "Diantar",
  COD: "Pengambilan dititik kesepakatan",
} as const;
export type ShippingMethod = keyof typeof shippingMethod;

export type Order = {
  id: number;
  orderDate: Date;
  orderStatus: OrderStatus;
  orderAmount: number;
  shippingMethod?: ShippingMethod;
  paymentMethod?: PaymentMethod;
  OrderDetail: OrderDetail[];
};
export type OrderDetail = {
  kodeBarang: string;
  qty: number;
  price: number;
  Barang: Product;
};

export const orderInitialValue: Order = {
  id: Math.floor(Math.random() * 999),
  orderDate: new Date(),
  orderStatus: "PRE-ORDER",
  orderAmount: 0,
  OrderDetail: [],
};

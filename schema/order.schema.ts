import { Product } from "./product.schema";
export type TransactionType = "Belanja" | "Voucher" | "Pinjaman" | "Simpanan";
// export type OrderStatus = "PRE-ORDER" | "ON-VERIFICATION" | "ON-PROCESS" | "ON-DELIVERY" | "DELIVERED" | "FAIL";
// export type ShippingMethod = "TAKE_AWAY" | "DELIVERED" | "COD";
// export type PaymentMethod = "VOUCHER" | "TRANSFER" | "CASH";
export const orderStatus = {
  PRE_ORDER: "Keranjang Belanja",
  ON_VERIFICATION: "Menunggu Konfirmasi",
  ON_PROCESS: "Sedang diproses",
  ON_DELIVERY: "Dalam perjalanan",
  DELIVERED: "Sampai ditujuan",
  FAIL: "Tidak berhasil",
} as const;
export type OrderStatus = keyof typeof orderStatus;

export const paymentMethod = {
  VOUCHER: "Saldo Voucher",
  CASH: "Tunai",
  CREDIT: "Kredit",
  TRANSFER: "Transfer Bank",
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
  invoiceNo?: string;
  transactionType: TransactionType;
  transactionDate: Date;
  orderStatus: OrderStatus;
  amount: number;
  remark: string;
  notes: string;
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
  transactionDate: new Date(),
  transactionType: "Belanja",
  orderStatus: "PRE_ORDER",
  remark: "Pembelian waserda",
  notes: "",
  amount: 0,
  OrderDetail: [],
};


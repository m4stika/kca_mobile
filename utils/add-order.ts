import { Order, OrderDetail } from "@/schema/order.schema";
import { Product } from "@/schema/product.schema";
import { Dispatch, SetStateAction } from "react";

export const addToOrder = (
  setOrder: Dispatch<SetStateAction<Order>>,
  order: Order,
  product: Product,
  qty: number = 1
) => {
  const item: OrderDetail = {
    kodeBarang: product.kodeBarang,
    qty,
    price: Number(product.hargaJual),
    Barang: product,
  };

  const itemIndex = order.OrderDetail.findIndex((item) => item.kodeBarang === product.kodeBarang);
  if (itemIndex >= 0) {
    const { OrderDetail } = order;
    OrderDetail[itemIndex].qty += qty;
    const amount = order.amount + Number(product.hargaJual * qty);
    setOrder((oldValue) => ({
      ...oldValue,
      amount,
      OrderDetail,
    }));

    return;
  }

  setOrder(
    (oldValue) =>
      oldValue && {
        ...oldValue,
        amount: oldValue.amount + item.price * qty,
        OrderDetail: [...oldValue.OrderDetail, item],
      }
  );
};

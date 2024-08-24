import { ImageSourcePropType } from "react-native";

export type Product = {
  kodeBarang: string;
  linkSource?: string;
  barcode?: string;
  namaJenis?: string;
  namaBarang: string;
  satuan?: string;
  stok: number;
  hargaJual: number;
  imageSource?: ImageSourcePropType;
};

export type Promotion = {
  id: number,
  source: string,
  active: boolean
}

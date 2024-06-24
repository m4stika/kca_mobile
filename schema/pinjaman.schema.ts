export type Pinjaman = {
  refCode: string;
  noAnggota: string;
  tglPinjam: Date;
  isPinjamanUang: boolean;
  bulan: number;
  tahun: number;
  nilaiPinjaman: number;
  jangkaWaktu: number;
  jenisBunga: string;
  persenBunga: number;
  biayaAdmin: number;
  tanggalLunas: Date;
  lunas: string;
  RincianPinjaman: RincianPinjaman[];
};

export type RincianPinjaman = {
  refCode: string;
  angKe: number;
  bulan: number;
  tahun: number;
  rpPinjaman: number;
  rpBunga: number;
  rpBayar: number;
  blnLunas: number;
  thnLunas: number;
  tglLunas: Date;
  lunas: String;
  keterangan: String;
};

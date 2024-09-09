import { Pinjaman, RincianPinjaman } from "@/schema/pinjaman.schema"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card"
import LabelWithValue from "./label-with-value"
import { formatCurrency2 } from "@/utils/format-currency"
import { ThemedText } from "./ThemedText"
import { useCallback } from "react"
import { FlatList, TouchableOpacity, View } from "react-native"
import { TabBarIcon } from "./navigation/TabBarIcon"
import { router } from "expo-router"

const TransactionLoanDetail = ({ pinjaman }: { pinjaman: Pinjaman }) => {
  // const calculateResult = calculateInstallment(principal, interestType === "FIXED" ? Number(data?.fixedRate) || 0 : Number(data?.decliningRate) || 0, parseInt(installmentPeriod || '0'), 500, interestType);
  // const { installments, totalPrincipal, totalInterest, grandTotal } = calculateResult
  // const adminFee = (Number(data?.adminFee) / 100) * principal

  const { RincianPinjaman } = pinjaman
  let totalInterest = 0
  const details: RincianPinjaman[] = RincianPinjaman.map(item => {
    totalInterest += Number(item.rpBunga)
    return {
      ...item,
      rpPinjaman: Number(item.rpPinjaman),
      rpBunga: Number(item.rpBunga)
    }
  })
  const grandTotal = pinjaman.nilaiPinjaman + totalInterest


  const Header = () => (
    <View>
      <Card className='p-4'>
        <CardHeader className='border-b'>
          <TouchableOpacity onPress={() => router.navigate('/transaction')}>
            <View className="flex flex-row gap-4 items-center">
              <TabBarIcon name="chevron-back" />
              <ThemedText className="font-pmedium text-lg">{"Informasi Angsuran"}</ThemedText>
            </View>
          </TouchableOpacity>
          {/* <CardTitle>Informasi Angsuran</CardTitle> */}
        </CardHeader>
        <CardContent className=''>
          <LabelWithValue value={`Rp. ${formatCurrency2(Number(RincianPinjaman[0].rpPinjaman), { precision: 0 })}`} title='Pokok' valueClassName='text-xl' titleClassName='text-xl' />
          <LabelWithValue value={`Rp. ${formatCurrency2(Number(RincianPinjaman[0].rpBunga), { precision: 0 })}`} title='Bunga' valueClassName='text-xl' titleClassName='text-xl' className='pb-2' />
          <LabelWithValue value={`Rp. ${formatCurrency2(Number(RincianPinjaman[0].rpPinjaman) + Number(RincianPinjaman[0].rpBunga), { precision: 0 })}`} title='Total' valueClassName='text-xl' titleClassName='text-xl' className='pt-2 border-t' />
          <LabelWithValue value={`Rp. ${formatCurrency2(pinjaman.biayaAdmin, { precision: 0 })}`} title='Biaya Admin' valueClassName='text-sm text-primary' titleClassName='text-sm text-primary' className='pt-2' />
        </CardContent>
        {/* <CardFooter className='pr-0 items-center'> */}
        {/*   <View className="border-b" /> */}
        {/* </CardFooter> */}
      </Card>

      <View className='flex flex-row items-center justify-between p-2 border-y'>
        <ThemedText className='text-center basis-2/12'>Bulan</ThemedText>
        <ThemedText className='text-right basis-3/12'>Pokok</ThemedText>
        <ThemedText className='text-right basis-3/12'>Bunga</ThemedText>
        <ThemedText className='text-right basis-4/12 pr-2'>Total</ThemedText>
      </View>
    </View>
  )

  const Footer = () => (
    <View className='flex flex-row items-center justify-between p-2 border-y mb-4'>
      <ThemedText className="text-right font-medium basis-5/12">{formatCurrency2(pinjaman.nilaiPinjaman, { precision: 0 })}</ThemedText>
      <ThemedText className="text-right font-medium basis-3/12">{formatCurrency2(totalInterest, { precision: 0 })}</ThemedText>
      <ThemedText className="text-right font-medium basis-4/12">{formatCurrency2(grandTotal, { precision: 0 })}</ThemedText>
    </View>
  )
  // render
  const renderItem = useCallback(
    ({ item }: { item: RincianPinjaman }) => (
      <View className='flex flex-row items-center justify-between px-2'>
        <ThemedText className="text-center basis-2/12">{item.angKe}</ThemedText>
        <ThemedText className="text-right basis-3/12">{formatCurrency2(item.rpPinjaman, { precision: 0 })}</ThemedText>
        <ThemedText className="text-right basis-3/12">{formatCurrency2(item.rpBunga, { precision: 0 })}</ThemedText>
        <ThemedText className="text-right basis-4/12">{formatCurrency2(item.rpPinjaman + item.rpBunga, { precision: 0 })}</ThemedText>
      </View >
    ),
    []
  );

  return (

    <View className="">
      <FlatList
        data={details}
        ListHeaderComponent={<Header />}
        ListFooterComponent={<Footer />}
        keyExtractor={i => i.angKe.toString()}
        renderItem={renderItem}
      />
    </View>
  )
}
export default TransactionLoanDetail

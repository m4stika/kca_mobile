import { ThemedText } from './ThemedText'
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { NumberFormat } from './number-format';
import Button from './Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import LabelWithValue from './label-with-value';
import { formatCurrency2 } from '@/utils/format-currency';
import CustomBottomSheet from './custom-bottom-sheet';
import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Alert, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/global-provider';
import useDataApi from '@/hooks/useDataApi';
import { api } from '@/utils/fetching';
import { Pinjaman } from '@/schema/pinjaman.schema';
import { formatDate } from '@/utils/date-formater';
import { CalculateInstallmentProps, Installment, InterestType, calculateInstallment } from '@/utils/calculate-installment';

const LoanSimulation = () => {
  const [value, setValue] = React.useState<string>();
  const [principal, setPrincipal] = React.useState<number>(0);
  // const [interestRate, setInterestRate] = React.useState<number>(InterestRate.FIXED);
  const [installmentPeriod, setInstallmentPeriod] = React.useState<string>();
  // const [period, setPeriod] = React.useState<InterestPeriod>('monthly');
  const [interestType, setInterestType] = React.useState<InterestType>('FIXED');
  const [errorSubmit, setErrorSubmit] = React.useState<string>()
  const { theme, member } = useGlobalContext()

  const { data } = useDataApi<{ fixedRate: number, decliningRate: number, adminFee: number }>({
    queryKey: ["defaultRate"],
    url: `pinjaman/defaultInterestRate`,
  });

  const { dismiss } = useBottomSheetModal();
  const isValid = value && data && installmentPeriod

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const onLoanSubmit = async (dataApi: CalculateInstallmentProps) => {
    type RincianPinjamanApi = { angKe: number, rpPinjaman: number, rpBunga: number }
    type PinjamanApi = Omit<Pinjaman, "refCode" | "tglPinjam" | "RincianPinjaman"> & { tglPinjam: string, RincianPinjaman: RincianPinjamanApi[] }

    const pinjamanDetail = dataApi.installments.map((item): RincianPinjamanApi => {
      return {
        angKe: item.month,
        rpPinjaman: item.principalInstallment,
        rpBunga: item.interest,
      }
    })
    const pinjamanApi: PinjamanApi = {
      noAnggota: member?.noAnggota!,
      nilaiPinjaman: principal,
      tglPinjam: formatDate(new (Date), false, true),
      isPinjamanUang: true,
      tahun: new Date().getFullYear(),
      bulan: new Date().getMonth() + 1,
      jangkaWaktu: parseInt(installmentPeriod!),
      jenisBunga: interestType === "FIXED" ? "Menetap" : "Menurun",
      persenBunga: interestType === "FIXED" ? data?.fixedRate! : data?.decliningRate!,
      biayaAdmin: (Number(data?.adminFee) / 100) * principal,
      lunas: "N",
      verificationStatus: "ON_VERIFICATION",
      RincianPinjaman: pinjamanDetail
    }
    // console.log('pinjamanApi', pinjamanApi)
    const response = await api.post<PinjamanApi, unknown>({
      url: `pinjaman`,
      data: pinjamanApi
    });

    if (response.status === "error") {
      setErrorSubmit(response.message)
      // alert(response.message);
    }
    else {
      if (response.data) {
        Alert.alert('Pengajuan Pinjaman', "Process completed..", [{ text: "OK" }])
        dismiss()
        router.navigate('/home')
      }
    }
  };

  // render
  const renderItem = React.useCallback(
    ({ item }: { item: Installment }) => (
      <View className='flex flex-row items-center justify-between px-2'>
        <ThemedText className="text-center basis-2/12">{item.month}</ThemedText>
        <ThemedText className="text-right basis-3/12">{formatCurrency2(item.principalInstallment, { precision: 0 })}</ThemedText>
        <ThemedText className="text-right basis-3/12">{formatCurrency2(item.interest, { precision: 0 })}</ThemedText>
        <ThemedText className="text-right basis-4/12">{formatCurrency2(item.totalInstallment, { precision: 0 })}</ThemedText>
      </View >
    ),
    []
  );

  const SimulationInfo = () => {
    const calculateResult = calculateInstallment(principal, interestType === "FIXED" ? Number(data?.fixedRate) || 0 : Number(data?.decliningRate) || 0, parseInt(installmentPeriod || '0'), 500, interestType);
    const { installments, totalPrincipal, totalInterest, grandTotal } = calculateResult
    const adminFee = (Number(data?.adminFee) / 100) * principal

    const Header = () => (
      <View>
        <Card className='p-4'>
          <CardHeader className='border-b'>
            <CardTitle>Informasi Angsuran</CardTitle>
          </CardHeader>
          <CardContent className=''>
            <LabelWithValue value={`Rp. ${formatCurrency2(installments[0].principalInstallment, { precision: 0 })}`} title='Pokok' valueClassName='text-xl' titleClassName='text-xl' />
            <LabelWithValue value={`Rp. ${formatCurrency2(installments[0].interest, { precision: 0 })}`} title='Bunga' valueClassName='text-xl' titleClassName='text-xl' className='pb-2' />
            <LabelWithValue value={`Rp. ${formatCurrency2(installments[0].totalInstallment, { precision: 0 })}`} title='Total' valueClassName='text-xl' titleClassName='text-xl' className='pt-2 border-t' />
            <LabelWithValue value={`Rp. ${formatCurrency2(adminFee, { precision: 0 })}`} title='Biaya Admin' valueClassName='text-sm text-primary' titleClassName='text-sm text-primary' className='pt-2' />
          </CardContent>
          <CardFooter className='pr-0 items-center'>
            <Button
              title="Ajukan Pinjaman"
              containerClassName="w-full bg-info"
              textClassName="text-xl"
              onPress={() => onLoanSubmit(calculateResult)}
            />
            {errorSubmit && <ThemedText type='subtitle' className='text-error text-center'>{errorSubmit}</ThemedText>}
          </CardFooter>
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
      <View className='flex flex-row items-center justify-between p-2 border-y'>
        <ThemedText className="text-right font-medium basis-5/12">{formatCurrency2(totalPrincipal, { precision: 0 })}</ThemedText>
        <ThemedText className="text-right font-medium basis-3/12">{formatCurrency2(totalInterest, { precision: 0 })}</ThemedText>
        <ThemedText className="text-right font-medium basis-4/12">{formatCurrency2(grandTotal, { precision: 0 })}</ThemedText>
      </View>
    )

    return (
      <FlatList
        data={installments}
        ListHeaderComponent={<Header />}
        ListFooterComponent={<Footer />}
        keyExtractor={i => i.month.toString()}
        renderItem={renderItem}
      />
    )
  }


  return (
    <View className='gap-4 px-4 py-4'>
      <NumberFormat
        title="Nilai Pinjaman"
        value={value}
        prefix='Rp. '
        onValueChange={(format) => setPrincipal(format.floatValue || 0)}
        handleChange={setValue}
      />
      <View className='gap-2'>
        <ThemedText>Perhitungan bunga pinjaman</ThemedText>
        <View className='border rounded-xl'>
          <Picker
            mode='dropdown'
            selectedValue={interestType}
            onValueChange={(value) => {
              setInterestType(value)
              // setInterestRate(InterestRate[value])
            }}
            style={{ color: theme.colors.text }}
          >
            <Picker.Item label="Bunga Menetap" value="FIXED" />
            <Picker.Item label="Bunga Menurun" value="DECLINING" />
          </Picker>
        </View>
      </View>
      <View className='gap-2'>
        <ThemedText>Bunga</ThemedText>
        <View className='flex flex-row gap-2 items-center'>
          <ThemedText type='subtitle' className='p-4 border rounded-lg'>{`${interestType === "FIXED" ? data?.fixedRate : data?.decliningRate} %`}</ThemedText>
          <ThemedText type='subtitle'>per bulan </ThemedText>
        </View>
      </View>
      <View className='flex flex-row items-center gap-2 '>
        <NumberFormat
          title="Jangka Waktu (bulan)"
          value={installmentPeriod}
          handleChange={setInstallmentPeriod}
          className='basis-2/3'
        />
        <ThemedText type='subtitle' className='pt-6 basis-1/3'>{"Bulan"}</ThemedText>
      </View>
      <View className='flex flex-col gap-2 mt-4'>
        <Button
          title="Simulasi"
          containerClassName="w-full bg-info"
          textClassName="text-xl"
          onPress={handlePresentModalPress}
          // onPress={() => <SimulationInfo />}
          disabled={!isValid}
        />
      </View>
      <CustomBottomSheet
        title={"Informasi Angsuran"}
        ref={bottomSheetRef}
        snapPointItems={["80%"]}
        content={<SimulationInfo />}
      />
    </View>
  )
}

export default LoanSimulation

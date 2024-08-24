import { ThemedText } from './ThemedText'
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { NumberFormat } from './number-format';
import Button from './Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './card';
import LabelWithValue from './label-with-value';
import { formatCurrency2 } from '@/utils/format-currency';
import CustomBottomSheet from './custom-bottom-sheet';
import { BottomSheetFlatList, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { Alert, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/global-provider';


type InterestType = 'fixed' | 'declining';
type InterestPeriod = 'monthly' | 'annual';
type Installment = { month: number, principalInstallment: number, interest: number, totalInstallment: number }
type ResponseProps =
  {
    installments: Installment[],
    totalPrincipal: number,
    totalInterest: number,
    grandTotal: number
  }

function calculateInstallment1(
  principal: number,
  interestRate: number,
  months: number,
  rounding: number,
  interestType: InterestType,
  interestPeriod: InterestPeriod
): Installment[] {

  // Jika interestPeriod adalah tahunan, konversikan ke bulanan dengan membagi 12
  const monthlyInterestRate = interestPeriod === 'annual'
    ? (interestRate / 12) / 100
    : interestRate / 100;

  let balance = principal;
  const installmentPlan = [];
  let principalInstallment: number;
  let interest: number = 0;

  for (let i = 1; i <= months; i++) {
    // Perhitungan pokok angsuran bulanan tetap untuk kedua jenis bunga
    principalInstallment = Math.ceil((principal / months) / rounding) * rounding;

    // Perhitungan bunga berdasarkan jenis bunga
    if (interestType === 'fixed') {
      // Bunga tetap: berdasarkan pokok awal
      interest = Math.ceil((principal * monthlyInterestRate) / rounding) * rounding;
    } else if (interestType === 'declining') {
      // Bunga menurun: berdasarkan sisa saldo
      interest = Math.ceil((balance * monthlyInterestRate) / rounding) * rounding;
    }

    const totalInstallment = principalInstallment + interest;

    installmentPlan.push({
      month: i,
      principalInstallment,
      interest,
      totalInstallment,
    });

    // Kurangi saldo dengan angsuran pokok hanya jika bunga menurun
    if (interestType === 'declining') {
      balance -= principalInstallment;
    }
  }

  return installmentPlan;
}

function calculateInstallment(
  principal: number,
  interestRate: number,
  months: number,
  rounding: number,
  interestType: InterestType,
  interestPeriod: InterestPeriod
): ResponseProps {
  const monthlyInterestRate = interestPeriod === 'annual'
    ? (interestRate / 12) / 100
    : interestRate / 100;

  let balance = principal;
  const installmentPlan = [];
  let totalPrincipalInstallment = 0;
  let totalPrincipal = 0;
  let totalInterest = 0;
  let interest: number = 0;

  const basePrincipalInstallment = Math.ceil((principal / months) / rounding) * rounding;

  for (let i = 1; i < months; i++) {
    totalPrincipalInstallment += basePrincipalInstallment;

    if (interestType === 'fixed') {
      interest = Math.ceil((principal * monthlyInterestRate) / rounding) * rounding;
    } else {
      interest = Math.ceil((balance * monthlyInterestRate) / rounding) * rounding;
    }

    installmentPlan.push({
      month: i,
      principalInstallment: basePrincipalInstallment,
      interest,
      totalInstallment: basePrincipalInstallment + interest,
    });

    totalPrincipal += basePrincipalInstallment;
    totalInterest += interest;

    if (interestType === 'declining') {
      balance -= basePrincipalInstallment;
    }
  }

  const lastPrincipalInstallment = principal - totalPrincipalInstallment;
  if (interestType === 'fixed') {
    interest = Math.ceil((principal * monthlyInterestRate) / rounding) * rounding;
  } else {
    interest = Math.ceil((balance * monthlyInterestRate) / rounding) * rounding;
  }

  installmentPlan.push({
    month: months,
    principalInstallment: lastPrincipalInstallment,
    interest,
    totalInstallment: lastPrincipalInstallment + interest,
  });

  totalPrincipal += lastPrincipalInstallment;
  totalInterest += interest;

  const grandTotal = totalPrincipal + totalInterest;

  return {
    installments: installmentPlan,
    totalPrincipal,
    totalInterest,
    grandTotal
  };
}

const LoanSimulation = () => {
  const [value, setValue] = React.useState<string>();
  const [numberValue, setNumberValue] = React.useState<number>(0);
  const [bunga, setBunga] = React.useState<string>();
  const [lama, setLama] = React.useState<string>();
  const [period, setPeriod] = React.useState<InterestPeriod>('monthly');
  const [typeAngsuran, setTypeAngsuran] = React.useState<InterestType>('fixed');
  const { theme } = useGlobalContext()

  const { dismiss } = useBottomSheetModal();
  const isValid = value && bunga && lama

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const onLoanSubmit = async () => {
    Alert.alert('Pengajuan Pinjaman', "Process completed..", [{ text: "OK" }])
    dismiss()
    router.navigate('/home')
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
    const calculateResult = calculateInstallment(numberValue, parseFloat(bunga || '0'), parseInt(lama || '0'), 500, typeAngsuran, period);
    const { installments, totalPrincipal, totalInterest, grandTotal } = calculateResult

    const Header = () => (
      <View>
        <Card className='p-4'>
          <CardHeader className='border-b'>
            <CardTitle>Informasi Angsuran</CardTitle>
          </CardHeader>
          <CardContent className=''>
            <LabelWithValue value={formatCurrency2(installments[0].principalInstallment, { precision: 0 })} title='Pokok' valueClassName='text-xl' titleClassName='text-xl' />
            <LabelWithValue value={formatCurrency2(installments[0].interest, { precision: 0 })} title='Bunga' valueClassName='text-xl' titleClassName='text-xl' className='pb-2' />
            <LabelWithValue value={formatCurrency2(installments[0].totalInstallment, { precision: 0 })} title='Total' valueClassName='text-xl' titleClassName='text-xl' className='pt-2 border-t' />
          </CardContent>
          <CardFooter className='pr-0 '>
            <Button
              title="Ajukan Pinjaman"
              containerClassName="w-full bg-info"
              textClassName="text-xl"
              onPress={onLoanSubmit}
            />
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
        onValueChange={(format) => setNumberValue(format.floatValue || 0)}
        handleChange={setValue}
      />
      <View className='flex flex-row gap-2 pr-2 '>
        <View className='flex flex-row items-center gap-2 basis-1/3'>
          <NumberFormat
            title="Bunga Pinjaman"
            value={bunga}
            decimalScale={2}
            // onValueChange={(format) => setNumberValue(format.floatValue || 0)}
            handleChange={setBunga}
          />
          <ThemedText type='title' className='pt-6'>%</ThemedText>
        </View>
        <View className='flex-1 pt-8 ml-8 '>
          <View className='border rounded-xl'>
            <Picker
              mode='dropdown'
              selectedValue={period}
              onValueChange={setPeriod}
              style={{ color: theme.colors.text }}
            // itemStyle={{ color: "white" }}
            >
              <Picker.Item label="per Bulan" value="monthly" />
              <Picker.Item label="per Tahun" value="annual" />
            </Picker>
          </View>
        </View>
      </View>
      <View className='flex flex-row items-center gap-2 '>
        <NumberFormat
          title="Jangka Waktu (bulan)"
          value={lama}
          handleChange={setLama}
          className='basis-2/3'
        />
        <ThemedText type='subtitle' className='pt-6 basis-1/3'>{"Bulan"}</ThemedText>
      </View>
      <View className='gap-2'>
        <ThemedText>Perhitungan bunga pinjaman</ThemedText>
        <View className='border rounded-xl'>
          <Picker
            mode='dropdown'
            selectedValue={typeAngsuran}
            onValueChange={setTypeAngsuran}
            style={{ color: theme.colors.text }}
          >
            <Picker.Item label="Bunga Menetap" value="fixed" />
            <Picker.Item label="Bunga Menurun" value="declining" />
          </Picker>
        </View>
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

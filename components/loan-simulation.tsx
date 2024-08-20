import { View } from 'react-native'
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
import { ScrollView } from 'react-native-gesture-handler';


type InterestType = 'fixed' | 'declining';
type InterestPeriod = 'monthly' | 'annual';

const LoanSimulation = () => {
  const [value, setValue] = React.useState<string>();
  const [numberValue, setNumberValue] = React.useState<number>(0);
  const [bunga, setBunga] = React.useState<string>();
  const [lama, setLama] = React.useState<string>();
  const [period, setPeriod] = React.useState<InterestPeriod>('monthly');
  const [typeAngsuran, setTypeAngsuran] = React.useState<InterestType>('fixed');

  const { dismiss } = useBottomSheetModal();
  const isValid = value && bunga && lama

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const onLoanSubmit = async () => {
    dismiss()
  };

  const calculate = () => {
    if (!isValid) return

    const pokok = Math.round((numberValue / parseInt(lama)) / 1000) * 1000
    const bungaRp = 2000
    const total = pokok + bungaRp

    return { pokok, bungaRp, total }
  }

  function calculateInstallment(
    principal: number,
    interestRate: number,
    months: number,
    rounding: number,
    interestType: InterestType,
    interestPeriod: InterestPeriod
  ): { month: number, principalInstallment: number, interest: number, totalInstallment: number }[] {

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
        interest = Math.round((principal * monthlyInterestRate) / rounding) * rounding;
      } else if (interestType === 'declining') {
        // Bunga menurun: berdasarkan sisa saldo
        interest = Math.round((balance * monthlyInterestRate) / rounding) * rounding;
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

  const SimulationInfo = () => {
    const result = calculate()
    if (!result) return


    const installments = calculateInstallment(numberValue, parseFloat(bunga || '0'), parseInt(lama || '0'), 1000, typeAngsuran, period);
    const { pokok, bungaRp, total } = result

    return (
      <View

        className="h-full flex flex-col gap-2 pb-4 bg-background"
      >
        <ScrollView>
          <View>
            <ThemedText>
              {JSON.stringify(installments, null, 3)}
            </ThemedText>
          </View>
        </ScrollView>
        {/* <Card className='p-4'> */}
        {/*   <CardHeader className='border-b'> */}
        {/*     <CardTitle>Nilai Angsuran</CardTitle> */}
        {/*   </CardHeader> */}
        {/*   <CardContent className=''> */}
        {/*     <ThemedText> */}
        {/*       {JSON.stringify(installments, null, 3)} */}
        {/*     </ThemedText> */}
        {/*     <LabelWithValue value={formatCurrency2(pokok, { precision: 0 })} title='Pokok' valueClassName='text-xl' titleClassName='text-xl' /> */}
        {/*     <LabelWithValue value={formatCurrency2(bungaRp, { precision: 0 })} title='Bunga' valueClassName='text-xl' titleClassName='text-xl' className='pb-2' /> */}
        {/*     <LabelWithValue value={formatCurrency2(total, { precision: 0 })} title='Total' valueClassName='text-xl' titleClassName='text-xl' className='pt-2 border-t' /> */}
        {/*   </CardContent> */}
        {/*   <CardFooter className='pr-0 '> */}
        {/*     <Button */}
        {/*       title="Ajukan Pinjaman" */}
        {/*       containerClassName="w-full bg-info" */}
        {/*       textClassName="text-xl" */}
        {/*       onPress={onLoanSubmit} */}
        {/*     /> */}
        {/*   </CardFooter> */}
        {/* </Card> */}
      </View>
    )
  }

  return (
    <ScrollView>
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
          snapPointItems={["90%"]}
          content={<SimulationInfo />}
        />
      </View>
    </ScrollView>
  )
}

export default LoanSimulation

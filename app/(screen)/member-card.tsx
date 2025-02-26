import { View, Text, Image } from 'react-native'
import React from 'react'
import MemberCardHeader from '@/components/member-card-header'
import { LinearGradient } from 'expo-linear-gradient'
import { CardImage } from "@/assets/svgs";
import { ThemedText } from '@/components/ThemedText';
import { koperasi } from "@/assets/images";
import { useGlobalContext } from '@/context/global-provider';
import QRCode from 'react-native-qrcode-svg';
import { Card } from '@/components/card';

export default function MemberCard() {
  const { member } = useGlobalContext();
  // const qrData = [
  //   { data: member?.noAnggota!, mode: 'alphanumeric' },
  //   { data: member?.namaAnggota!, mode: 'alphanumeric' },
  //   { data: member?.saldoVoucher.toString()!, mode: 'numeric' }
  // ]

  return (
    <View className='p-4 gap-4 border'>
      <MemberCardHeader />
      {/* <View */}
      {/*   className='relative overflow-hidden flex h-[190px] w-full max-w-[320px] justify-between rounded-3xl shadow-lg' */}
      {/* > */}
      <Card
        // className='relative overflow-hidden rounded-3xl'
        className='relative overflow-hidden flex w-full  justify-between rounded-3xl backdrop-blur-[12px]'
      >
        <LinearGradient
          colors={['#06b6d4', '#0ea5e9']}
          locations={[0.2, 0.8]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <View className='absolute top-2 left-2 flex flex-col gap-4'>
            <View className='flex flex-row items-center gap-4'>
              <View className=''>
                <Image source={koperasi} className=" w-14 h-14" resizeMode="cover" />
              </View>
              <View className='flax flex-col gap-0 p-0'>
                <ThemedText className='text-amber-200 p-0 text-base font-psemibold'>KARTU ANGGOTA</ThemedText>
                <ThemedText className='font-pregular text-background text-base font-semibold'>Koperasi Cahaya Abadi</ThemedText>
              </View>
            </View>
          </View>
          <CardImage width={316} height={190} className='absolute' opacity={0.7} />
          <View className='absolute top-[30%]  right-[10%]  mt-6'>
            <ThemedText type='subtitle' className='text-background border-b'>{member?.namaAnggota}</ThemedText>
            <ThemedText type='default' className='text-shadow text-background'>{member?.nip}</ThemedText>
            {/* <View className='border-b-2 text-white w-full'></View> */}
          </View>
          <View className='absolute bottom-4 left-4'>
            <QRCode
              // color='white'
              backgroundColor='#06b6d4'
              value={member?.noAnggota}
              size={60}
            />
          </View>
        </LinearGradient>
      </Card>
      {/* </View> */}
    </View>
  )
}

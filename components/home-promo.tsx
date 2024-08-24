import React from 'react'
import { Image } from 'react-native'
import { Promotion } from '@/schema/product.schema'

const PromoCard = ({ data }: { data: Promotion }) => {
  return (
    <Image
      source={{ uri: `${process.env.EXPO_PUBLIC_ASSETS_URL}/assets/${data.source}` }}
      className="h-48 w-80 rounded-xl border overflow-hidden"
    // resizeMode="contain"
    />
    // <Card className="min-w-80 min-h-48 p-0">
    //   <CardContent className='py-0 rounded-lg'>
    //   </CardContent>
    // </Card>
  )
}

export default PromoCard

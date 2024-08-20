import LoanHeader from '@/components/loan-header'
import LoanSimulation from '@/components/loan-simulation'
import { View, Text } from 'react-native'

const Loan = () => {
  return (
    <View>
      <LoanHeader />
      <LoanSimulation />
    </View>
  )
}

export default Loan

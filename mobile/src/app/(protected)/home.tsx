import { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { DrawerToggleButton } from '@react-navigation/drawer'
import Feather from '@expo/vector-icons/Feather'
import colors from 'tailwindcss/colors'

import { TransactionList } from '../../components/transcation-list'
import { api } from '../../services/api'
import { ITransactionProps } from '../../components/transaction'

const Home = () => {
  const [transactions, setTransactions] = useState<ITransactionProps[]>([])
  const get_transactions = useCallback(async () => {
    const { data } = await api.get('/transactions')
    setTransactions(data)
  }, [])

  useEffect(() => {
    get_transactions()
  }, [get_transactions])

  return (
    <ScrollView className="relative flex-1 bg-gray-900">
      <View className="absolute right-4 top-3 z-10 mb-3 mt-8">
        <DrawerToggleButton
          tintColor={colors.gray[100]}
          pressColor={colors.gray[300]}
        />
      </View>
      <View className="mx-10 mt-20 gap-8 bg-gray-800 p-6">
        <View className="flex-row items-center gap-2">
          <Feather name="file-text" color={colors.gray[100]} size={30} />
          <Text className="text-lg text-gray-100">Resumo diário</Text>
        </View>
        <TransactionList transactions={transactions} />
      </View>
    </ScrollView>
  )
}

export default Home

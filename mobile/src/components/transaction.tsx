import { Text, View } from 'react-native'

export interface ITransactionProps {
  id: string
  user_id: string
  description: string
  value: number
  recurrence: string | null
  installments: string | null
  is_subscription: string | null
  due_date: string | null
  resolved: boolean
  created_at: string
}

interface ITransaction {
  transaction: ITransactionProps
}

export const Transaction = ({ transaction }: ITransaction) => {
  return (
    <View className="flex-col gap-8">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl text-white">{transaction.description}</Text>
        <Text className="text-base text-white">{transaction.value}</Text>
      </View>
    </View>
  )
}

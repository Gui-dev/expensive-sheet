import { ScrollView } from 'react-native'
import { ITransactionProps, Transaction } from './transaction'

interface ITransactionList {
  transactions: ITransactionProps[]
}

export const TransactionList = ({ transactions }: ITransactionList) => {
  return (
    <ScrollView>
      {transactions.map((transaction) => {
        return <Transaction key={transaction.id} transaction={transaction} />
      })}
    </ScrollView>
  )
}

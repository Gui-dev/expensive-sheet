import { cookies } from 'next/headers'
import { Transaction } from './transactions'
import { api } from '@/services/api'

export interface ITransactionProps {
  id: string
  user_id: string
  description: string
  value: string
  recurrence: string | null
  installments: string | null
  is_subscription: string | null
  due_date: string | null
  resolved: boolean
  created_at: string
}

export const Dashboard = async () => {
  const cookieStore = cookies()
  const token = cookieStore.get('@xs:token')?.value
  const response = await api.get<ITransactionProps[]>('/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const transactions = response.data

  return (
    <div className="flex max-w-[1280px] flex-1 flex-col bg-gray-800 px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-100">Dashboard</h1>

      <Transaction transactions={transactions} />
    </div>
  )
}

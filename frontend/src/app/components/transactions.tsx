import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/format-currency'
import { ITransactionProps } from './dashboard'

interface ITransaction {
  transactions: ITransactionProps[]
}

export const Transaction = ({ transactions }: ITransaction) => {
  return (
    <section className="relative mt-8 rounded-md bg-gray-900 px-8">
      <h1 className="mt-8 text-base">Resumo diário</h1>

      <Button className="absolute right-0 top-0 rounded-br-none rounded-tl-none">
        <PlusIcon />
      </Button>

      <ul className="mt-8">
        {transactions.map((transaction) => {
          return (
            <div key={transaction.id}>
              <li className="flex items-center justify-between">
                <div>
                  <h3>Conta A</h3>
                  <p>{transaction.description}</p>
                </div>
                <div>
                  <p>-{formatCurrency(Number(transaction.value))}</p>
                  <span>Não paga</span>
                </div>
              </li>
              <Separator className="my-4 bg-gray-600" />
            </div>
          )
        })}
      </ul>
    </section>
  )
}

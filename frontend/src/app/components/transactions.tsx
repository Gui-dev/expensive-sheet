import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/formatCurrency'
import { PlusIcon } from 'lucide-react'

export const Transaction = () => {
  return (
    <section className="relative mt-8 rounded-md bg-gray-900 px-8">
      <h1 className="mt-8 text-base">Resumo diário</h1>

      <Button className="absolute right-0 top-0 rounded-br-none rounded-tl-none">
        <PlusIcon />
      </Button>

      <ul className="mt-8">
        <div>
          <li className="flex items-center justify-between">
            <div>
              <h3>Conta A</h3>
              <p>Categoria x</p>
            </div>
            <div>
              <p>-{formatCurrency(53.29)}</p>
              <span>Não paga</span>
            </div>
          </li>
          <Separator className="my-4 bg-gray-600" />
        </div>
        <div>
          <li className="flex items-center justify-between">
            <div>
              <h3>Conta A</h3>
              <p>Categoria x</p>
            </div>
            <div>
              <p>{formatCurrency(53.29)}</p>
              <span>Não paga</span>
            </div>
          </li>
          <Separator className="my-4 bg-gray-600" />
        </div>
        <div>
          <li className="flex items-center justify-between">
            <div>
              <h3>Conta A</h3>
              <p>Categoria x</p>
            </div>
            <div>
              <p>{formatCurrency(53.29)}</p>
              <span>Não paga</span>
            </div>
          </li>
          <Separator className="my-4 bg-gray-600" />
        </div>
      </ul>
    </section>
  )
}

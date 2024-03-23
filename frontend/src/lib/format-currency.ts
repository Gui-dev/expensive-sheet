export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-Br', {
    currency: 'BRL',
    style: 'currency',
  }).format(value)
}

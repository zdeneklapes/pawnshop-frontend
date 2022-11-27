export interface StatisticsTableFetchingProps {
  id: number
  amount: number
  profit: number
  datetime: string
  description: string
  price: number
  product: number
  username: string
  user: number
  product_name: string
}

export interface StatisticsTableProps {
  statistics?: StatisticsTableFetchingProps[]
}

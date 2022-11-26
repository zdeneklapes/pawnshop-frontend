export interface StatisticsTableFetchingProps {
  id: number
  amount: number
  profit: number
  datetime: string
  description: string
  price: number
  product: string
  username: string
  user: number
}

export interface StatisticsTableProps {
  statistics?: StatisticsTableFetchingProps[]
}

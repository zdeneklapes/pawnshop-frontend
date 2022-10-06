import { ProductFetchingProps } from '@components/globals/globals.types'

interface InterestProps {
  from: string
  to: string
  price: number
}

export interface ProductTableFetchingProps extends ProductFetchingProps {
  id: number
  date_create: string
  date_extend: string
  date_end: string
  interest: InterestProps[]
}

export interface ProductTableProps {
  products?: ProductTableFetchingProps[]
}

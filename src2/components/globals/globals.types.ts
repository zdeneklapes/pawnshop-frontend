export interface CustomerFetchingProps {
  full_name: string
  residence: string
  sex: string
  nationality: string
  personal_id: string
  personal_id_expiration_date: string
  birthplace: string
  id_birth: string
}

export interface ProductFetchingProps {
  user: number
  id: number
  customer: CustomerFetchingProps
  status: string
  interest_rate_or_quantity: number
  inventory_id: number
  product_name: string
  buy_price: number
  sell_price: number
}

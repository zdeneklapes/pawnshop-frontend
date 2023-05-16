export interface DailyStatTableFetchingProps {
  date: string
  loan_create_count: number
  loan_extend_count: number
  loan_return_count: number
  loan_income: number
  loan_outcome: number
  loan_profit: number
  offer_create_count: number
  offer_sell_count: number
  offer_income: number
  offer_outcome: number
  all_income: number
  all_outcome: number
  all_profit: number
}

export interface DailyStatTableProps {
  dailystats?: DailyStatTableFetchingProps[]
}

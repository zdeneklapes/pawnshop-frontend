import { format } from 'date-fns'

export const dateFormatFromDatabase = (date: string, formatDate = 'dd/MM/yyyy'): string => {
  return format(new Date(date), formatDate)
}

export const dateFormatIntoDatabase = (date: string, formatDate = 'yyyy-MM-dd'): string => {
  return format(new Date(date), formatDate)
}

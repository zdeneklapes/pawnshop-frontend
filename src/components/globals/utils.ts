import { format } from 'date-fns'
import jwt_decode from 'jwt-decode'

export const dateFormatFromDatabase = (date: string, formatDate = 'dd/MM/yyyy'): string => {
  return format(new Date(date), formatDate)
}

export const dateFormatIntoDatabase = (date: string, formatDate = 'yyyy-MM-dd'): string => {
  const newDate = date.split('/')
  return format(new Date(Number(newDate[2]), Number(newDate[1]), Number(newDate[0])), formatDate)
}

export const getUserInformation = (accessToken: string | null): { id: string; email: string; role: string } => {
  if (accessToken) {
    const data: any = jwt_decode(accessToken)
    return {
      id: data.user_id,
      email: data.email,
      role: data.role
    }
  }
  return { id: '', email: '', role: '' }
}

export const getUserRole = (role: string): string => {
  return role === 'ADMIN' ? 'Admin' : 'Obsluha'
}

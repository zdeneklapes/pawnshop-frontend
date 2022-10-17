import ky from 'ky'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'

export const apiService = ky.create({
  timeout: false,
  prefixUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('accessToken')}` : ''
  }
})

export const fetchProducts = async (product: string): Promise<ProductTableFetchingProps[]> => {
  try {
    return await apiService.get(`product/?data=${product}`).json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchProduct = async (productId: number): Promise<ProductTableFetchingProps | undefined> => {
  try {
    return await apiService.get(`product/${productId}/`).json()
  } catch (error) {
    console.error(error)
  }
}

export const fetchUsers = async (): Promise<{ email: string; role: string; id: string }[] | undefined> => {
  try {
    return await apiService.get(`authentication/user`).json()
  } catch (error) {
    console.error(error)
  }
}

export const fetchUser = async (userId: number): Promise<{ email: string; role: string; id: string } | undefined> => {
  try {
    return await apiService.get(`authentication/user/${userId}/`).json()
  } catch (error) {
    console.error(error)
  }
}

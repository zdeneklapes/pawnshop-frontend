import ky from 'ky'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'

export const apiService = ky.create({
  timeout: false,
  prefixUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchProducts = async (product: string): Promise<ProductTableFetchingProps[]> => {
  try {
    const authService = apiService.extend({
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    return await authService.get(`product/?data=${product}`).json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export const fetchProduct = async (productId: number): Promise<ProductTableFetchingProps | undefined> => {
  try {
    const authService = apiService.extend({
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    })
    return await authService.get(`product/${productId}/`).json()
  } catch (error) {
    console.error(error)
  }
}

import ky from 'ky'
import { ProductTableFetchingProps } from '@components/medium/ProductTable/ProductTable.types'

export const apiService = ky.create({
  timeout: false,
  prefixUrl: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchProducts = async (product: string): Promise<ProductTableFetchingProps[]> => {
  try {
    return await apiService.get(`product/?status=${product}`).json()
  } catch (error) {
    console.error(error)
    return []
  }
}

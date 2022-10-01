import ky from 'ky'

const apiService = ky.create({
  timeout: false,
  prefixUrl: '',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiService

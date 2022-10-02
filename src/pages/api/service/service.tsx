import ky from 'ky'

const apiService = ky.create({
  timeout: false,
  prefixUrl: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default apiService

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://www.omdbapi.com/?apikey=f79aeba3&',
  timeout: 10000,
})

export default api

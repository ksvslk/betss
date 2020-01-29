import axios from 'axios'

const api = axios.create({
  baseURL: 'http://www.omdbapi.com/?apikey=f79aeba3&',
  timeout: 5000,
})

export default api

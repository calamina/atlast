import axios from 'axios'

export default axios.create({
  // baseURL: 'https://strapi-production-a833.up.railway.app' + '/api',
  baseURL: 'http://localhost:1337' + '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

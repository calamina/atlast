import axios from 'axios'

export default axios.create({
  baseURL: 'http://strapi-production-a833.up.railway.app' + '/api',
  headers: {
    'Content-type': 'application/json'
  }
})

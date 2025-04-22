import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}
const getUserDetails = (token) => {
  return axios.get('/api/users/', {
    headers: { Authorization: `Bearer ${token}` }
  }).then(response => response.data)
}

export default { login, getUserDetails }
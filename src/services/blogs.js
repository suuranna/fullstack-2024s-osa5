import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = async blogObject => {
  const config = { headers: { Authorization: token }, }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

export default { getAll, setToken, addBlog }
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

const updateBlogLikes = async blogObject => {
  const config = { headers: { Authorization: token }, }
  blogObject.likes = blogObject.likes + 1
  const url = baseUrl + '/' + blogObject.id

  const response = await axios.put(url, blogObject, config)
  return response.data
}

const removeBlog = async blogId => {
  const config = { headers: { Authorization: token }, }
  const url = baseUrl + '/' + blogId

  const response = await axios.delete(url, config)
  return response.data
}
export default { getAll, setToken, addBlog, updateBlogLikes, removeBlog }
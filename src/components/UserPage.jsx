import LoggedInHeader from '../components/LoggedInHeader'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserPage = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <LoggedInHeader/>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {user.blogs.map((blog) => 
        <li key={blog.id}>{blog.title}</li>
      )}
    </div>
  )
}

export default UserPage
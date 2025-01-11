import LoggedInHeader from '../components/LoggedInHeader'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikes } from '../reducers/blogsReducer'
import { Link, useParams } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'

const BlogPage = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const dispatch = useDispatch()

  const handleLiking = async (event) => {
    event.preventDefault()
    try {
      await dispatch(updateLikes(blog))
    } catch (exception) {
      dispatch(setNotification({
        text: 'Unable to like a blog, because it might be deleted already',
        type: 'error',
      }))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <LoggedInHeader/>
      <h2>{blog.title} {blog.author}</h2>
      <Link to={blog.url}>{blog.url}</Link> <br/>
      {blog.likes} likes <button className="likeButton" onClick={handleLiking}>like</button> <br/>
      added by {blog.user.name}
    </div>
  )
}

export default BlogPage
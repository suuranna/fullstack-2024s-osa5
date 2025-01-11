import LoggedInHeader from '../components/LoggedInHeader'
import { useDispatch, useSelector } from 'react-redux'
import { updateLikes, addComment } from '../reducers/blogsReducer'
import { Link, useParams } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { useState } from 'react'
import Notification from './Notification'

const BlogPage = () => {
  const [newComment, setNewComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const dispatch = useDispatch()
  //console.log(blog)

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

  const handleAddingComment = async (event) => {
    event.preventDefault()
    //const stuff = await blogService.addComment(id, newComment)
    try {
      await dispatch(addComment(blog.id, newComment))
      dispatch(setNotification({
        text: 'New comment added successfully!',
        type: 'confirm',
      }))
      setNewComment('')
    } catch (exception) {
      dispatch(setNotification({
        text: 'Something went wrong when adding a new comment',
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
      <h3>comments</h3>
      <Notification/>
      <form onSubmit={handleAddingComment}>
        <input 
          type="text"
          name="comment"
          value={newComment}
          id="newComment"
          onChange={({ target }) => setNewComment(target.value)}
          placeholder="write new comment here"
        />
        <button>add comment</button>
      </form>
      {blog.comments.map((comment, index) => 
        <li key={index}>{comment}</li>
      )}
    </div>
  )
}

export default BlogPage
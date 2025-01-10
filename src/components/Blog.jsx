import { useState } from 'react'
import PropTypes from 'prop-types'
import { updateLikes, deleteBlog } from '../reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, handleRemovingBlog }) => {
  const [viewMore, setViewMore] = useState(false)
  const user = useSelector(state => state.user)
  //console.log(user)
  //console.log(blog.user.id)
  const hideWhenViewMore = { display: viewMore ? 'none' : '' }
  const showWhenViewMore = { display: viewMore ? '' : 'none' }
  const showRemoveButton = { display: user.user_id === blog.user.id ? '' : 'none' }

  const dispatch = useDispatch()

  const changeViewMore = () => {
    setViewMore(!viewMore)
  }

  const handleBlogDeleting = async (event) => {
    event.preventDefault()
    if (
      window.confirm(
        `Remove blog ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await dispatch(deleteBlog(blog))
        dispatch(setNotification({
          text: `'${blog.title} by ${blog.author}' removed successfully!`,
          type: 'confirm',
        }))
      } catch (exception) {
        dispatch(setNotification({
          text: 'Removing blog was unsuccessful',
          type: 'error',
        }))
      }
    }
  }

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

  return (
    <div className="blogStyle">
      <div style={hideWhenViewMore} className="onlyTitleAndAuthor">
        {blog.title} by {blog.author}{' '}
        <button onClick={changeViewMore}>view</button>
      </div>
      <div style={showWhenViewMore} className="moreSpecificInfo">
        <div>
          {blog.title} by {blog.author}{' '}
          <button onClick={changeViewMore}>hide</button>
        </div>
        <div className="url">{blog.url}</div>
        <div>
          likes: {blog.likes}{' '}
          <button className="likeButton" onClick={handleLiking}>
            like
          </button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showRemoveButton}>
          <button onClick={handleBlogDeleting}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  //handleLiking: PropTypes.func.isRequired,
  //user: PropTypes.object.isRequired,
  //handleRemovingBlog: PropTypes.func.isRequired,
}

export default Blog

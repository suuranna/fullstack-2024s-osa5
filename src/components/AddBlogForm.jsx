import { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AddBlogForm = ({ changeVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    changeVisibility()

    try {
      dispatch(createBlog(newBlog))
          //await blogService.addBlog(blogObject)
          //const blogs = await blogService.getAll()
          //setBlogs(blogs)
      //addBlogFormRef.current.toggleVisibility()
      //changeVisibility()
          //const title = blogs[blogs.length - 1].title
          //const author = blogs[blogs.length - 1].author
    
      dispatch(setNotification({ text: `${title} by ${author} added`, type: 'confirm' }))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(setNotification({
        text: 'Blog must have a title, author and url',
        type: 'error',
      }))
    }

    //dispatch(createBlog(newBlog))
  }

  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            type="text"
            name="title"
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="write title here"
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            name="author"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="write author here"
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="write url here"
          />
        </div>
        <button type="submit" id="add-button">
          add
        </button>
      </form>
    </div>
  )
}

//AddBlogForm.propTypes = {
//  createBlog: PropTypes.func.isRequired,
//}

export default AddBlogForm

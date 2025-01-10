import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoggedInHeader from './components/LoggedInHeader'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const addBlogFormRef = useRef()

  useEffect(() => {
    //blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  const changeAddBlogFormsVisibility = () => {
    addBlogFormRef.current.toggleVisibility()
  }

  const handleLiking = async (blogObject) => {
    try {
      await blogService.updateBlogLikes(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      dispatch(setNotification({
        text: 'Something went wrong when liking a blog',
        type: 'error',
      }))
    }
  }

  const handleRemovingBlog = async (blogObject) => {
    try {
      await blogService.removeBlog(blogObject.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      if (
        window.confirm(
          `Remove blog ${blogObject.title} by ${blogObject.author}?`
        )
      ) {
        dispatch(setNotification({
          text: `${blogObject.title} by ${blogObject.author} removed!`,
          type: 'confirm',
        }))
      }
    } catch (exception) {
      dispatch(setNotification({
        text: `Unable to remove blog ${blogObject.title} by ${blogObject.author}`,
        type: 'error',
      }))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <LoggedInHeader/>
      <Notification/>
      <BlogsForm
        handleLiking={handleLiking}
        handleRemovingBlog={handleRemovingBlog}
        user={user}
      />
      <Togglable buttonLabel={'new note'} ref={addBlogFormRef}>
        <AddBlogForm changeVisibility={(() => changeAddBlogFormsVisibility())} />
      </Togglable>
    </div>
  )
}

export default App

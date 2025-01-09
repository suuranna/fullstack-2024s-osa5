import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoggedInHeader from './components/LoggedInHeader'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const addBlogFormRef = useRef()

  useEffect(() => {
    //blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification({
        text: `Logged in succesfully! Welcome to blogapp, ${user.name}`,
        type: 'confirm',
      }))
    } catch (exception) {
      dispatch(setNotification({ text: 'Wrong username or password', type: 'error' }))
    }
  }

  const handleLogout = () => {
    const usersName = user.name
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)

    dispatch(setNotification({
      text: `Logged out succesfully! Bye bye, ${usersName}!`,
      type: 'confirm',
    }))
  }

  /*const addBlog = async (blogObject) => {
    try {
      //await blogService.addBlog(blogObject)
      //const blogs = await blogService.getAll()
      //setBlogs(blogs)
      createBlog(blogObject)
      addBlogFormRef.current.toggleVisibility()

      const title = blogs[blogs.length - 1].title
      const author = blogs[blogs.length - 1].author

      dispatch(setNotification({ text: `${title} by ${author} added`, type: 'confirm' }))
    } catch (exception) {
      dispatch(setNotification({
        text: 'Blog must have a title, author and url',
        type: 'error',
      }))
    }
  }*/

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
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <LoggedInHeader user={user} handleLogout={handleLogout} />
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

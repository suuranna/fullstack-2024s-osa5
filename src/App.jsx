import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoggedInHeader from './components/LoggedInHeader'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({ text: null, type: 'error' })

  const addBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage({ text: `Logged in succesfully! Welcome to blogapp, ${user.name}`, type: 'confirm' })
      setTimeout(() => {
        setMessage({ text: null, type: 'error' })
      }, 5000)
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', type: 'error' })
      setTimeout(() => {
        setMessage({ text: null, type: 'error' })
      }, 5000)
    }
  }

  const handleLogout = () => {
    const usersName = user.name
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)

    setMessage({ text: `Logged out succesfully! Bye bye, ${usersName}!`, type: 'confirm' })
    setTimeout(() => {
      setMessage({ text: null, type: 'error' })
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      await blogService.addBlog(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      addBlogFormRef.current.toggleVisibility()

      const title = blogs[blogs.length - 1].title
      const author = blogs[blogs.length - 1].author

      setMessage({ text: `${title} by ${author} added`, type: 'confirm' })
      setTimeout(() => {
        setMessage({ text: null, type: 'error' })
      }, 5000)
    } catch (exception) {
      setMessage({ text: 'Blog must have a title, author and url', type: 'error' })
      setTimeout(() => {
        setMessage({ text: null, type: 'error' })
      }, 5000)
    }
  }

  const handleLiking = async (blogObject) => {
    try {
      await blogService.updateBlogLikes(blogObject)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      setMessage({ text: 'Something went wrong when liking a blog', type: 'error' })
      setTimeout(() => {
        setMessage({ text: null, type: 'error' })
      }, 5000)
    }
  }

  const handleRemovingBlog = async (blogObject) => {
    try {
      await blogService.removeBlog(blogObject.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}?`)) {
        setMessage({ text: `${blogObject.title} by ${blogObject.author} removed!`, type: 'confirm' })
        setTimeout(() => {
          setMessage({ text: null, type: 'error' })
        }, 5000)
      }
    } catch (exception) {
      setMessage({ text: `Unable to remove blog ${blogObject.title} by ${blogObject.author}`, type: 'error' })
      setTimeout(() => {
        setMessage({ text: null, type: 'error' })
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm username={username} password={password} setPassword={setPassword} setUsername={setUsername} handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <LoggedInHeader
        user={user}
        handleLogout={handleLogout}
      />
      <Notification message={message} />
      <BlogsForm
        blogs={blogs}
        handleLiking={handleLiking}
        handleRemovingBlog={handleRemovingBlog}
        user={user}
      />
      <Togglable buttonLabel={'new note'} ref={addBlogFormRef} >
        <AddBlogForm
          createBlog={addBlog}
        />
      </Togglable>
    </div>
  )
}

export default App
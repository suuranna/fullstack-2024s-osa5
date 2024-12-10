import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoggedInHeader = (props) => {
  return (
    <div>
      <p>{props.user.name} logged in <button onClick={props.handleLogout}>logout</button> </p>
    </div>
  )
}

const AddBlogForm = (props) => {
  return (
    <div>
      <h2>create new blog</h2>
      <form onSubmit={props.handleAddingBlog}>
        <div>
          title: <input 
            type="text"
            name="title"
            value={props.title}
            onChange={({ target }) => props.setTitle(target.value)}
          />
        </div>
        <div>
          author: <input 
            type='text'
            name='author'
            value={props.author}
            onChange={({ target }) => props.setAuthor(target.value)}
          />
        </div>
        <div>
          url: <input
            type='text'
            name='url'
            value={props.url}
            onChange={({ target }) => props.setUrl(target.value)}
          />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

const LoginForm = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username: <input type="text" value={props.username} name="username" onChange={({ target }) => props.setUsername(target.value)} />
        </div>
        <div>
          password: <input type="password" value={props.password} name="password" onChange={({ target }) => props.setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const BlogsForm = (props) => {
  return (
    <div>
      <h2>blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
      setUsername("")
      setPassword("")
    } catch (exception) {
      window.alert("wrong password or username")
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const handleAddingBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      await blogService.addBlog(newBlog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      window.alert("Added new blog succesfully!")
    } catch (exception) {
      window.alert("Adding new blog failed.")
    }
  }

  if (user === null) {
    return (
      <div>
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
      <BlogsForm
        blogs={blogs}
      />
      <AddBlogForm 
        title={title}
        url={url}
        author={author}
        setAuthor={setAuthor}
        setUrl={setUrl}
        setTitle={setTitle}
        handleAddingBlog={handleAddingBlog}
      />
    </div>
  )
}

export default App
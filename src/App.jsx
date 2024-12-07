import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './services/login'

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
      <p>{props.user.name} logged in</p>
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername("")
      setPassword("")
      console.log(user)
    } catch (exception) {
      window.alert("wrong password or username")
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
      <BlogsForm blogs={blogs} user={user}/>
    </div>
  )
}

export default App
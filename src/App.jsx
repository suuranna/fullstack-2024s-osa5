import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoggedInHeader from './components/LoggedInHeader'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, updateLikes } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import UsersList from './components/UsersList'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, Navigate, useParams
} from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'

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

const UserPage = () => {
  const users = useSelector(state => state.users)
  //console.log(users)
  const id = useParams().id
  const user = users.find(user => user.id === id)
  //console.log(user.blogs)

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

const FrontPage = () => {
  const addBlogFormRef = useRef()

  const changeAddBlogFormsVisibility = () => {
    addBlogFormRef.current.toggleVisibility()
  }
  return (
    <div>
      <LoggedInHeader/>
      <Notification/>
      <BlogsForm/>
      <Togglable buttonLabel={'new blog'} ref={addBlogFormRef}>
        <AddBlogForm changeVisibility={(() => changeAddBlogFormsVisibility())} />
      </Togglable>
    </div>
  )
}

const LoginPage = () => {
  return (
    <div>
      <Notification/>
      <LoginForm/>
    </div>
  )
}

const UsersPage = () => {
  return (
    <div>
      <h2>blogs</h2>
      <LoggedInHeader/>
      <UsersList/>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  //console.log(user)
  //const navigate = useNavigate()

  useEffect(() => {
    //blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
    //dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  /*if (user === null) {
    return (
      <div>
        <Notification/>
        <LoginForm/>
      </div>
    )
  }*/

  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <FrontPage/> : <Navigate replace to='/login'/>}/>
        <Route path='/login' element={!user ? <LoginPage/> : <Navigate replace to='/'/>}/>
        <Route path='/users' element={<UsersPage/>} />
        <Route path='/users/:id' element={<UserPage/>} />
        <Route path='/blogs/:id' element={<BlogPage/>} />
      </Routes>
    </Router>
  )
}

export default App

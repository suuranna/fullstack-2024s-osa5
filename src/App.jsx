import { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import AddBlogForm from './components/AddBlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import LoggedInHeader from './components/LoggedInHeader'
import LoginForm from './components/LoginForm'
import BlogsForm from './components/BlogsForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import UsersList from './components/UsersList'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, Navigate
} from 'react-router-dom'

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
      <Togglable buttonLabel={'new note'} ref={addBlogFormRef}>
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
      </Routes>
    </Router>
  )
}

export default App

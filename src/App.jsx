import { useEffect } from 'react'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Navigate 
} from 'react-router-dom'
import BlogPage from './components/BlogPage'
import UserPage from './components/UserPage'
import FrontPage from './components/FrontPage'
import LoginPage from './components/LoginPage'
import UsersPage from './components/UsersPage'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON)
      dispatch(setUser(loggedInUser))
      blogService.setToken(loggedInUser.token)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={user ? <FrontPage/> : <Navigate replace to='/login' />}/>
        <Route path='/login' element={!user ? <LoginPage/> : <Navigate replace to='/' />}/>
        <Route path='/users' element={user ? <UsersPage/> : <Navigate replace to='/login' />} />
        <Route path='/users/:id' element={user ? <UserPage/> : <Navigate replace to='/login' />} />
        <Route path='/blogs/:id' element={user ? <BlogPage/> : <Navigate replace to='/login'/>} />
      </Routes>
    </Router>
  )
}

export default App

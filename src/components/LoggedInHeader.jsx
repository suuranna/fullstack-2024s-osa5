import PropTypes from 'prop-types'
import { setNotification } from '../reducers/notificationReducer'
import { setUser, getUsersName } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LoggedInHeader = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    const usersName = user.name
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(setUser(null))

    dispatch(setNotification({
      text: `Logged out succesfully! Bye bye, ${usersName}!`,
      type: 'confirm',
    }))
  }
  
  if (user === null) {
    return null
  }

  return (
    <div>
      <p>
        <Link to='/'>blogs</Link> {' | '}
        <Link to='/users'>users</Link>
        <br/>
        {user.name} logged in{' '}
        <button onClick={logout}>logout</button>
      </p>
    </div>
  )
}

/*LoggedInHeader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}*/

export default LoggedInHeader

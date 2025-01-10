import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const login = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser({ username, password}))
      dispatch(setNotification({
        text: `Logged in succesfully! Welcome to blogapp, ${username}`,
        type: 'confirm',
      }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ text: 'Wrong username or password', type: 'error' }))
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={login}>
        <div>
          username:{' '}
          <input
            type="text"
            id="username"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{' '}
          <input
            type="password"
            id="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

/*LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}*/

export default LoginForm

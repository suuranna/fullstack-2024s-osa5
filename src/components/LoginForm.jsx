import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={props.handleLogin}>
        <div>
          username:{' '}
          <input
            type="text"
            id="username"
            value={props.username}
            name="username"
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password:{' '}
          <input
            type="password"
            id="password"
            value={props.password}
            name="password"
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm

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

export default LoginForm
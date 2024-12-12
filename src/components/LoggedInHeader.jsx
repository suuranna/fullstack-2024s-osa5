const LoggedInHeader = (props) => {
  return (
    <div>
      <p>{props.user.name} logged in <button onClick={props.handleLogout}>logout</button> </p>
    </div>
  )
}

export default LoggedInHeader
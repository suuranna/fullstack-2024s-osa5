import PropTypes from 'prop-types'

const LoggedInHeader = (props) => {
  return (
    <div>
      <p>
        {props.user.name} logged in{' '}
        <button onClick={props.handleLogout}>logout</button>{' '}
      </p>
    </div>
  )
}

LoggedInHeader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default LoggedInHeader

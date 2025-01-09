//import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message.text === null) {
    return null
  }

  const style = message.type === 'error' ? 'error' : 'confirm'

  return <div className={style}>{message.text}</div>
}

//Notification.propTypes = {
//  message: PropTypes.object.isRequired,
//}

export default Notification

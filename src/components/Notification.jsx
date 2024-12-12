const Notification = ({ message }) => {
  if (message.text === null) {
    return null
  }

  const style = message.type==='error' ? 'error' : 'confirm'

  return (
    <div className={style}>
      {message.text}
    </div>
  )
}

export default Notification
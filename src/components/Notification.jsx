import React from 'react'
import './Notification.css'

const Notification = ({ message, type }) => {
  if (!message) return null

  const notificationClass = type === 'error' ? 'notification notification-error' : 'notification notification-success'

  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}

export default Notification
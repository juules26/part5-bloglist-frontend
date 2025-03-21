import React from 'react'

// este comp acepta 2 prompt
const Notification = ({ message, type }) => {
  if (!message) return null

  return (
    <div
      style={{
        backgroundColor: 'gainsboro',
        border: `3px solid ${type === 'error' ? 'red' : 'green'}`,
        color: type === 'error' ? 'red' : 'green',
        padding : '10px',
        top: 0,
        left: 0,
        right: 0,
        textAlign: 'centre',
        borderRadius: '10px',
      }}
    >
      {message}
    </div>
  )
}

export default Notification
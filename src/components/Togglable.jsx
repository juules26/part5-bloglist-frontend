import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <button onClick={toggleVisibility}>
        {visible ? 'Hide' : buttonLabel}
      </button>
      {visible && <div>{children}</div>}
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Togglable
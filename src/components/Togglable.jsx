import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
      <div>
        <button onClick={toggleVisibility}>
          {visible ? props.buttonLabel1 : props.buttonLabel}
        </button>
        {visible && <div>{props.children}</div>}
      </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
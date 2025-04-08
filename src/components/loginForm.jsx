import Notification from './notification'
import propTypes from 'prop-types'

const loginForm = ({ handleLogin, handleUsernameChange, handlePasswordChange, username, password, type, Message }) => {

  return (
    <div>
      <Notification message = {Message} type = {type}/>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input type="username" value={username} name="Username" onChange={handleUsernameChange}/>
        </div>
        <div>
            password
          <input type="password" value={password} name="Password" onChange={handlePasswordChange} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

loginForm.propTypes = {
  handleLogin: propTypes.func.isRequired,
  handleUsernameChange: propTypes.func.isRequired,
  handlePasswordChange: propTypes.func.isRequired,
  username: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  type: propTypes.string,
  Message: propTypes.string
}

export default loginForm
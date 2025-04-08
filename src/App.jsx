import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/notification'
import loginService from './services/login'
import Blogform from './components/blogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/loginForm'
import { jwtDecode } from 'jwt-decode'
import './Style/App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [Message, setMessage] = useState(null)
  const [type, setType] = useState(null)
  const blogFormRef = useRef()
  const logoutTimerRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const decodedToken = jwtDecode(user.token)
      user.id = decodedToken.id
      setUser(user)
      blogService.setToken(user.token)
      startLogoutTimer()
    }
  }, [])

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log("Returned Blog",returnedBlog)
      setBlogs(blogs.concat(returnedBlog, user))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setType('success')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    } catch (exception) {
      setMessage('Error adding blog')
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }
  const startLogoutTimer = () => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
    }
    logoutTimerRef.current = setTimeout(() => {
      handleLogout()
    }, 3600000) // 1 hour in milliseconds
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      const decodedToken = jwtDecode(user.token)
      user.id = decodedToken.id

      window.localStorage.setItem(
        'LoggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      startLogoutTimer()
    } catch (exception) {
      setMessage('wrong username or password')
      setType('error')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedBlogappUser')
    setUser(null)
    if(logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current)
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          username={username}
          password={password}
          type = {type}
          Message = {Message}
        />
      </div>
    )
  }

  return (
    <div>
      <Notification message = {Message} type = {type}/>
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={() => handleLogout()}>logout</button>
        <Togglable buttonLabel='create new blog' buttonLabel1='cancel' ref={blogFormRef}>
          <Blogform createBlog={addBlog}/>
        </Togglable>
      </div>

      <h2>blogs</h2>
      <ul>
        {sortedBlogs.map(blog =>
          <div key={blog.id}>
            <Blog blog={blog} setBlogs={setBlogs} user={user} />
          </div>
        )}
      </ul>
    </div>
  )
}

export default App
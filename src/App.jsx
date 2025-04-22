import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService'
import loginService from './services/loginService'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginResponse = await loginService.login({
        username, password
      })

      const userDetails = await loginService.getUserDetails(loginResponse.token)
      const loggedUser = userDetails.find(user => username === loginResponse.username)

      if (!loggedUser) {
        throw new Error('User not found in details')
      }

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify({
          ...loginResponse,
          id: loggedUser.id
        })
      )
      blogService.setToken(loginResponse.token)
      setUser({...loginResponse, id: loggedUser.id})
      setUsername('')
      setPassword('')
      setNotification({ message: 'Login successful', type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    } catch (exception) {
      setNotification({ message: 'Wrong username or password', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
      console.error('Wrong credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    setNotification({ message: 'Logged out successfully', type: 'success' })
    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 5000)
  }

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(prevBlogs => [
        ...prevBlogs,
        { ...createdBlog, user: { username: user.username, name: user.name, id: user.id } }
      ])
      console.log('nuevo blog creado:', createdBlog)
      setNotification({ message: `A new blog ${newBlog.title} ${newBlog.author} added`, type: 'success' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    } catch (error) {
      setNotification({ message: 'Error creating blog', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
      console.error('Error creating blog', error)
    }
  }

  const updateBlog = (updatedBlog) => {
    setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
  }

  const deleteBlog = async (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor='username'>Username</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              data-testid='username'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              data-testid='password'
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>blogs</h2>
      <p>{user.name} logged in
        <button type='button' onClick={handleLogout}>Logout</button>
      </p>
      <BlogForm createBlog={createBlog} user={user} />
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} setBlogs={setBlogs} />
      )}
    </div>
  )
}

export default App
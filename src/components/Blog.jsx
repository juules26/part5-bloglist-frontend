import  { jwtDecode }  from 'jwt-decode'
import { useEffect, useState } from 'react'
import blogService from '../services/blogService'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user,
      id: user.id
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    console.log('returned blog:', returnedBlog)
    updateBlog(returnedBlog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      deleteBlog(blog.id)
    }
  }
  let userId
  if (user && user.token) {
    const decodedToken = jwtDecode(user.token)
    userId = decodedToken.id
  }

  const canDelete = userId && blog.user && blog.user.id && userId === blog.user.id
  console.log('user token:', user.token)
  console.log('blog user id:', blog.user.id)
  console.log('userId:', userId)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {canDelete && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

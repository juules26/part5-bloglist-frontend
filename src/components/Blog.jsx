import { useState } from 'react'
import blogService from '../services/blogService'
import './Blog.css'

const Blog = ({ blog, updateBlog, deleteBlog, user, setBlogs, blogs }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user,
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    const fixedBlog = {
      ...returnedBlog,
      user: blog.user
    }

    setBlogs(prevBlogs => prevBlogs.map(b => b.id === fixedBlog.id ? fixedBlog : b))
    updateBlog(fixedBlog)
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Do you want to delete this blog?')
    if (!confirmDelete) {
      return
    }

    const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    const token = storedUser ? storedUser.token : null
    
    console.log('TOKEN:', token)
    if (!token) {
        console.error('No token found')
        return
    }
    try {
      console.log('blog id:', blog.id)
      const response = await fetch(`/api/blogs/${blog.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const updatedBlogs = await fetchBlogs()
        setBlogs(updatedBlogs)
      } else {
        const errorData = await response.json()
        console.error(errorData.error)
      }
  } catch (error) {
    console.error('Error deleting blog:', error)
  }
}

const fetchBlogs = async () => {
    const response = await fetch('/api/blogs')
    const blogs = await response.json()
    return blogs
}


  return (
    <div className='blog'>
      <div className='blog-title-author'>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
          <p>{blog.user.name}</p>
          {user && user.id === blog.user.id && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
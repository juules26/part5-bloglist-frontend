import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const handleSubmit = (event) => {
    console.log('creating blog with user:', user)
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
      user: {
        id: user.id,
        name: user.name
      }
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
  }

  return (
    <div>
      {visible ? (
        <form onSubmit={handleSubmit}>
          <h2>create new</h2>
          <div>
            Title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
          <div>
            <button type="button" onClick={() => setVisible(false)}>cancel</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setVisible(true)}>create new Blog</button>
      )}
    </div>
  )
}

export default BlogForm
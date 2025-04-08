import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
                    title:
          <input placeholder='Enter title' name="Title" value={newTitle} onChange={event => setNewTitle(event.target.value)}/>
        </div>
        <div>
                    author:
          <input placeholder='Enter author' name="Author" value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/>
        </div>
        <div>
                    url:
          <input placeholder='Enter url' name="Url" value={newUrl} onChange={event => setNewUrl(event.target.value)}/>
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
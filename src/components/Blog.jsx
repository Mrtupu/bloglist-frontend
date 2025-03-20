import Togglable from './Togglable'
import React from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog, setBlogs, user }) => {
  const likedBlog = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.put(blog.id, updatedBlog)
    setBlogs(blogs => blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs => blogs.filter(b => b.id !== blog.id))
    }
  }

  console.log(blog.user)
  console.log(user)


  return (
    <li className='blog'>
      <div>title: {blog.title}</div>
      <div>author: {blog.author}</div>
      <Togglable buttonLabel='view' buttonLabel1='hide'>
        <div>url: {blog.url}</div>
        <div>likes: {blog.likes} <button onClick={() => likedBlog(blog)}>like</button></div>
        <div>user: {blog.user.name}</div>
        {blog.user && blog.user._id === user.id && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
      </Togglable>
    </li>
  )
}

export default Blog
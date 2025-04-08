import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, vi } from 'vitest'
import blogService from '../services/blogs'
import Blogform from './blogForm'

vi.mock('../services/blogs', () => ({
    default: {
        put: vi.fn()
    }
}))

test('renders only title and author', () => {
    const user = {
        name: 'name',
        id: 'id'
    }

    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: {
            name: 'name',
            id: 'id'
        }
    }
    console.log(<Blog blog={blog} user={user}/>)
    render(<Blog blog={blog} user={user}/>)

    expect(screen.getByText('title: title')).toBeDefined()
    expect(screen.getByText('author: author')).toBeDefined()

    const urlElement = screen.queryByText('url')
    const likesElement = screen.queryByText('likes: 0')

    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
})

test('renders all information when view button is clicked', async () => {
    const user = {
        name: 'name',
        id: 'id'
    }

    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: {
            name: 'name',
            id: 'id'
        }
    }

    render(<Blog blog = {blog} user = {user}/>)
    
    const user1 = userEvent.setup()
    const Button  = screen.getByText('view')
    console.log(Button)
    await user1.click(Button)
    screen.debug()


     expect(screen.getByText('title: title')).toBeDefined()
     expect(screen.getByText('author: author')).toBeDefined()
     expect(screen.getByText('url: url')).toBeDefined()
     expect(screen.getByText('likes: 0')).toBeDefined()
     expect(screen.getByText('user: name')).toBeDefined()

})

test ('clicking like button twice calls event handler twice', async () => {
    const user = {
        name: 'name',
        id: 'id'
    }

    const blog = {
        id: 'blog-id',
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0,
        user: {
            name: 'name',
            id: 'id'
        }
    }

    const mockSetBlogs = vi.fn()

    blogService.put.mockResolvedValue({
        ...Blog,
        likes: Blog.likes + 1
    })

    render(<Blog blog={blog} user={user} setBlogs={mockSetBlogs}/>)

    const user1 = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user1.click(viewButton)

    const likeButton = screen.getByText('like')
    await user1.click(likeButton)
    await user1.click(likeButton)

    expect(mockSetBlogs).toHaveBeenCalledTimes(2)



    
})

test('calls createBlog with correct data when a new blog is created', async () => {
    const createBlog = vi.fn()

    render(<Blogform createBlog={createBlog} />)

    const user = userEvent.setup()

    //Fill out the form fields
    const titleInput = screen.getByPlaceholderText('Enter title')
    const authorInput = screen.getByPlaceholderText('Enter author')
    const urlInput = screen.getByPlaceholderText('Enter url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Test Blog Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'http://testurl.com')

    // Submit the form
    await user.click(createButton)

    // Assert that createBlog was called once with the correct data
    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testurl.com'
    })
})

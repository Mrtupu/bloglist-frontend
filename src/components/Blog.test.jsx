import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, vi } from 'vitest'

// test('renders only title and author', () => {
//     const user = {
//         name: 'name',
//         id: 'id'
//     }

//     const blog = {
//         title: 'title',
//         author: 'author',
//         url: 'url',
//         likes: 0,
//         user: {
//             name: 'name',
//             id: 'id'
//         }
//     }
//     console.log(<Blog blog={blog} user={user}/>)
//     render(<Blog blog={blog} user={user}/>)

//     expect(screen.getByText('title: title')).toBeDefined()
//     expect(screen.getByText('author: author')).toBeDefined()

//     const urlElement = screen.queryByText('url')
//     const likesElement = screen.queryByText('likes: 0')

//     expect(urlElement).toBeNull()
//     expect(likesElement).toBeNull()
// })

test('renders all information when view button is clicked', () => {
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
    const Button = screen.getByText('view')
    console.log(Button)
    user1.click(Button)
    screen.debug()


     expect(screen.getByText('title: title')).toBeDefined()
     expect(screen.getByText('author: author')).toBeDefined()
     expect(screen.getByText('url: url')).toBeDefined()
     expect(screen.getByText('likes: 0')).toBeDefined()
     expect(screen.getByText('user: name')).toBeDefined()

})

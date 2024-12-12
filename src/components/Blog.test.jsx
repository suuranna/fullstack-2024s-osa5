import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { describe, expect } from 'vitest'

describe('Blog', () => {
  const blog = {
    title: 'Otsikko',
    author: 'Kirjoittaja',
    url: 'www.url.fi',
    likes: 666,
    user: {username: 'SuperKäyttäjä', name: 'Susu Käkä', id: '6750f8390a565ebfa988aade'}
  }
  const user = {
    token: 'hsdjnjkjncklqejfl', 
    username: 'SuperKäyttäjä', 
    name: 'Susu Käkä', 
    user_id: '6750f8390a565ebfa988aade'
  }  

  let container

  test('renders title and author, but not url and likes', () => {
    const mockHandleLiking = vi.fn()
    const mockHandleRemoving = vi.fn()

    container = render(<Blog blog={blog} handleLiking={mockHandleLiking} handleRemovingBlog={mockHandleRemoving} user={user} />).container

    let div = container.querySelector('.onlyTitleAndAuthor')
    expect(div).toHaveTextContent('Otsikko by Kirjoittaja')
    div = container.querySelector('.moreSpecificInfo')
    expect(div).toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.url.fi')
    expect(div).toHaveTextContent('likes: 666')
  })

  test('pressing view-button shows url, likes and user', async () => {
    const mockHandleLiking = vi.fn()
    const mockHandleRemoving = vi.fn()

    container = render(<Blog blog={blog} handleLiking={mockHandleLiking} handleRemovingBlog={mockHandleRemoving} user={user} />).container

    const clickerUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await clickerUser.click(viewButton)

    const div = container.querySelector('.moreSpecificInfo')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.url.fi')
    expect(div).toHaveTextContent('likes: 666')
    expect(div).toHaveTextContent('Susu Käkä')
  })

  test('when pressing the like-button, the handler will be called twice', async () => {
    const mockHandleLiking = vi.fn()
    const mockHandleRemoving = vi.fn()

    container = render(<Blog blog={blog} handleLiking={mockHandleLiking} handleRemovingBlog={mockHandleRemoving} user={user} />).container

    const clickerUser = userEvent.setup()
    const viewButton = screen.getByText('view')
    await clickerUser.click(viewButton)
    const likeButton = screen.getByText('like')
    expect(mockHandleLiking.mock.calls).toHaveLength(0)
    await clickerUser.click(likeButton)
    await clickerUser.click(likeButton)

    expect(mockHandleLiking.mock.calls).toHaveLength(2)
  })
})
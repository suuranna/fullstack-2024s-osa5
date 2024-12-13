import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'
import { describe, expect } from 'vitest'

describe('AddBlogForm', () => {
  test('addBlogForm calls the handler with right info', async () => {
    const createBlog = vi.fn()
    const clickerUser = userEvent.setup()

    render(<AddBlogForm createBlog={createBlog} />)

    const inputTitle = screen.getByPlaceholderText('write title here')
    const inputAuthor = screen.getByPlaceholderText('write author here')
    const inputUrl = screen.getByPlaceholderText('write url here')
    const addButton = screen.getByText('add')

    await clickerUser.type(inputTitle, 'Otsikko')
    await clickerUser.type(inputAuthor, 'Kirjoittaja')
    await clickerUser.type(inputUrl, 'www.url.fi')
    await clickerUser.click(addButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Otsikko')
    expect(createBlog.mock.calls[0][0].author).toBe('Kirjoittaja')
    expect(createBlog.mock.calls[0][0].url).toBe('www.url.fi')
  })
})
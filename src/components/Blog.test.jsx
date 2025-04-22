import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { vi } from 'vitest'

vi.mock('axios')

test('muestra el título y el autor, pero no la URL ni los likes por defecto', () => {
  const blog = {
    title: 'React Testing',
    author: 'John Doe',
    url: 'http://reacttesting.com',
    likes: 5,
    user: { name: 'Jane Doe' }
  }

  render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} user={{}} />)

  // Verifica que el título y el autor están visibles
  const titleAuthorElement = screen.getByText('React Testing John Doe')
  expect(titleAuthorElement).toBeVisible()

  // Verifica que la URL no está visible por defecto
  const urlElement = screen.queryByText('http://reacttesting.com')
  expect(urlElement).toBeNull() // No debería estar en el DOM

  // Verifica que los likes no están visibles por defecto
  const likesElement = screen.queryByText('5 likes')
  expect(likesElement).toBeNull() // No debería estar en el DOM
})

test('verifica que URL y likes se muestran cuando click en botón view', async() => {
  const user = userEvent.setup()

  const blog = {
    title: 'titulo test 2',
    author: 'John dodo',
    url: 'http://reacttesting.com',
    likes: 6,
    user: { name: 'Jul Doe' }
  }

  render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} user={{}} />)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // verifica que url visible
  const urlElement = screen.getByText('http://reacttesting.com')
  expect(urlElement).toBeVisible()
  //verfica que likes visible
  const likesElement = screen.getByText('6 likes')
  expect(likesElement).toBeVisible()
})

test('2 clicks llama 2 veces al controlador de eventos', async() => {
  const user = userEvent.setup()

  const blog = {
    title: 'titulo test 3',
    author: 'juju dudu',
    url: 'http://rerea.com',
    likes: 10,
    user: { name: 'Jul dudu' }
  }
  const mockHandler = vi.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} deleteBlog={() => {}} user={{}} />)

  // se pulsa a view primero
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // luego a like
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

test('formulario llama al controlador de eventos con los detalles corretos al crear nuevo blog', async() => {
  const mockHandler = vi.fn()

  const user = {id: '123', name: 'Test User'}

  render(<BlogForm createBlog={mockHandler} user={user} />)

  const userEventInstance = userEvent.setup()

  const showFormButton = screen.getByText('create new Blog')
  await userEventInstance.click(showFormButton)

  expect(screen.getByText('create')).toBeVisible()

  const titleInput = screen.getByLabelText('Title')
  const authorInput = screen.getByLabelText('Author')
  const urlInput = screen.getByLabelText('Url')

  await userEventInstance.type(titleInput, 'Nuevo Blog')
  await userEventInstance.type(authorInput, 'Autor Prueba')
  await userEventInstance.type(urlInput, 'nuevoblog.com')

  const createButton = screen.getByText('create')
  await userEventInstance.click(createButton)

  expect(mockHandler).toHaveBeenCalledTimes(1)
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'Nuevo Blog',
    author: 'Autor Prueba',
    url: 'nuevoblog.com',
    user: {id: '123', name: 'Test User'}
  })
})
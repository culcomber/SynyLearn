import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createNote = jest.fn()

  render(<NoteForm createNote={createNote} />)

  const input = screen.getByRole('textbox') // 获得输入框
  // const input = screen.getByPlaceholderText('write here note content')
  // const input = container.querySelector('#note-input')
  const sendButton = screen.getByText('save')

  await user.type(input, 'testing a form...') // 输入框写入内容
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  // 传入createNote第一个参数是input输入的内容
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})
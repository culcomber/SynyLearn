import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // 用react-testing-library提供的render函数渲染该组件
  // 使用的渲染方法将组件渲染成适合测试的格式，而不用渲染到DOM上
  render(<Note note={note} />)

  // 使用对象screen来访问被渲染的组件。我们使用screen's方法getByText来搜索具有注释内容的元素，并确保其存在
  const element = screen.getByText('Component testing is done with react-testing-library')
  screen.debug(element) // 打印元素到控制台
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // 测试代码之间的连接。检测mockHandler调用次数
  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
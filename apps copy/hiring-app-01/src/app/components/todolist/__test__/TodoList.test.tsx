import renderer from 'react-test-renderer';
import TodoList from '../TodoList';
import { render } from '@testing-library/react';

describe('TodoList', () => {
  const todoList = renderer.create(<TodoList />);

  it('renders correctly', () => {
    expect(todoList.toJSON()).toMatchSnapshot();
  });

  it("contains 'Nothing Todo' if there are no cards", () => {
    const {queryByText} = render(<TodoList />);
    expect(queryByText('Nothing Todo'))
  })
})
import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Home = () => {
  const todos = useStoreState((state) => state.todo.todos);
  const addTodo = useStoreActions((actions) => actions.todo.add);
  const toggleTodo = useStoreActions((actions) => actions.todo.toggle);
  const deleteTodo = useStoreActions((actions) => actions.todo.delete);

  const [text, setText] = useState('');

  return (
    <div>
      <ul>
        {todos !== undefined &&
          todos.map((todo) => (
            <li
              key={todo.timeCreated}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {!!todo.completed ? `✅` : `❌`}
              <span>{todo.text}</span>
              <button
                onClick={() => {
                  toggleTodo(todo);
                }}
              >
                toggle
              </button>
              <button
                onClick={() => {
                  deleteTodo(todo);
                }}
              >
                delete
              </button>
            </li>
          ))}
      </ul>
      <br />
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button
          onClick={() => {
            addTodo({ text: text, completed: false });
            setText('');
          }}
        >
          add item
        </button>
      </div>
    </div>
  );
};

export default Home;

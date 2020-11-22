import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Todos = () => {
  const todos = useStoreState((state) => state.todo.todos);
  const addTodo = useStoreActions((actions) => actions.todo.add);
  const toggleTodo = useStoreActions((actions) => actions.todo.toggle);
  const deleteTodo = useStoreActions((actions) => actions.todo.delete);

  const [text, setText] = useState('');

  return (
    <div>
      <h3>todos</h3>
      <ul>
        {!!todos && todos.length !== 0 ? (
          todos.map((todo) => (
            <li key={todo.timeCreated}>
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
          ))
        ) : (
          <li>no todos to display</li>
        )}
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

export default Todos;

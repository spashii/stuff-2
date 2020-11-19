import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Home = () => {
  const todos = useStoreState((state) => state.todo.todos);
  const addTodo = useStoreActions((actions) => actions.todo.add);

  const [text, setText] = useState('');

  return (
    <div>
      {todos !== undefined &&
        todos.map((todo) => (
          <div key={todo.timeCreated}>{JSON.stringify(todo)}</div>
        ))}
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

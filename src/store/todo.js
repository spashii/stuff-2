import { persist, action, thunk } from 'easy-peasy';
import { db } from '../fire';

export const todoModel = persist(
  {
    todos: [],
    set: action((state, payload) => {
      state.todos = payload;
    }),
    add: thunk(async (actions, payload, { getStoreState }) => {
      if (getStoreState().user.isActive) {
        const newTodo = {
          ...payload,
          timeCreated: new Date().toISOString(),
        };

        const updatedTodos =
          getStoreState().todo.todos != null
            ? {
                todos: [...getStoreState().todo.todos, newTodo],
              }
            : {
                todos: [newTodo],
              };

        await db
          .collection('userBlocks')
          .doc(getStoreState().user.current.uid)
          .update(updatedTodos)
          .then(() => console.log('todos: pushed todos(added new)'));
      }
    }),
    toggle: thunk(async (actions, payload, { getStoreState }) => {
      if (getStoreState().user.isActive) {
        let todos = getStoreState().todo.todos;

        if (todos != null) {
          let index = todos.indexOf(payload);
          if (index !== -1) {
            todos[index].completed = !todos[index].completed;
            actions.set(todos);
          }

          await db
            .collection('userBlocks')
            .doc(getStoreState().user.current.uid)
            .update({
              todos: todos,
            })
            .then(() => console.log('todos: pushed todos(toggled)'));
        }
      }
    }),
    delete: thunk(async (actions, payload, { getStoreState }) => {
      if (getStoreState().user.isActive) {
        let todos = getStoreState().todo.todos;

        if (todos != null) {
          let index = todos.indexOf(payload);
          if (index !== -1) {
            todos.splice(index, 1);
            actions.set(todos);
          }

          await db
            .collection('userBlocks')
            .doc(getStoreState().user.current.uid)
            .update({
              todos: todos,
            })
            .then(() => console.log('todos: pushed todos(deleted)'));
        }
      }
    }),
  },
  {
    allow: ['todos'],
  }
);

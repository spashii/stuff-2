import { createStore, persist, action, thunk, computed } from 'easy-peasy';

import { auth, db } from '../fire';

export const store = createStore({
  user: persist(
    {
      current: null,
      isActive: computed((state) => (state.current != null ? true : false)),
      isLoggingIn: false,
      setLoggingIn: action((state, payload) => {
        state.isLoggingIn = payload;
      }),
      load: action((state, payload) => {
        state.current = payload;
      }),
      signIn: thunk((actions) => {
        const provider = new auth.GoogleAuthProvider();
        actions.setLoggingIn(true);
        return auth().signInWithRedirect(provider);
      }),
      signOut: thunk(() => {
        return auth().signOut();
      }),
      update: thunk(async (actions, payload) => {
        actions.load(payload);
        if (payload != null) {
          await db
            .collection('userBlocks')
            .doc(payload.uid)
            .set(
              {
                uid: payload.uid,
                displayName: payload.displayName,
                photoURL: payload.photoURL,
                email: payload.email,
                lastSignInTime: new Date().toISOString(),
              },
              {
                merge: true,
              }
            )
            .then(() => console.log(`user: pushed userBlock(${payload.uid})`))
            .catch((error) => console.error(error));
        }
      }),
    },
    {
      allow: ['current', 'isActive', 'isLoggingIn'],
    }
  ),
  todo: persist(
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
  ),
});

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
            .then(() => console.log(`updated @ userBlock(${payload.uid})`))
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
          const updatedTodos = () =>
            getStoreState().todo.todos != null
              ? {
                  todos: [
                    ...getStoreState().todo.todos,
                    { ...payload, timeCreated: new Date().toISOString() },
                  ],
                }
              : {
                  todos: [
                    { ...payload, timeCreated: new Date().toISOString() },
                  ],
                };

          await db
            .collection('userBlocks')
            .doc(getStoreState().user.current.uid)
            .update(updatedTodos());
        }
      }),
      // toggle: thunk(async (actions, payload, { getStoreState }) => {
      //   if (getStoreState().user.isActive) {
      //     let batch = db.batch();
      //     let todos = db.collection('userBlocks').doc(getStoreState().user.current.uid);

      //     batch.update(todos, ))

      //     await db
      //       .collection('userBlocks')
      //       .doc(getStoreState().user.current.uid)
      //       .update({
      //         todos: firebase.firestore.FieldValue.arrayRemove(payload),
      //       });
      //   }
      // }),
      // delete: thunk(async (actions, payload, { getStoreState }) => {
      //   if (getStoreState().user.isActive) {
      //     await db
      //       .collection('userBlocks')
      //       .doc(getStoreState().user.current.uid)
      //       .update({
      //         todos: firebase.firestore.FieldValue.arrayRemove(payload),
      //       });
      //   }
      // }),
    },
    {
      allow: ['todos'],
    }
  ),
});

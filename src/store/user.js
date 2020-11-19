import { persist, action, thunk, computed } from 'easy-peasy';
import { auth, db } from '../fire';

export const userModel = persist(
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
);

import { createStore, persist, action, thunk, computed } from 'easy-peasy';
import { auth } from '../fire';

export const store = createStore({
  user: persist(
    {
      current: null,
      isActive: computed((state) => (state.current != null ? true : false)),
      load: action((state, payload) => {
        state.current = payload;
      }),
      signIn: thunk(() => {
        var provider = new auth.GoogleAuthProvider();
        return auth().signInWithRedirect(provider);
      }),
      signOut: thunk(() => {
        return auth().signOut();
      }),
    },
    {
      allow: ['current', 'isActive'],
    }
  ),
});

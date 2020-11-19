import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

import { auth } from '../fire';

function useFirebaseAuth() {
  const updateUser = useStoreActions((actions) => actions.user.update);
  const setLoggingIn = useStoreActions((actions) => actions.user.setLoggingIn);

  useEffect(() => {
    console.log('user: auth listener subscribed');
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      try {
        setLoggingIn(true);
        await updateUser(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoggingIn(false);
      }
    });
    return () => {
      unsubscribe();
      console.log('user: auth listener unsubscribed');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useFirebaseAuth;

import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

function useFirebaseAuth(auth) {
  const loadUser = useStoreActions((actions) => actions.user.load);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      loadUser(user);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useFirebaseAuth;

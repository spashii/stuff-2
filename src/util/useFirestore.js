/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';

import { db } from '../fire';

function useFirestore() {
  const currentUser = useStoreState((state) => state.user.current);
  const isActiveUser = useStoreState((state) => state.user.isActive);
  const setTodos = useStoreActions((actions) => actions.todo.set);
  useEffect(() => {
    if (isActiveUser) {
      const unsubscribe = db
        .collection('userBlocks')
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          console.log(
            'todos: pulled from',
            doc.metadata.hasPendingWrites ? 'local' : 'server'
          );
          setTodos(doc.data().todos);
        });
      console.log('todos: listener subscribed');
      return () => {
        unsubscribe();
        console.log('todos: listener unsubscribed');
      };
    }
  }, [isActiveUser]);
}

export default useFirestore;

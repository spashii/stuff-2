import { Link } from '@reach/router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { store } from '../../store';

const Navbar = () => {
  const currentUser = useStoreState((state) => state.user.current);
  const isActiveUser = useStoreState((state) => state.user.isActive);
  const signOutUser = useStoreActions((actions) => actions.user.signOut);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">home</Link>
        </li>
        {!isActiveUser ? (
          <li>
            <Link to="/login">login</Link>
          </li>
        ) : (
          <>
            <li>
              {currentUser.displayName}
              <img
                src={currentUser.photoURL != null ? currentUser.photoURL : ''}
                alt={currentUser.uid}
                height={50}
                width={50}
              ></img>
            </li>
            <li>
              <button
                onClick={async () => {
                  await signOutUser();
                  await store.persist.clear();
                  console.log('user: logged out');
                }}
              >
                logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

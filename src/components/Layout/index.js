import { Link } from '@reach/router';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { store } from '../../store';

const Layout = ({ children }) => {
  const user = useStoreState((state) => state.user);
  const signOutUser = useStoreActions((actions) => actions.user.signOut);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {!user.isActive ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            onClick={async () => {
              await signOutUser();
              await store.persist.clear();
              console.log('user logged out and persistence wiped');
            }}
          >
            logout
          </button>
        )}
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

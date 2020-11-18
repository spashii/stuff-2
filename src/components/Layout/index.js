// import { makeStyles } from '@material-ui/core';
import { Link } from '@reach/router';
import { useStoreState, useStoreActions } from 'easy-peasy';

// const useStyles = makeStyles((theme) => ({
//   root: {}
// }));

const Layout = ({ children }) => {
  // const classes = useStyles();
  const user = useStoreState((state) => state.user);
  const signOutUser = useStoreActions((actions) => actions.user.signOut);

  console.log(user);

  return (
    // <div className={classes.root}>
    <div>
      <nav>
        <Link to="/">Home</Link>
        {!user.isActive ? (
          <Link to="/login">Login</Link>
        ) : (
          <button
            onClick={() => {
              signOutUser();
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

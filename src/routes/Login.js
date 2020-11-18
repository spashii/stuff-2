import { useEffect } from 'react';
// import { makeStyles } from '@material-ui/core';
import { navigate } from '@reach/router';
import { useStoreState, useStoreActions } from 'easy-peasy';

// const useStyles = makeStyles((theme) => ({
//   root: {}
// }));

const Login = () => {
  // const classes = useStyles();
  const isActiveUser = useStoreState((state) => state.user.isActive);
  const signInUser = useStoreActions((actions) => actions.user.signIn);

  useEffect(() => {
    if (isActiveUser) {
      navigate('/');
    }
  }, [isActiveUser]);

  return (
    // <div className={classes.root}>
    <div>
      {!isActiveUser && (
        <button
          onClick={() => {
            signInUser();
          }}
        >
          click to login
        </button>
      )}
    </div>
  );
};

export default Login;

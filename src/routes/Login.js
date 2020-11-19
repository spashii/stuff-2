import { Redirect } from '@reach/router';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Login = () => {
  const isActiveUser = useStoreState((state) => state.user.isActive);
  const signInUser = useStoreActions((actions) => actions.user.signIn);

  return (
    <div>
      {isActiveUser ? (
        <Redirect from="" to="/" noThrow />
      ) : (
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

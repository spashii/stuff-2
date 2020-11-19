import { Redirect } from '@reach/router';
import { useStoreState } from 'easy-peasy';

const PrivateRoute = (props) => {
  const isActiveUser = useStoreState((state) => state.user.isActive);
  const Component = props.component;

  return (
    <>
      {isActiveUser ? (
        <Component {...props} />
      ) : (
        <Redirect from="" to="/login" noThrow />
      )}
    </>
  );
};

export default PrivateRoute;

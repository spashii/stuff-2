import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useStoreState } from 'easy-peasy';

const PrivateRoute = (props) => {
  const isActiveUser = useStoreState((state) => state.user.isActive);
  const Component = props.component;

  useEffect(() => {
    if (!isActiveUser) {
      navigate('/login');
    }
  }, [isActiveUser]);

  return (
    <>
      <Component {...props} />
    </>
  );
};

export default PrivateRoute;

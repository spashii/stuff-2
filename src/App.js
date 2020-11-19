import { Router } from '@reach/router';
import { useStoreRehydrated, useStoreState } from 'easy-peasy';

import Layout from './components/Layout';
import Loading from './components/Loading';

import PrivateRoute from './components/PrivateRoute';
import Home from './routes/Home';
import Login from './routes/Login';

import useFirebaseAuth from './util/useFirebaseAuth';
import useFirestore from './util/useFirestore';

function App() {
  useFirebaseAuth();
  useFirestore();

  const isRehydrated = useStoreRehydrated();
  const isLoggingIn = useStoreState((state) => state.user.isLoggingIn);

  console.log('logging in - ', isLoggingIn);

  return (
    <Layout>
      {!isRehydrated || isLoggingIn ? (
        <Loading />
      ) : (
        <Router>
          <Login path="/login" />
          <PrivateRoute component={Home} path="/" />
        </Router>
      )}
    </Layout>
  );
}

export default App;

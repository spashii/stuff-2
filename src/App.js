import { Router } from '@reach/router';
import { useStoreRehydrated } from 'easy-peasy';

import Layout from './components/Layout';
import Loading from './components/Loading';

import PrivateRoute from './components/PrivateRoute';
import Home from './routes/Home';
import Login from './routes/Login';

import { auth } from './fire';
import useFirebaseAuth from './util/useFirebaseAuth';

function App() {
  useFirebaseAuth(auth);
  const isRehydrated = useStoreRehydrated();

  return (
    <Layout>
      {!isRehydrated ? (
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

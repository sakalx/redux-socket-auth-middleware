import React, {useState, useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectingToServer} from './redux-core/actions/socket';

import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/Snackbar';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App({socket, connectingToServer}) {
  const [loading, setLoading] = useState(true);

  const {fetching} = socket;
  useEffect(() => {
    if (!fetching && loading) setLoading(false);
  }, [fetching]);

  useEffect(() => {
    connectingToServer();
  }, []);

  if (loading) return null;

  return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <PrivateRoute exact path='/' component={HomePage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </HashRouter>

        <Snackbar/>
      </React.Fragment>
  );
}

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  connectingToServer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
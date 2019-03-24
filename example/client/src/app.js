import React, {useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectingToServer} from './redux-core/actions/socket';

import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/Snackbar';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App({connectingToServer}) {
  useEffect(() => connectingToServer(), []);

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

const mapDispatchToProps = dispatch => bindActionCreators({
  connectingToServer,
}, dispatch);

export default connect(null, mapDispatchToProps)(App);
import React, {useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectingToServer} from './redux-core/actions/socket';

import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/Snackbar';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App({socket, connectingToServer}) {

  useEffect(() => connectingToServer(), []);

  if (socket.fetching) {
    return (
        <h1>Loading...</h1>
    );
  }

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
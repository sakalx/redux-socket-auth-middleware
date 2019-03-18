import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import PrivateRoute from 'root/components/PrivateRoute'

import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';
import {connectingToServer} from './redux-core/actions/socket';

function App({socket, connectingToServer}) {

  useEffect(() => connectingToServer(), []);

  if (socket.fetching) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <HashRouter>
      <Switch>
        <PrivateRoute exact path='/' component={HomePage}/>
        <Route component={NotFoundPage}/>
      </Switch>
    </HashRouter>
  )
}

const mapStateToProps = ({socket}) => ({
  socket,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  connectingToServer,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
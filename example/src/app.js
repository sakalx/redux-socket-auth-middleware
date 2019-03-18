import React, {useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {connectingToServer} from './redux-core/actions/socket';

import LinearProgress from '@material-ui/core/LinearProgress';
import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/Snackbar';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App({socket, connectingToServer}) {

  useEffect(() => connectingToServer(), []);

  return (
      <React.Fragment>
        {socket.fetching &&
        <LinearProgress
            color='secondary'
            variant='query'
            style={{position: 'absolute', width: '100%'}}
        />}

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
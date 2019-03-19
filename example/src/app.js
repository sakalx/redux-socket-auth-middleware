import React, {useState, useEffect} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import {connect} from 'react-redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import PrivateRoute from './components/PrivateRoute';
import Snackbar from './components/Snackbar';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

function App({socket}) {
  const [loading, setLoading] = useState(true);

  const {fetching} = socket;
  useEffect(() => {
    if (!fetching && loading) setLoading(false);
  }, [fetching]);

  if (loading) return <LinearProgress/>;

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

export default connect(mapStateToProps, null)(App);
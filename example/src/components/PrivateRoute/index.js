import React from 'react';
import {Route} from 'react-router-dom';

import {connect} from 'react-redux';

import LoginPage from '../../pages/Login';


const PrivateRoute = ({
                        component: Component,
                        socket,
                        ...rest
                      }) => (
  socket.io && socket.io.connected
    ? <Route{...rest} render={props => <Component {...props}/>}/>
    : <LoginPage/>
);

const mapStateToProps = ({socket}) => ({
  socket,
});

export default connect(mapStateToProps)(PrivateRoute)
import React from 'react';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hideSnackbar} from '../../redux-core/actions/snackbar';

import SnackbarComponent from '@material-ui/core/Snackbar';


const Snackbar = ({snackbar, hideSnackbar}) => (
  <SnackbarComponent
    open={snackbar.isOpen}
    onClose={hideSnackbar}
    autoHideDuration={3000}
    ContentProps={{'aria-describedby': 'snackBar-msg'}}
    message={
      <span id='snackBar-msg'>{snackbar.message}</span>
    }
  />
);

const mapStateToProps = ({snackbar}) => ({
  snackbar,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  hideSnackbar,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
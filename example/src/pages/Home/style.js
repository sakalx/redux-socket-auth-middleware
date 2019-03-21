import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

export const Container = styled('div')`
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 175px);
`;

export const Users = styled(Paper)`
  flex: 1 1 0;
  margin-top: 15px;
  max-height: 100%;
`;

export const Messages = styled('div')`
  flex: 1 1 70%;
  height: 100%;
  margin: 15px 15px 75px;
  overflow-x: hidden;
  overflow-y: auto;
`;
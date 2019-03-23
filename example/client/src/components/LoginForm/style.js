import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

export const LoginContainer = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  padding: 15px;
  margin: 25px 90px;
`;

export const FormContainer = styled('form')`
  display: flex;
  flex-direction: column;
  flex: 4;
  justify-content: space-evenly;
  width: 100%;
`;

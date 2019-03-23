import styled from 'styled-components'

import Toolbar from '@material-ui/core/Toolbar';

export const Container = styled(Toolbar)`
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const User = styled('div')`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 8px 8px 8px 0;
  width: 120px;
`;
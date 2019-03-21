import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';

export const Container = styled(Paper)`
  margin: ${props => props.isauthor ? '0 8px 8px 15%' : '0 15% 8px 8px'};
`;
import styled, {css} from 'styled-components';

import Typography from '@material-ui/core/Typography';
import UserIcon from '@material-ui/icons/VerifiedUserTwoTone';

const colorText = css`
  color: #fff !important;
`;

export const Container = styled('aside')`
  ${colorText};
  align-items: center;
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: center;
  margin: 0 25px;
`;

export const Icon = styled(UserIcon)`
  ${colorText};
`;

export const Name = styled(Typography)`
  margin-right: 14px !important;
`;
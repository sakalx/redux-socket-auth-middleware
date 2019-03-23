import styled from 'styled-components';

import srcBackground from '../../static/img/background.jpg';

export const Container = styled('div')`
  background-image: url(${srcBackground});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

export const Header = styled('section')`
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin: 8px;
`;

export const Main = styled('div')`
  align-items: stretch;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;
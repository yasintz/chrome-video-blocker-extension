import * as React from 'react';
import styled from 'styled-components';

interface PopupAppProps {}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 200px;
  width: 300px;
  margin: 10px;
  background-color: ${p => p.theme.backgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const PopupApp: React.FC<PopupAppProps> = props => {
  return (
    <div>
      <StyledContainer>Hello Popup</StyledContainer>
      <div>{localStorage.getItem('My Store')} -- local </div>
    </div>
  );
};

export default PopupApp;

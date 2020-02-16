import * as React from 'react';
import styled from 'styled-components';

interface PopupAppProps {}

const StyledContainer = styled.div`
  display: flex;
`;

const StyledInput = styled.input``;

const PopupApp: React.FC<PopupAppProps> = props => {
  return (
    <StyledContainer>
      <StyledInput />
    </StyledContainer>
  );
};

export default PopupApp;

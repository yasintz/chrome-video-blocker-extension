import * as React from 'react';
import styled from 'styled-components';
import api from '~/api';

interface PopupAppProps {}

const StyledContainer = styled.div`
  display: flex;
`;

const StyledInput = styled.input``;

const PopupApp: React.FC<PopupAppProps> = props => {
  const [inputVal, setInputVal] = React.useState('');

  return (
    <StyledContainer>
      <StyledInput onChange={e => setInputVal(e.target.value)} value={inputVal} />

      <button
        type="button"
        onClick={async () => {
          const loggerResponse = await api.logger({ message: 'yasin tazeoglu' });

          console.log(loggerResponse);
        }}
      >
        Word Save
      </button>
    </StyledContainer>
  );
};

export default PopupApp;

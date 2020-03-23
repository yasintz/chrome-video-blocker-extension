import * as React from 'react';
import styled from 'styled-components';
import fetch from '~/api/clients';
import { makeid } from '~/utils';

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
          await fetch('addBlocked', { blocked: { id: makeid(), type: 'channel-link', key: inputVal } });
          setInputVal('');
        }}
      >
        Word Save
      </button>
    </StyledContainer>
  );
};

export default PopupApp;

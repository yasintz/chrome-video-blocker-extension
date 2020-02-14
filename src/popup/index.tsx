import * as React from 'react';
import ReactDOM from 'react-dom';
import PopupApp from './popup-app';
import { StoreProvider } from '~/store/store-context';

ReactDOM.render(
  <StoreProvider>
    <PopupApp />
  </StoreProvider>,
  document.getElementById('popup-root'),
);

import * as React from 'react';
import ReactDOM from 'react-dom';
import PopupApp from './popup-app';
import { AppProvider } from '~/app-provider';

ReactDOM.render(
  <AppProvider>
    <PopupApp />
  </AppProvider>,
  document.getElementById('popup-root'),
);

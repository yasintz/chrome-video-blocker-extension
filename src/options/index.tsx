import * as React from 'react';
import ReactDOM from 'react-dom';
import OptionsApp from './options-app';
import { AppProvider } from '~/app-provider';

ReactDOM.render(
  <AppProvider>
    <OptionsApp />
  </AppProvider>,
  document.getElementById('options-root'),
);

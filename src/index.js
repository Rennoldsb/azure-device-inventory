import React from 'react';
import ReactDOM from 'react-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

import App from './App';

// MSAL configuration
const configuration = {
  auth: {
    clientId: '200b61a3-0cbd-4b9d-822f-2139a5c22728',
  },
};

const pca = new PublicClientApplication(configuration);

// Component
const AppProvider = () => (
  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
);

ReactDOM.render(<AppProvider />, document.getElementById('root'));

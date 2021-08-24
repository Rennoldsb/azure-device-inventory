import React from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import GetData from './components/GetMe';

export function App() {
  return (
    <React.Fragment>
      <AuthenticatedTemplate>
        <p>Signed In!</p>
        <GetData apiEndpoint='https://graph.microsoft.com/v1.0/me' />
        <SignOutButton />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>No users are signed in!</p>
        <SignInButton />
      </UnauthenticatedTemplate>
    </React.Fragment>
  );
}

export default App;

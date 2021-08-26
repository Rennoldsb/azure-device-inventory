import React from 'react';
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';
import { SignInButton } from './components/SignInButton';
import { SignOutButton } from './components/SignOutButton';
import GetDeviceData from './components/GetDeviceData';
import { GetToken } from './helpers/GetToken';
import 'bootstrap/dist/css/bootstrap.min.css';

export function App() {
  return (
    <React.Fragment>
      <AuthenticatedTemplate>
        <GetToken />
        <p>Signed In!</p>
        <GetDeviceData />
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

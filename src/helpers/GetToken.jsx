import { loginRequest } from '../authConfig';
import { useMsal } from '@azure/msal-react';

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */

export function GetToken() {
  const { instance, accounts } = useMsal();

  const request = {
    ...loginRequest,
    account: accounts[0],
  };
  // Silently acquires an access token which is then attached to a request for Microsoft Graph data
  instance
    .acquireTokenSilent(request)
    .then((response) => {
      sessionStorage.setItem('msGraphToken', response.accessToken);
    })
    .catch((e) => {
      console.log(e);
    });

  return null;
}

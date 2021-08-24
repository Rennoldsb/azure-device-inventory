export const msalConfig = {
  auth: {
    clientId: '200b61a3-0cbd-4b9d-822f-2139a5c22728',
  },
  cache: {
    cacheLocation: 'sessionStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ['Directory.Read.All'],
};

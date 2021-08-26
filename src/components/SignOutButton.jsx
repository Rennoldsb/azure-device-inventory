import React from 'react';
import { useMsal } from '@azure/msal-react';

function handleLogout(instance) {
  localStorage.removeItem('msGraphToken');
  instance
    .logoutPopup()
    .then(sessionStorage.removeItem('msGraphToken'))
    .catch((e) => {
      console.error(e);
    });
}

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <button
      variant='secondary'
      className='ml-auto'
      onClick={() => handleLogout(instance)}
    >
      Sign out using Popup
    </button>
  );
};

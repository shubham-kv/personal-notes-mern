import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';

import App from './App.tsx';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error('Clerk Publishable Key was not found');
}

hydrateRoot(
  document.getElementById('root') as HTMLDivElement,
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      signInForceRedirectUrl={'/'}
      afterSignOutUrl={'/sign-in'}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);

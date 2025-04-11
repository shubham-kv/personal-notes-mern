import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { ClerkProvider } from '@clerk/clerk-react';

import App from './App';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error('Clerk Publishable Key was not found');
}

export function render(_url: string) {
  const html = renderToString(
    <StrictMode>
      <ClerkProvider
        publishableKey={clerkPublishableKey}
        signInForceRedirectUrl={'/'}
        afterSignOutUrl={'/sign-in'}
      >
        <StaticRouter location='/'>
          <App />
        </StaticRouter>
      </ClerkProvider>
    </StrictMode>
  );
  return { html };
}

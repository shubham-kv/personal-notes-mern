import { useAuth } from '@clerk/clerk-react';
import { PropsWithChildren } from 'react';

export function AuthGuard(props: PropsWithChildren) {
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <>{props.children}</>;
  }

  return null;
}

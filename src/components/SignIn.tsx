import { useClerk } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';

export function SignIn() {
  const clerk = useClerk();

  if (!clerk.loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button
        onClick={() => clerk.openSignIn()}
        className='hover:cursor-pointer'
      >
        Sign In
      </Button>
    </div>
  );
}

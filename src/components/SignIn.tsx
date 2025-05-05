import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useClerk } from '@clerk/clerk-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from './ui/skeleton';

function SignInSkeleton() {
  return (
    <div>
      <div className='space-y-2'>
        <Skeleton className='h-8 w-40 transition-all' />
        <Skeleton className='h-6 w-sm md:w-lg transition-all' />
        <Skeleton className='h-6 w-xs md:w-sm transition-all' />
        <Skeleton className='h-6 w-32 transition-all' />
      </div>
      <div></div>
    </div>
  );
}

export function SignIn() {
  const navigate = useNavigate();
  const clerk = useClerk();

  useEffect(() => {
    if (clerk.loaded && clerk.isSignedIn) {
      navigate('/n', { replace: true });
    }
  }, [clerk.loaded, clerk.isSignedIn]);

  if (!clerk.loaded) {
    return <SignInSkeleton />;
  }

  if (!clerk.isSignedIn) {
    return (
      <div className='flex flex-col gap-4'>
        <div>
          <h3 className='my-2'>Sign In</h3>
          <p className='my-2'>
            Hello there, please sign in from here to access your well preserved
            notes.
          </p>
        </div>

        <div>
          <Button
            onClick={() => clerk.openSignIn({})}
            className='hover:cursor-pointer'
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

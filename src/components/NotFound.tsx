import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className='max-w-md mx-auto flex flex-col items-center'>
      <div>
        <h4 className='text-5xl font-extralight text-center my-4'>404</h4>
        <p className='text-lg text-center mt-2'>
          The requested resource was not found
        </p>
      </div>

      <Link
        to={'/'}
        replace={true}
        className='inline-flex items-center gap-2 mt-2'
      >
        <ArrowLeft className='w-4 h-4' />
        <span>Go back to home</span>
      </Link>
    </div>
  );
}

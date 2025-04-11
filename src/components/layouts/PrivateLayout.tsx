import { Link, Outlet } from 'react-router';

export function PrivateLayout() {
  return (
    <div className='max-w-4xl mx-auto px-6'>
      <header className='flex items-center justify-between my-4'>
        <Link to='/n'>
          <h1 className='text-3xl font-bold lobster-two'>personal notes</h1>
        </Link>
      </header>
      <div className='my-8'>
        <Outlet />
      </div>
    </div>
  );
}

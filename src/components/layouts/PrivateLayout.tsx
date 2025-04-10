import { Link, Outlet } from 'react-router';
import { ResponsiveWrapper } from '../ResponsiveWrapper';

export function PrivateLayout() {
  return (
    <ResponsiveWrapper
      header={
        <header className='flex items-center justify-between my-4'>
          <Link to='/n'>
            <h1 className='text-3xl font-bold lobster-two'>personal notes</h1>
          </Link>
        </header>
      }
    >
      <Outlet />
    </ResponsiveWrapper>
  );
}

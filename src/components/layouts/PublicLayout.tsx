import { Outlet } from 'react-router';

export function PublicLayout() {
  return (
    <div className='max-w-4xl mx-auto px-6'>
      <div className='my-8'>
        <Outlet />
      </div>
    </div>
  );
}

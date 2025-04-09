import { Link, Outlet } from 'react-router';

type AppLayoutProps = {
  renderNav?: boolean;
};

export function AppLayout(
  { renderNav }: AppLayoutProps = { renderNav: false }
) {
  return (
    <div className='max-w-4xl mx-auto px-6'>
      {renderNav ? (
        <nav className='flex items-center justify-between my-4'>
          <Link to='/n'>
            <h1 className='text-3xl font-bold lobster-two'>personal notes</h1>
          </Link>
        </nav>
      ) : null}
      <div className='my-8'>
        <Outlet />
      </div>
    </div>
  );
}

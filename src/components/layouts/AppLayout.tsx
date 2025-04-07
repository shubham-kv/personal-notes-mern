import { Outlet } from 'react-router';

export function AppLayout() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <nav className="flex items-center justify-between my-4">
        <h1 className="text-3xl font-bold lobster-two">personal notes</h1>
      </nav>
      <div className="my-8">
        <Outlet />
      </div>
    </div>
  );
}

import { Outlet } from 'react-router';
import { ResponsiveWrapper } from '../ResponsiveWrapper';

export function PublicLayout() {
  return (
    <ResponsiveWrapper>
      <Outlet />
    </ResponsiveWrapper>
  );
}

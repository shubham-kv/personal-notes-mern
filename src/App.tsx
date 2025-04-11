import { Route, Routes, Navigate } from 'react-router';

import { PrivateLayout, PublicLayout } from '@/components/layouts';
import { NotFound } from '@/components/NotFound';
// import { Home } from '@/components/Home';

import { ViewNote, ViewNotes } from '@/features/notes';

export default function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={'/n'} replace={true} />} />

        <Route path='n' element={<PrivateLayout />}>
          <Route index element={<ViewNotes />} />
          <Route path=':id' element={<ViewNote />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path='404' element={<NotFound />} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to={'/404'} replace={true} />} />
    </Routes>
  );
}

import { Route, Routes, Navigate } from 'react-router';
import { AppLayout } from '@/components/layouts';
import { NotFound } from '@/components/NotFound';
import { ViewNote, ViewNotes } from '@/features/notes';

export default function App() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={'/n'} replace={true} />} />

        <Route path='n' element={<AppLayout renderNav={true} />}>
          <Route index element={<ViewNotes />} />
          <Route path=':id' element={<ViewNote />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path='404' element={<NotFound />} />
        </Route>
      </Route>

      <Route path='*' element={<Navigate to={'/404'} replace={true} />} />
    </Routes>
  );
}

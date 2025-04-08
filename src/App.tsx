import { Route, Routes } from 'react-router';
import { AppLayout } from '@/components/layouts';
import { ViewNotes } from '@/features/notes';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route index element={<ViewNotes />} />
      </Route>
    </Routes>
  );
}

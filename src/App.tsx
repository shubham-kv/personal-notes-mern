import { Route, Routes } from 'react-router';
import { AppLayout } from '@/components/layouts';

export function Home() {
  return (
    <div>
      <p>List of Notes</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

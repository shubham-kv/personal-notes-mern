import { Route, Routes } from 'react-router';

export function Home() {
  return (
    <div>
      <h2 className="font-bold text-2xl">Home</h2>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
}

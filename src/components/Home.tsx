import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/n', { replace: true });
  }, []);

  return null;
}

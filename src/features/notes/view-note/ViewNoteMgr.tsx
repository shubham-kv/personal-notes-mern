import useSWR from 'swr';
import { useParams } from 'react-router';

import { ErrorUi } from '@/components/ErrorUi';
import { ViewNoteUiSkeleton } from './ViewNoteUiSkeleton';
import { ViewNoteUi } from './ViewNoteUi';

import { getNote } from './fetcher';

export function ViewNoteMgr() {
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/notes/${params.id}`,
    getNote
  );

  if (error) {
    return <ErrorUi />;
  }

  if (isLoading) {
    return <ViewNoteUiSkeleton />;
  }

  if (data) {
    return <ViewNoteUi data={data} />;
  }

  return null;
}

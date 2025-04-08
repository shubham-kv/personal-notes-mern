import useSWR from 'swr';
import { useCallback, useRef } from 'react';
import { useParams } from 'react-router';

import { ErrorUi } from '@/components/ErrorUi';
import { ViewNoteUiSkeleton } from './ViewNoteUiSkeleton';
import { ViewNoteUi } from './ViewNoteUi';

import { getNote, updateNote } from './fetcher';

export function ViewNoteMgr() {
  const params = useParams();
  const { data, isLoading, error, mutate } = useSWR(
    `/api/v1/notes/${params.id}`,
    getNote
  );

  const mutateTitleTimer = useRef<NodeJS.Timeout | undefined>(undefined);
  const mutateContentTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleTitleChange = useCallback(
    (title: string) => {
      const mutateTitle = () => {
        mutate(
          () =>
            updateNote(`/api/v1/notes/${params.id}`, {
              arg: { title },
            }),
          {
            revalidate: false,
            rollbackOnError: true,
            populateCache: (result) => result,
            optimisticData: (current) => ({ ...current!, title }),
          }
        );
      };

      if (mutateTitleTimer.current) {
        clearTimeout(mutateTitleTimer.current);
      }
      mutateTitleTimer.current = setTimeout(mutateTitle, 500);
    },
    [mutate]
  );

  const handleContentChange = useCallback(
    (content: string) => {
      const mutateContent = () => {
        mutate(
          () =>
            updateNote(`/api/v1/notes/${params.id}`, {
              arg: { content },
            }),
          {
            revalidate: false,
            rollbackOnError: true,
            populateCache: (result) => result,
            optimisticData: (c) => ({ ...c!, content }),
          }
        );
      };

      if (mutateContentTimer.current) {
        clearTimeout(mutateContentTimer.current);
      }
      mutateContentTimer.current = setTimeout(mutateContent, 500);
    },
    [mutate]
  );

  if (error) {
    return <ErrorUi />;
  }

  if (isLoading) {
    return <ViewNoteUiSkeleton />;
  }

  if (data) {
    return (
      <ViewNoteUi
        data={data}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
      />
    );
  }

  return null;
}

import useSWR from 'swr';
import { useState } from 'react';

import { ListProvider } from '@/components/ui-app/ListView';
import { getNotes } from './fetcher';
import { GetNotesQueryParams } from '@shared/types/api';

export function ViewNotes() {
  const [queryParams, setQueryParams] = useState<GetNotesQueryParams>({
    page: 1,
    pageLimit: 10,
  });

  const { data, isLoading, error } = useSWR(
    ['/api/v1/notes', queryParams],
    getNotes
  );

  const notesWithKey = data?.data.map((n) => ({ key: n.id, ...n })) ?? [];
  const totalPages = data ? Math.ceil(data.total / queryParams.pageLimit) : 0;

  return (
    <ListProvider
      data={notesWithKey}
      error={error}
      isLoading={isLoading}
      page={queryParams.page}
      pageLimit={queryParams.pageLimit}
      onPageChange={(newPage) =>
        setQueryParams((p) => ({ ...p, page: newPage }))
      }
      onPageLimitChange={() => {}}
      totalPages={totalPages}
      renderListItem={(note) => (
        <h5 className="px-2 py-2 rounded hover:cursor-pointer bg-gray-50 hover:bg-gray-100">
          {note.title}
        </h5>
      )}
    >
      <ListProvider.Pagination />

      <div className="mt-4">
        <ListProvider.ListView />
      </div>
    </ListProvider>
  );
}

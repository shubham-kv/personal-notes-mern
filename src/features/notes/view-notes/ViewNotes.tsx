import useSWR from 'swr';
import { useState } from 'react';

import { ListProvider } from '@/components/ui-app/ListView';
import { ViewNoteListItem } from './ViewNoteListItem';
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
      renderListItem={(note) => <ViewNoteListItem note={note} />}
    >
      <div className='w-full flex flex-col sm:flex-row items-center justify-between gap-2'>
        <ListProvider.Search
          className='w-full sm:max-w-sm'
          placeholder='Search your notes'
          onSearchChange={(search) =>
            setQueryParams((p) => ({ ...p, search, page: 1 }))
          }
        />

        <ListProvider.Pagination
          className='self-end'
          page={queryParams.page}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setQueryParams((p) => ({ ...p, page: newPage }))
          }
        />
      </div>

      <div className='mt-4'>
        <ListProvider.ListView />
      </div>
    </ListProvider>
  );
}

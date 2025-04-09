import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSessionStorage } from '@uidotdev/usehooks';

import { ListProvider } from '@/components/ui-app/ListView';
import { ViewNoteListItem } from './ViewNoteListItem';
import { addNote, getNotes } from './fetcher';
import { GetNotesQueryParams } from '@shared/types/api';

const defaultQueryParams: GetNotesQueryParams = { page: 1, pageLimit: 10 };

export function ViewNotes() {
  let queryParams: GetNotesQueryParams;
  let setQueryParams: Dispatch<SetStateAction<GetNotesQueryParams>>;

  if (import.meta.env.SSR) {
    [queryParams, setQueryParams] = useState(defaultQueryParams);
  } else {
    [queryParams, setQueryParams] = useSessionStorage<GetNotesQueryParams>(
      'query-params',
      defaultQueryParams
    );
  }

  const navigate = useNavigate();
  const { data, isLoading, error } = useSWR(
    ['/api/v1/notes', queryParams],
    getNotes
  );

  const { trigger: triggerAdd, isMutating: isAdding } = useSWRMutation(
    '/api/v1/notes',
    addNote
  );

  const handleAddClick = useCallback(() => {
    triggerAdd(
      { title: 'Untitled', content: 'Your Content here...' },
      {
        onSuccess(data) {
          navigate(`/n/${data.note.id}`);
        },
      }
    );
  }, []);

  const notesWithKey = data?.data.map((n) => ({ key: n.id, ...n })) ?? [];
  const totalPages = data ? Math.ceil(data.total / queryParams.pageLimit) : 0;

  return (
    <ListProvider
      data={notesWithKey}
      error={error}
      isLoading={isLoading}
      renderListItem={(note) => <ViewNoteListItem note={note} />}
    >
      <div className='w-full flex flex-col sm:flex-row justify-between gap-2'>
        <div className='flex gap-2'>
          <ListProvider.Search
            className='w-full sm:max-w-sm'
            placeholder='Search your notes'
            search={queryParams.search ?? ''}
            onSearchChange={(search) =>
              setQueryParams((p) => ({ ...p, search, page: 1 }))
            }
          />

          <ListProvider.AddButton
            isLoading={isAdding}
            onClick={handleAddClick}
          />
        </div>

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

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWRMutation from 'swr/mutation';

import { Button } from '@/components/ui/button';
import { LoaderCircle, Trash2 } from 'lucide-react';

import { deleteNote } from './fetcher';

export function DeleteNoteButton() {
  const params = useParams();
  const navigate = useNavigate();
  const { trigger: triggerDelete, isMutating: isDeleting } = useSWRMutation(
    `/api/v1/notes/${params.id}`,
    deleteNote
  );

  const handleDelete = useCallback(() => {
    triggerDelete(undefined, {
      onSuccess() {
        navigate('/');
      },
    });
  }, []);

  return (
    <Button
      variant='outline'
      className='w-8 h-8 enabled:hover:cursor-pointer'
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? <LoaderCircle className='animate-spin' /> : <Trash2 />}
    </Button>
  );
}

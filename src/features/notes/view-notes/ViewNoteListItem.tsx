import { INote } from '@shared/types/api';

export function ViewNoteListItem({ note }: { note: INote }) {
  return (
    <h5 className='px-2 py-2 rounded hover:cursor-pointer bg-gray-50 hover:bg-gray-100'>
      {note.title}
    </h5>
  );
}

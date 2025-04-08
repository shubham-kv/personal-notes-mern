import { formatDistanceToNowStrict } from 'date-fns';

import { NoteContent } from './NoteContent';
import { NoteTitle } from './NoteTitle';
import { INote } from '@shared/types/api';

const getFormattedDate = (value: string | Date) =>
  value ? formatDistanceToNowStrict(new Date(value), { addSuffix: true }) : '';

type ViewNoteUiProps = {
  data: INote;
  onTitleChange?: (newTitle: string) => void;
  onContentChange?: (newTitle: string) => void;
};

export function ViewNoteUi(props: ViewNoteUiProps) {
  const { data: note, onTitleChange, onContentChange } = props;

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between gap-2'>
        <div>
          <NoteTitle content={note.title} onContentChange={onTitleChange} />
          <div className='text-sm font-light mt-1'>
            <span>Last Edited {getFormattedDate(note.updatedAt)}</span>
          </div>
        </div>
      </div>

      <NoteContent content={note.content} onContentChange={onContentChange} />
    </div>
  );
}

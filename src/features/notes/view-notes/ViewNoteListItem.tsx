import { INote } from '@shared/types/api';
import { Link } from 'react-router';

type ViewNoteListItemProps = {
  note: INote;
};

export function ViewNoteListItem(props: ViewNoteListItemProps) {
  const { note } = props;

  return (
    <Link to={`/n/${note.id}`}>
      <h5 className='px-2 py-2 rounded hover:cursor-pointer bg-gray-50 hover:bg-gray-100'>
        {note.title}
      </h5>
    </Link>
  );
}

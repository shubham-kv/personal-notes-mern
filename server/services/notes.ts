import { Note } from '../models/note';
import { CreateNoteResponse, INote } from '@shared/types/api';

export async function createNote(
  data: Pick<INote, 'title' | 'content'>
): Promise<CreateNoteResponse> {
  const note = new Note(data);
  const { id, title, content, createdAt, updatedAt } = await note.save();

  return {
    message: 'Success',
    note: { id, title, content, createdAt, updatedAt },
  };
}

import { CreateNoteData } from '@shared/types/api';

export const invalidCreateNoteData: Partial<CreateNoteData & { foo: any }>[] = [
  { foo: 'bar' },
  { title: '' },
  { content: '' },
  { title: 'some title', content: '' },
  { title: '', content: 'some content' },
  { title: 'test title', content: 'test content', foo: 'bar' },
];

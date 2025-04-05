import { CreateNoteData } from '@shared/types/api';

export const createNoteDataStub = (): CreateNoteData => ({
  title: 'Test title',
  content: 'Test content',
});

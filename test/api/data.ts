import { CreateNoteData, GetNotesQueryParams } from '@shared/types/api';

export const createNoteInputs: CreateNoteData[] = [
  {
    title: 'First note',
    content: 'Test content of the first note'
  },
  {
    title: 'Second note',
    content: 'Here is the second note with some dummy data'
  },
  {
    title: 'The THIRD',
    content: 'The answer is the third'
  }
]

export const invalidCreateNoteData: Partial<CreateNoteData & { foo: any }>[] = [
  { foo: 'bar' },
  { title: '' },
  { content: '' },
  { title: 'some title', content: '' },
  { title: '', content: 'some content' },
  { title: 'test title', content: 'test content', foo: 'bar' },
];

export const invalidGetNotesQueryParams: Partial<
  GetNotesQueryParams & { foo: any }
>[] = [
  { foo: 'bar' },
  { pageLimit: 4 },
  { pageLimit: 201 },
  { page: 0 },
  { page: 50_001 },
  { pageLimit: 0, page: 0 },
  { pageLimit: Number.MAX_VALUE, page: Number.MAX_VALUE },
];

export const invalidIdParams: string[] = [
  '1',
  'random string',
  'aaaaaaaaaaaaaaaaaaaaaaa',
  'gggggggggggggggggggggggg',
  'aaaaaaaaaaaaaaaaaaaaaaaaa',
]

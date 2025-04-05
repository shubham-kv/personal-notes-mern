import { SuccessResponse } from './utils';

export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type CreateNoteData = Pick<INote, 'title' | 'content'>;
export type CreateNoteResponse = SuccessResponse<{ note: INote }>;

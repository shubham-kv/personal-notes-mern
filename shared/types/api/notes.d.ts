import { PaginatedResponse, SuccessResponse } from './utils';

export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type CreateNoteData = Pick<INote, 'title' | 'content'>;
export type CreateNoteResponse = SuccessResponse<{ note: INote }>;

export type GetNotesQueryParams = {
  search?: string;
  page: number;
  pageLimit: number;
};

export type GetNotesResponse = SuccessResponse<PaginatedResponse<INote>>;

import { IUser } from './user';
import { PaginatedResponse, SuccessResponse } from './utils';

export interface INote {
  id: string;
  title: string;
  content: string;
  user?: IUser | string | undefined;

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
export type GetNoteResponse = SuccessResponse<{ note: INote }>;

export type UpdateNoteData = Partial<CreateNoteData>;
export type UpdateNoteResponse = GetNoteResponse;

export type DeleteNoteResponse = SuccessResponse;

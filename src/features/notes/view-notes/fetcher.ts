import axios from 'axios';
import { Fetcher } from 'swr';
import { MutationFetcher } from 'swr/mutation';

import {
  GetNotesResponse,
  GetNotesQueryParams,
  CreateNoteResponse,
  CreateNoteData,
} from '@shared/types/api';

export const getNotes: Fetcher<
  GetNotesResponse,
  [string, GetNotesQueryParams]
> = async ([url, params]) => {
  const response = await axios.get<GetNotesResponse>(url, { params });
  return response.data;
};

export const addNote: MutationFetcher<
  CreateNoteResponse,
  string,
  CreateNoteData
> = async (url, { arg }) => {
  const response = await axios.post<CreateNoteResponse>(url, arg);
  return response.data;
};

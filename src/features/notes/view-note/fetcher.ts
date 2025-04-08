import axios from 'axios';
import { Fetcher } from 'swr';
import { MutationFetcher } from 'swr/mutation';

import {
  DeleteNoteResponse,
  GetNoteResponse,
  INote,
  UpdateNoteData,
  UpdateNoteResponse,
} from '@shared/types/api';

export const getNote: Fetcher<INote, string> = async (url) => {
  const response = await axios.get<GetNoteResponse>(url);
  return response.data!.note;
};

export const updateNote: MutationFetcher<
  INote,
  string,
  UpdateNoteData
> = async (url, { arg }) => {
  const response = await axios.patch<UpdateNoteResponse>(url, arg);
  return response.data!.note;
};

export const deleteNote: MutationFetcher<
  DeleteNoteResponse,
  string,
  undefined
> = async (url) => {
  const response = await axios.delete<DeleteNoteResponse>(url);
  return response.data;
};

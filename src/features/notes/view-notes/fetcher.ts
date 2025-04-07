import axios from 'axios';
import { Fetcher } from 'swr';
import { GetNotesQueryParams, GetNotesResponse } from '@shared/types/api';

export const getNotes: Fetcher<
  GetNotesResponse,
  [string, GetNotesQueryParams]
> = async ([url, params]) => {
  const response = await axios.get<GetNotesResponse>(url, { params });
  return response.data;
};

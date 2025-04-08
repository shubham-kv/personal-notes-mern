import axios from 'axios';
import { Fetcher } from 'swr';

import { GetNoteResponse, INote } from '@shared/types/api';

export const getNote: Fetcher<INote, string> = async (url) => {
  const response = await axios.get<GetNoteResponse>(url);
  return response.data!.note;
};

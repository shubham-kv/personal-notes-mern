import assert from 'assert';
import { CreateNoteData } from '@shared/types/api';
import { createNoteInputs } from './data';

export const createNoteDataStub = (index = 0): CreateNoteData => {
  assert(index >= 0 && index < createNoteInputs.length);
  return {
    ...createNoteInputs[index],
  };
};

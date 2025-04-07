import assert from 'assert';
import { CreateNoteData, UpdateNoteData } from '@shared/types/api';
import { createNoteInputs, updateNoteInputs } from './data';

export const createNoteDataStub = (index = 0): CreateNoteData => {
  assert(index >= 0 && index < createNoteInputs.length);
  return {
    ...createNoteInputs[index],
  };
};

export const updateNoteDataStub = (index = 0): UpdateNoteData => {
  assert(index >= 0 && index < updateNoteInputs.length);
  return {
    ...updateNoteInputs[index],
  };
};

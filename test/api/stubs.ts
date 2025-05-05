import assert from 'assert';
import { createNoteInputs, updateNoteInputs } from './data';

import { CreateNoteData, UpdateNoteData } from '@shared/types/api';
import { IUser } from '@shared/types/api/user';

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

export const testUserStub = (): Pick<IUser, 'name' | 'email'> => ({
  name: 'John Doe',
  email: 'john.doe@example.com',
});

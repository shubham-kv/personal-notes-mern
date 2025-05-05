import createHttpError from 'http-errors';
import { Types } from 'mongoose';

import { Note } from '../models/note';

import {
  CreateNoteResponse,
  DeleteNoteResponse,
  GetNoteResponse,
  GetNotesQueryParams,
  GetNotesResponse,
  INote,
  UpdateNoteData,
  UpdateNoteResponse,
} from '@shared/types/api';

export async function createNote(
  userId: string,
  data: Pick<INote, 'title' | 'content'>
): Promise<CreateNoteResponse> {
  const note = new Note({ ...data, user: userId });
  const { id, title, content, createdAt, updatedAt } = await note.save();

  return {
    message: 'Success',
    note: { id, title, content, createdAt, updatedAt },
  };
}

export async function getNotes(
  userId: string,
  params: GetNotesQueryParams
): Promise<GetNotesResponse> {
  const skip = (params.page - 1) * params.pageLimit;
  const { pageLimit } = params;

  const aggregateResult = await Note.aggregate([
    {
      $match: params.search
        ? {
            $and: [
              { user: new Types.ObjectId(userId) },
              { $text: { $search: params.search } },
            ],
          }
        : { user: new Types.ObjectId(userId) },
    },
    {
      $project: {
        title: 1,
        content: 1,
        createdAt: 1,
        updatedAt: 1,
        ...(params.search ? { score: { $meta: 'textScore' } } : {}),
      },
    },
    { $sort: params.search ? { score: -1 } : { createdAt: -1 } },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: pageLimit }],
        metadata: [{ $count: 'total' }],
      },
    },
  ]);

  const notes: INote[] = (aggregateResult[0]?.data ?? []).map((n: any) => ({
    id: n._id,
    ...n,
    _id: undefined,
    score: undefined,
  }));

  return {
    message: 'Success',
    data: notes,
    total: aggregateResult[0]?.metadata[0]?.total ?? 0,
    page: params.page,
    pageLimit: params.pageLimit,
  };
}

export async function getNote(
  userId: string,
  noteId: string
): Promise<GetNoteResponse> {
  const note = await Note.findOne({ _id: noteId, user: userId });

  if (!note) {
    throw createHttpError(404, {
      extraMessage: 'Failed, Requested resource was not found.',
    });
  }

  const { id, title, content, createdAt, updatedAt } = note;

  return {
    message: 'Success',
    note: { id, title, content, createdAt, updatedAt },
  };
}

export async function updateNote(
  userId: string,
  noteId: string,
  data: UpdateNoteData
): Promise<UpdateNoteResponse> {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    data,
    { new: true }
  );

  if (!note) {
    throw createHttpError(404, {
      extraMessage: 'Failed, Requested resource was not found.',
    });
  }

  const { id, title, content, createdAt, updatedAt } = note;

  return {
    message: 'Update Success',
    note: { id, title, content, createdAt, updatedAt },
  };
}

export async function deleteNote(
  userId: string,
  noteId: string
): Promise<DeleteNoteResponse> {
  const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

  if (!note) {
    throw createHttpError(404, {
      extraMessage: 'Failed, Requested resource was not found.',
    });
  }

  return {
    message: 'Delete Success',
  };
}

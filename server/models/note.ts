import { model, Schema } from 'mongoose';
import { INote } from '@shared/types/api';

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

noteSchema.index({ title: 'text', content: 'text' });

export const Note = model<INote>('Note', noteSchema);

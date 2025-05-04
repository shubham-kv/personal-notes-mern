import { Schema, model } from 'mongoose';
import { IUser } from '@shared/types/api/user';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);

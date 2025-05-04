import { Schema, model } from 'mongoose';
import { IAuthMethod } from '@shared/types/api/auth';

const authMethodSchema = new Schema<IAuthMethod>(
  {
    strategy: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    externalIdentifier: {
      type: String,
      required: true,
    },
    clerkIdentifier: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const AuthMethod = model<IAuthMethod>(
  'AuthMethod',
  authMethodSchema
);

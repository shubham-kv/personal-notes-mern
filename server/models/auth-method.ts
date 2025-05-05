import { Schema, model } from 'mongoose';
import { IAuthMethod } from '@server/types/auth';

const authMethodSchema = new Schema<IAuthMethod>(
  {
    clerkIdentifier: { type: String, required: true },
    strategy: String,
    provider: String,
    externalIdentifier: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const AuthMethod = model<IAuthMethod>('AuthMethod', authMethodSchema);

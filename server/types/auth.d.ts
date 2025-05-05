import { Request } from 'express';
import { IUser } from '@shared/types/api/user';

/**
 * Auth strategies are methods that extract & return the signed in user from the
 * database.
 */
export type AuthStrategy = (req: Request) => IUser | Promise<IUser>;

export interface IAuthMethod {
  id: string;
  strategy: string;
  provider: string;
  externalIdentifier: string;
  clerkIdentifier: string;
  user: IUser | string;

  createdAt: Date | string;
  updatedAt: Date | string;
}

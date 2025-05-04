import { IUser } from './user';

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

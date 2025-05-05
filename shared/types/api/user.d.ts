import { IAuthStrategy } from './auth';

export interface IUser {
  id: string;
  name: string;
  email: string;
  authStrategies: (IAuthStrategy | string)[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

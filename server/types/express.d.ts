import { IUser } from '@shared/types/api/user';

declare module 'express-serve-static-core' {
  interface Request {
    user?: IUser;
  }
}

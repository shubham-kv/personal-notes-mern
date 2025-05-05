import createHttpError from 'http-errors';
import { AuthStrategy } from '@server/types/auth';
import { middlewareWrapper } from '../middleware-wrapper';

export const authenticate = (authStrategy: AuthStrategy) =>
  middlewareWrapper(async (req, _, next) => {
    const user = await authStrategy(req);

    if (!user) {
      throw createHttpError(401);
    }

    req.user = user;
    next();
  });

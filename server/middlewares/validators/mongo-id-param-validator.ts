import { Types } from 'mongoose';
import createHttpError from 'http-errors';
import { middlewareWrapper } from '../middleware-wrapper';

export const mongoIdParamValidator = (idParamsKey: string) =>
  middlewareWrapper(async (req, _, next) => {
    const id = req.params[idParamsKey];
    const isValid = Types.ObjectId.isValid(id);

    if (!isValid) {
      throw createHttpError(400, {
        extraMessage:
          'Failed, Received invalid id parameter, check & try again.',
      });
    }

    next();
  });

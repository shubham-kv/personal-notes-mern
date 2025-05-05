import { ErrorRequestHandler } from 'express';
import createHttpError from 'http-errors';

import { logger } from '@server/logger';
import { ErrorResponse } from '@shared/types/api/utils';

export const httpErrorHandler: ErrorRequestHandler = (e, _, res, next) => {
  if (createHttpError.isHttpError(e)) {
    const errorResponse: ErrorResponse = {
      error: `${e.statusCode}, ${e.message}`,
      message: e.extraMessage,
    };

    logger.trace(e);
    res.status(e.statusCode).json(errorResponse);
  } else {
    next(e);
  }
};

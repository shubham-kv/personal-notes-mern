import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { logger } from '@server/logger';
import { ErrorResponse } from '@shared/types/api/utils';

export const zodErrorHandler: ErrorRequestHandler = (e, _, res, next) => {
  if (e instanceof ZodError) {
    const statusCode = 400;
    const statusText = 'Bad Request';

    const errors = e.errors.map((e) => ({
      key: e.path[0],
      message: e.message,
    }));

    const errorResponse: ErrorResponse<{ errors: typeof errors }> = {
      message: `${statusText}`,
      errors: errors,
    };

    logger.trace(e);
    res.status(statusCode).json(errorResponse);
  } else {
    next(e);
  }
};

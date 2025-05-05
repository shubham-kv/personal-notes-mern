import { ZodSchema } from 'zod';
import { middlewareWrapper } from '../middleware-wrapper';

export const zodSchemaValidator = (
  schema: ZodSchema,
  requestKeyToValidate: 'body' | 'query',
  resLocalsKey?: string
) =>
  middlewareWrapper(async (req, res, next) => {
    const parsed = await schema.parseAsync(req[requestKeyToValidate]);

    if (resLocalsKey) {
      res.locals[resLocalsKey] = parsed;
    }
    next();
  });

import { RequestHandler } from 'express';

export const middlewareWrapper =
  (handler: RequestHandler): RequestHandler =>
  async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };

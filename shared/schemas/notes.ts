import z from 'zod';

import {
  defaultPerPageLimit,
  maxNumberOfPages,
  maxPerPage,
  minPerPage,
} from '@shared/constants';

export const createNoteSchema = z
  .object({
    title: z.string().trim().min(1).max(512),
    content: z
      .string()
      .trim()
      .min(1)
      .max(1024 * 1024),
  })
  .strict();

export const getNotesQueryParamsSchema = z
  .object({
    search: z.string().trim().optional(),
    page: z
      .preprocess(
        (v) => Number(v),
        z
          .number()
          .positive('Page number must be greater than 0')
          .max(
            maxNumberOfPages,
            'Maximum number of pages allowed is ' + maxNumberOfPages
          )
      )
      .optional()
      .default(1),
    pageLimit: z
      .preprocess(
        (v) => Number(v),
        z
          .number()
          .min(minPerPage, 'Minimum restricted per page limit is ' + minPerPage)
          .max(maxPerPage, 'Maximum restricted per page limit is ' + maxPerPage)
      )
      .optional()
      .default(defaultPerPageLimit),
  })
  .strict();

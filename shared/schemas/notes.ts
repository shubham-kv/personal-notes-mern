import z from 'zod';

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
      .preprocess((v) => Number(v), z.number().positive().max(Number.MAX_SAFE_INTEGER))
      .optional()
      .default('1'),
    pageLimit: z
      .preprocess((v) => Number(v), z.number().positive().max(50))
      .optional()
      .default('10'),
  })
  .strict();

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

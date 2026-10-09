import { z } from 'zod';

export const FilterSchema = z.object({
  type: z.union([
    z.literal('all'),
    z.literal('admin'),
    z.literal('player'),
    z.literal('guest'),
  ]),
});

export type FilterType = z.infer<typeof FilterSchema>;

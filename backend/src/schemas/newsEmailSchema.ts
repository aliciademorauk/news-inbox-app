import { z } from 'zod';


export const NewsEmailSchema = z.object({
  sender: z.string().email(),
  subject: z.string(),
  title: z.string(),
  summary: z.string(),
  receivedAt: z.string().datetime()
});

export type NewsEmailInput = z.infer<typeof NewsEmailSchema>;

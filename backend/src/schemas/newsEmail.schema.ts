import { z } from 'zod';

export const NewsEmailSchema = z.object({
  senderEmail: z.string().email(),
  senderName: z.string(),
  subject: z.string(),
  title: z.string(),
  summary: z.string(),
  receivedAt: z.string().datetime()
});

export type NewsEmailInput = z.infer<typeof NewsEmailSchema>;
